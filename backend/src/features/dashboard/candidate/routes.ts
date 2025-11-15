import express from "express";
import { CandidateDashboard } from "./controllers";
import { fileValidation } from "./middlewares/fileValidation";
import { uploads } from "./services/cloudinaryService";

const router = express.Router();

router.post(
  "/upload-resume",
  uploads.single("resume"),
  fileValidation(),
  CandidateDashboard.uploadResume
);

router.get("/get-resumes/:userId", CandidateDashboard.getResumes);

export default router;
