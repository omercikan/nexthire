import express from "express";
import {
  createEmployer,
  loginEmployer,
} from "../controllers/EmployerController";
import { limitter } from "../../../../shared/middlewares/limitter";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import { employerUserSchema } from "../schema/employerRequestSchema";
import z from "zod";
const router = express.Router();

router.post(
  "/register-employer",
  limitter(15 * 60 * 1000, 5),
  validateRequest(employerUserSchema.omit({ password: true })),
  createEmployer
);

router.post(
  "/login-employer",
  limitter(15 * 60 * 1000, 5),
  validateRequest(employerUserSchema.pick({ email: true, password: true })),
  loginEmployer
);

export default router;
