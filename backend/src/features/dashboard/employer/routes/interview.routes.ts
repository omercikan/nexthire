import express from "express";
import { interviewController } from "../controllers/interview.controller";
import { authMiddleware } from "../../../../shared/middlewares/auth";
import { roleMiddleware } from "../../../../shared/middlewares/role";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import {
  createInterviewSchema,
  getInterviewParamsSchema,
} from "../validations/interview.validation";

const router = express.Router();

router.post(
  "/interviews",
  authMiddleware,
  roleMiddleware("employer"),
  validateRequest(createInterviewSchema),
  interviewController.createInterview,
);

router.get(
  "/interview/:interviewId",
  authMiddleware,
  roleMiddleware("employer"),
  validateRequest(getInterviewParamsSchema, "params"),
  interviewController.getInterview,
);

export default router;
