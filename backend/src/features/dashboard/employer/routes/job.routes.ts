import express from "express";
import { Job } from "../controllers/job.controller";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import {
  createJobSchema,
  publishJobSchema,
} from "../validations/publish-job.validation";
import { roleMiddleware } from "../../../../shared/middlewares/role";
import { authMiddleware } from "../../../../shared/middlewares/auth";
import z from "zod";

const router = express.Router();

const { createJob, getEmployerJobs } = new Job();

router.post(
  "/publish-job",
  authMiddleware,
  roleMiddleware("employer"),
  (req, res, next) => {
    const { jobId } = req.query;
    const schema = jobId ? publishJobSchema : createJobSchema;
    const target = jobId ? "query" : "body";

    return validateRequest(schema, target)(req, res, next);
  },
  createJob,
);

router.get(
  "/jobs/employer",
  authMiddleware,
  roleMiddleware("employer"),
  validateRequest(
    z.object({
      page: z
        .string()
        .refine((val) => Number(val) > 0, "page must be greater than 0")
        .default("1"),
    }),
    "query",
  ),
  getEmployerJobs,
);

export default router;
