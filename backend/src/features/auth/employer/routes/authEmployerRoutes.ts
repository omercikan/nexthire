import express from "express";
import { createEmployer } from "../controllers/EmployerController";
import { limitter } from "../../../../shared/middlewares/limitter";
import { validateRequest } from "../../../../shared/middlewares/validateRequest";
import { employerUserSchema } from "../schema/employerRequestSchema";
const router = express.Router();

router.post(
  "/register-employer",
  limitter(15 * 60 * 1000, 5),
  validateRequest(employerUserSchema),
  createEmployer
);

export default router;
