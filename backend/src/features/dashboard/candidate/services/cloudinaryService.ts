import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import { v2 as cloud } from "cloudinary";
import { fixFileName } from "../../../../shared/utils/fixFileName";
import config from "../../../../config";
import { uploadCloudinary } from "../utils/uploadCloudinary";

const {
  cloudinary: { cloud_name, api_key, api_secret },
} = config;

cloud.config({ cloud_name, api_key, api_secret });

class CandidateCloudinaryService {
  uploadPDF = () => {
    return uploadCloudinary((_req: Request, file: Express.Multer.File) => {
      if (file.mimetype === "application/pdf") {
        return {
          public_id: `resume-${Date.now()}-${fixFileName(file.originalname)}`,
          folder: "resumes",
          format: "pdf",
          resource_type: "auto",
        };
      }
    });
  };

  uploadPhoto = () => {
    return uploadCloudinary((_req: Request, file: Express.Multer.File) => {
      const imageExtension = ["image/jpg", "image/jpeg", "image/png"];
      if (imageExtension.includes(file.mimetype)) {
        return {
          public_id: `photo-${Date.now()}-${fixFileName(file.originalname)}`,
          resource_type: "auto",
          folder: "photos",
        };
      }
    });
  };
}

export const CandidateCloudinary = new CandidateCloudinaryService();
