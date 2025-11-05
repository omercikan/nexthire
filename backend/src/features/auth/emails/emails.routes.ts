import { Router } from "express";
import { emailsController } from "./emails.controller";
import { validateRequest } from "../../../shared/middlewares/validateRequest";
import { emailValidator } from "./emails.validator";
import { limitter } from "../../../shared/middlewares/limitter";

const router = Router();

router.post(
  "/send-otp",
  validateRequest(emailValidator),
  limitter(15 * 60 * 1000, 5),
  emailsController.sendOtp
);

export default router;
