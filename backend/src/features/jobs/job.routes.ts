import express from "express";
import { JobEvents } from "./job.controller";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import z from "zod";

const router = express.Router();

const { getJobs } = new JobEvents();

router.get(
  "/",
  validateRequest(
    z.object({
      page: z
        .string("Page is required")
        .refine((val) => Number(val) > 0, "The page must be greater than 0.")
        .transform(Number),
    }),
    "query"
  ),
  getJobs
);

export default router;
