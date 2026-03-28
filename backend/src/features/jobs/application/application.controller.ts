import { NextFunction, Request, Response } from "express";
import { UploadApiResponse } from "cloudinary";
import { Resume } from "../../../shared/models/Resume";
import { Application } from "../../../shared/models/Application";
import { getNewFiles, uploadResumesToCloudinary } from "./application.service";

interface ApplicationData {
  email: string;
  phone: string;
  screeningQuestions: unknown;
}

interface RequestBody {
  selectedResumeName: string;
  applicationData: ApplicationData;
  userId: string;
  employerId: string;
  jobId: string;
}

export class JobApplication {
  applyJob = async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[];
    const { selectedResumeName, applicationData, userId, employerId, jobId } =
      req.body.data as RequestBody;

    try {
      const existingResumes = await Resume.find({ userId });
      const newFiles = getNewFiles(files, existingResumes);

      let uploadedResumes: UploadApiResponse[] = [];

      if (newFiles.length > 0) {
        uploadedResumes = await Promise.all(
          newFiles.map(uploadResumesToCloudinary),
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

      const resumeFromDB = existingResumes.find(
        (resume) => resume.originalName === selectedResumeName,
      );

      const resumeFromUpload = uploadedResumes.find(
        (_, i) => newFiles[i].originalname === selectedResumeName,
      );

      const selectedResume = resumeFromDB
        ? {
            originalName: resumeFromDB.originalName,
            size: resumeFromDB.size,
            url: resumeFromDB.fileUrl,
          }
        : resumeFromUpload
          ? {
              originalName: selectedResumeName,
              size: resumeFromUpload.bytes,
              url: resumeFromUpload.secure_url,
            }
          : null;

      if (!selectedResume) {
        return next(new Error("Selected resume not found"));
      }

      await Application.create({
        candidateId: userId,
        employerId,
        jobId,
        email: applicationData.email,
        phone: applicationData.phone,
        screeningQuestions: applicationData.screeningQuestions,
        resume: selectedResume,
      });

      return res
        .status(201)
        .json({ message: "Your application has been successfully submitted." });
    } catch (error) {
      next(error);
    }
  };
}
