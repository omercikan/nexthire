import express from "express";
import { Job } from "../controllers/job.controller";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import { createJobSchema } from "../validations/create-job.validation";
import { roleMiddleware } from "../../../../shared/middlewares/role";
import { authMiddleware } from "../../../../shared/middlewares/auth";

const router = express.Router();

const { createJob } = new Job();

router.post(
  "/create-job",
  authMiddleware,
  roleMiddleware("employer"),
  validateRequest(createJobSchema),
  createJob
);

export default router;
