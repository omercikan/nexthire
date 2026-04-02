import { v2 as cloud, UploadApiResponse } from "cloudinary";
import { fixFileName } from "../../../shared/utils/fixFileName";
import { replaceFileName } from "./application.helper";

export const uploadResumesToCloudinary = async (
  file: Express.Multer.File,
  folder: string,
) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      {
        folder,
        public_id: `resume-${Date.now()}-${fixFileName(file.originalname)}`,
        resource_type: "auto",
      },
      (err, result) => (err ? reject(err) : resolve(result!)),
    );

    stream.end(file.buffer);
  });
};

export const copyToApplications = async (fileUrl: string, fileName: string) => {
  const newPublicId = replaceFileName(fileName, "resumes/", "applications/");

  const result = await cloud.uploader.upload(fileUrl, {
    public_id: newPublicId,
    resource_type: "raw",
    overwrite: false,
  });

  return result.secure_url;
};

export const getNewFiles = (
  files: Express.Multer.File[],
  existingResumes: { fileName: string }[],
) => {
  const existingNames = new Set(
    existingResumes.map((resume) => resume.fileName),
  );
  return files.filter((file) => !existingNames.has(file.filename));
};
