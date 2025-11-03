import { Router } from "express";
import { emailsController } from "./emails.controller.ts";
import { validateRequest } from "../../../shared/middlewares/validateRequest.ts";
import { emailValidator } from "./emails.validator.ts";
import { limitter } from "../../../shared/middlewares/limitter.ts";

const router = Router();

router.post(
  "/send-otp",
  validateRequest(emailValidator),
  limitter(15 * 60 * 1000, 5),
  emailsController.sendOtp
);

export default router;
