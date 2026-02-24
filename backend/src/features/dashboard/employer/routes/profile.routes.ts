import express from "express";
import { Profile } from "../controllers/profile.controller";
import { uploads } from "../../candidate/utils/uploadCloudinary";
import { EmployerCloudinary } from "../services/Cloudinary";

const router = express.Router();

const { updateProfile } = new Profile();

router.put(
  "/profile",
  uploads(EmployerCloudinary.uploadPhoto(), "photo"),
  updateProfile,
);

export default router;
