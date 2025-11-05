import express from "express";
import { validateRequest } from "../../../shared/middlewares/validateRequest";
import { otpRequestSchema } from "./otpValidator";
import { refreshOtp, verifyOtp } from "./otpController";
const router = express.Router();

router.post("/otp", validateRequest(otpRequestSchema), verifyOtp);

router.patch(
  "/otp/refresh",
  validateRequest(otpRequestSchema.omit({ code: true })),
  refreshOtp
);

export default router;
