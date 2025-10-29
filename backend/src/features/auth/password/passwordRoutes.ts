import { Router } from "express";
import { passwordController } from "./passwordController.ts";
import { validateRequest } from "../../../shared/middlewares/validateRequest.ts";
import { passwordRequestSchema } from "./passwordValidator.ts";
const router = Router();

router.patch(
  "/password",
  validateRequest(passwordRequestSchema),
  passwordController
);

export default router;
