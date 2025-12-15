import express from "express";
import { CandidateProfile } from "../controllers/profile.controller";
import { uploads } from "../utils/uploadCloudinary";
import { CandidateCloudinary } from "../services/cloudinaryService";

const router = express.Router();

const { updateProfile } = new CandidateProfile();

router.put(
  "/update-profile",
  uploads(CandidateCloudinary.uploadPhoto(), "photo"),
  updateProfile
);

export default router;
