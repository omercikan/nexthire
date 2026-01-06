import express from "express";
import { JobEvents } from "./job.controller";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import z from "zod";

const router = express.Router();

const { getJobs, filterJobs } = new JobEvents();

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

router.post(
  "/filter",
  validateRequest(
    z.object({
      page: z.coerce
        .number({ error: "page must be a number" })
        .min(1, { error: "page must be greater than or equal to 1" })
        .optional(),

      perPage: z
        .enum(["10", "all"], {
          error: "perPage must be either '10' or 'all'",
        })
        .optional(),

      sort: z
        .enum(["1", "-1"], { error: "sort must be either '1' or '-1'" })
        .optional()
        .default("-1"),
    }),
    "query"
  ),

  filterJobs
);
export default router;
