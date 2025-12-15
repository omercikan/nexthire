import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import { v2 as cloud } from "cloudinary";
import multer from "multer";

export const uploadCloudinary = (params: Options["params"]) => {
  return new CloudinaryStorage({
    cloudinary: cloud,
    params: params,
  });
};

export const uploads = (storage: multer.StorageEngine, fieldName: string) => {
  return multer({ storage }).single(fieldName);
};
