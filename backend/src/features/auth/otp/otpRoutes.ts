import express from "express";
import { validateRequest } from "../../../shared/middlewares/validateRequest.ts";
import { otpRequestSchema } from "./otpValidator.ts";
import { refreshOtp, verifyOtp } from "./otpController.ts";
const router = express.Router();

router.post("/otp", validateRequest(otpRequestSchema), verifyOtp);

router.patch(
  "/otp/refresh",
  validateRequest(otpRequestSchema.omit({ code: true })),
  refreshOtp
);

export default router;
