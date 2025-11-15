import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloud } from "cloudinary";
import { fixFileName } from "../../../../shared/utils/fixFileName";
import config from "../../../../config";
import multer from "multer";

const {
  cloudinary: { cloud_name, api_key, api_secret },
} = config;

cloud.config({ cloud_name, api_key, api_secret });

class CandidateCloudinaryService {
  uploadPDF = () => {
    return new CloudinaryStorage({
      cloudinary: cloud,
      params: async (_req, file) => {
        if (file.mimetype === "application/pdf") {
          return {
            public_id: `resume-${Date.now()}-${fixFileName(file.originalname)}`,
            folder: "resumes",
            format: "pdf",
            resource_type: "auto",
          };
        }
      },
    });
  };
}

export const CandidateCloudinary = new CandidateCloudinaryService();

export const uploads = multer({
  storage: CandidateCloudinary.uploadPDF(),
});
