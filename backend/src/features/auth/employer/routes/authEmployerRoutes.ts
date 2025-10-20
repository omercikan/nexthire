import express from "express";
import { createEmployer } from "../controllers/EmployerController.ts";
import { limitter } from "../../../../shared/middlewares/limitter.ts";
import { validateRequest } from "../../../../shared/middlewares/validateRequest.ts";
import { employerUserSchema } from "../schema/employerRequestSchema.ts";
const router = express.Router();

router.post(
  "/register-employer",
  limitter(15 * 60 * 1000, 5),
  validateRequest(employerUserSchema),
  createEmployer
);

export default router;
