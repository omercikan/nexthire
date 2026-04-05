import express from "express";
import { Job } from "../controllers/job.controller";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import {
  createJobSchema,
  publishJobSchema,
} from "../validations/publish-job.validation";
import { roleMiddleware } from "../../../../shared/middlewares/role";
import { authMiddleware } from "../../../../shared/middlewares/auth";

const router = express.Router();

const { createJob } = new Job();

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

export default router;
