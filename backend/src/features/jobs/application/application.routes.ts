import express from "express";
import { JobApplication } from "./application.controller";
import { authMiddleware } from "../../../shared/middlewares/auth";
import { roleMiddleware } from "../../../shared/middlewares/role";
import multer from "multer";
import { validateRequest } from "../../../shared/middlewares/validateRequest";
import { applicationSchema } from "./application.validation";
import { validateApplication } from "./application.middleware";

const router = express.Router();

const { applyJob } = new JobApplication();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (file.mimetype === "application/pdf") {
      callback(null, true);
    } else {
      callback(new Error("Only PDF files are accepted."));
    }
  },
});

router.post(
  "/:jobId/applications",
  authMiddleware,
  roleMiddleware("candidate"),
  upload.array("resumeFiles"),
  validateApplication,
  applyJob,
);

export default router;
