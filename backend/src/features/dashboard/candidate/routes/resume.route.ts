import express from "express";
import { uploads } from "../services/cloudinaryService";
import { fileValidation } from "../middlewares/fileValidation";
import { CandidateDashboard } from "../controllers/resume.controller";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import z from "zod";

const router = express.Router();

router.post(
  "/upload-resume",
  uploads.single("resume"),
  fileValidation(),
  CandidateDashboard.uploadResume
);

router.get("/get-resumes/:userId", CandidateDashboard.getResumes);

router.delete(
  "/delete-resumes",
  validateRequest(
    z.object({
      resumeIDs: z
        .array(z.string(), "resume ID is required")
        .min(1, "At least one resume ID is required"),

      publicId: z
        .array(z.string(), "public ID is required")
        .min(1, "At least one public ID is required"),
    })
  ),
  CandidateDashboard.deleteResumes
);

export default router;
