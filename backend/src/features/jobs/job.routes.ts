import express from "express";
import { JobEvents } from "./job.controller";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import z from "zod";
import { authMiddleware } from "../../shared/middlewares/auth";
import { roleMiddleware } from "../../shared/middlewares/role";

const router = express.Router();

const { getJobs, filterJobs, handleFavorite, getFavorite } = new JobEvents();

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

router.post(
  "/favorite",
  authMiddleware,
  roleMiddleware("candidate"),
  validateRequest(
    z.object({
      jobId: z.string("jobId is required"),
      userId: z.string("jobId is required"),
      companyLocation: z.string("companyLocation is required"),
      jobTitle: z.string("jobTitle is required"),
      jobCategory: z.string("jobTitle is required"),
      isFavorite: z.boolean("isFavorite must be true or false"),
    })
  ),
  handleFavorite
);

router.get(
  "/favorite",
  authMiddleware,
  roleMiddleware("candidate"),
  getFavorite
);
export default router;
