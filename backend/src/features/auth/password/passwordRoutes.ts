import { Router } from "express";
import { passwordController } from "./passwordController";
import { validateRequest } from "../../../shared/middlewares/validateRequest";
import { passwordRequestSchema } from "./passwordValidator";
const router = Router();

router.patch(
  "/password",
  validateRequest(passwordRequestSchema),
  passwordController
);

export default router;
