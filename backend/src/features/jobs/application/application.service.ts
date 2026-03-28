import { v2 as cloud, UploadApiResponse } from "cloudinary";
import { fixFileName } from "../../../shared/utils/fixFileName";

export const uploadResumesToCloudinary = async (file: Express.Multer.File) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloud.uploader.upload_stream(
      {
        folder: "resumes",
        public_id: `resume-${Date.now()}-${fixFileName(file.originalname)}`,
        format: "pdf",
        resource_type: "auto",
      },
      (err, result) => (err ? reject(err) : resolve(result!)),
    );

    stream.end(file.buffer);
  });
};

export const getNewFiles = (
  files: Express.Multer.File[],
  existingResumes: { originalName: string }[],
) => {
  const existingNames = new Set(
    existingResumes.map((resume) => resume.originalName),
  );
  return files.filter((file) => !existingNames.has(file.originalname));
};
