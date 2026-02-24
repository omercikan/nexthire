import { fixFileName } from "../../../../shared/utils/fixFileName";
import { uploadCloudinary } from "../../candidate/utils/uploadCloudinary";

class EmployerCloudinaryService {
  uploadPhoto() {
    return uploadCloudinary((_req, file: Express.Multer.File) => {
      const imageExtension = ["image/jpg", "image/jpeg", "image/png"];
      if (imageExtension.includes(file.mimetype)) {
        return {
          public_id: `photo-${Date.now()}-${fixFileName(file.originalname)}`,
          resource_type: "auto",
          folder: "photos",
        };
      }
    });
  }
}

export const EmployerCloudinary = new EmployerCloudinaryService();
