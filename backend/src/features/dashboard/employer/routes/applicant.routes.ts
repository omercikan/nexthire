import express from "express";
import { Applicant } from "../controllers/applicant.controller";
import { authMiddleware } from "../../../../shared/middlewares/auth";
import { roleMiddleware } from "../../../../shared/middlewares/role";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import z from "zod";

const router = express.Router();

const validateJobId = validateRequest(
  z.object({
    jobId: z
      .string("jobId is required")
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid jobId"),
  }),
  "params",
);

router.get(
  "/jobs/:jobId/applicants",
  authMiddleware,
  roleMiddleware("employer"),
  validateJobId,
  validateRequest(
    z.object({
      page: z.coerce.number().min(1).default(1),
      search: z.string().trim().optional(),
      status: z
        .enum([
          "pending",
          "reviewed",
          "accepted",
          "rejected",
          "auto_rejected",
          "scheduled",
          "interviewed",
          "shortlisted",
          "hired",
          "new",
        ])
        .optional(),
    }),
    "query",
  ),
  Applicant.getApplicants,
);

router.patch(
  "/jobs/:jobId/status",
  authMiddleware,
  roleMiddleware("employer"),
  validateJobId,
  validateRequest(
    z.object({
      candidateId: z
        .string("candidateId is required")
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid candidateId"),
      status: z.enum([
        "pending",
        "reviewed",
        "accepted",
        "rejected",
        "auto_rejected",
        "scheduled",
        "interviewed",
        "shortlisted",
        "hired",
        "new",
      ]),
    }),
    "body",
  ),
  Applicant.updateStatus,
);

export const applicantRouter = router;
