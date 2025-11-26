import express from "express";
import { uploads } from "../services/cloudinaryService";
import { fileValidation } from "../middlewares/fileValidation";
import { CandidateDashboard } from "../controllers/resume.controller";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import z from "zod";

const router = express.Router();

const { uploadResume, getResumes, deleteResumes, renameResume, replaceResume } =
  CandidateDashboard;

router.post(
  "/upload-resume",
  uploads.single("resume"),
  fileValidation(),
  uploadResume
);

router.get("/get-resumes/:userId", getResumes);

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
  deleteResumes
);

router.patch(
  "/rename-resume",
  validateRequest(
    z.object({
      fileID: z
        .string("file ID is required")
        .nonempty("fileID cannot be empty"),
      newName: z
        .string("new name is required")
        .trim()
        .nonempty("new name cannot be empty"),
    })
  ),
  renameResume
);

router.post(
  "/replace-resume",
  validateRequest(
    z.object({
      publicId: z
        .string("Public ID is required")
        .nonempty("Public ID cannot be empty."),
      fileId: z
        .string("File ID is required")
        .nonempty("File ID cannot be empty."),
    })
  ),
  uploads.single("resume"),
  fileValidation(),
  replaceResume
);

export default router;
