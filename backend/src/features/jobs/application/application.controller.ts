import { NextFunction, Request, Response } from "express";
import { UploadApiResponse } from "cloudinary";
import { Resume } from "../../../shared/models/Resume";
import { Application } from "../../../shared/models/Application";
import {
  copyToApplications,
  getNewFiles,
  uploadResumesToCloudinary,
} from "./application.service";
import { v2 as cloud } from "cloudinary";
import { fixFileName } from "../../../shared/utils/fixFileName";
import { replaceFileName } from "./application.helper";

interface ApplicationData {
  email: string;
  phone: string;
  screeningQuestions: unknown;
}

interface RequestBody {
  selectedResumeName: string;
  applicationData: ApplicationData;
  removedResumeNames: string[];
  userId: string;
  employerId: string;
  jobId: string;
}

export class JobApplication {
  applyJob = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];
    const {
      selectedResumeName,
      applicationData,
      removedResumeNames,
      userId,
      employerId,
      jobId,
    } = req.body.data as RequestBody;

    try {
      const existingResumes = await Resume.find({ userId });
      const newFiles = getNewFiles(files, existingResumes);

      let uploadedResumes: UploadApiResponse[] = [];

      if (newFiles.length > 0) {
        uploadedResumes = await Promise.all(
          newFiles.map((resume) =>
            uploadResumesToCloudinary(resume, "resumes"),
          ),
        );

        await Resume.insertMany(
          uploadedResumes.map((resume, i) => ({
            userId,
            fileName: resume.public_id,
            fileUrl: resume.secure_url,
            originalName: newFiles[i].originalname,
            size: resume.bytes,
          })),
        );
      }

      const resumeFromDB = existingResumes.find((resume) =>
        fixFileName(resume.originalName).includes(selectedResumeName),
      );

      const resumeFromUpload = uploadedResumes.find((_, i) =>
        newFiles[i].originalname.includes(selectedResumeName),
      );

      const selectedResume = resumeFromDB
        ? {
            originalName: resumeFromDB.originalName,
            fileName: resumeFromDB.fileName,
            size: resumeFromDB.size,
            url: resumeFromDB.fileUrl,
          }
        : resumeFromUpload
          ? {
              originalName: selectedResumeName,
              fileName: replaceFileName(
                resumeFromUpload.public_id,
                "resumes/",
                "applications/",
              ),
              size: resumeFromUpload.bytes,
              url: resumeFromUpload.secure_url,
            }
          : null;

      if (!selectedResume) {
        return next(new Error("Selected resume not found"));
      }

      const applicationResumeUrl = await copyToApplications(
        selectedResume.url,
        selectedResume.fileName,
      );

      await Application.create({
        candidateId: userId,
        employerId,
        jobId,
        ...applicationData,
        resume: { ...selectedResume, url: applicationResumeUrl },
      });

      if (removedResumeNames.length > 0) {
        await Promise.all([
          Resume.deleteMany({ userId, fileName: { $in: removedResumeNames } }),
          cloud.api.delete_resources(removedResumeNames),
        ]);
      }

      return res
        .status(201)
        .json({ message: "Your application has been successfully submitted." });
    } catch (error) {
      next(error);
    }
  };
}
