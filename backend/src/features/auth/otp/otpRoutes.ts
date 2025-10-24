import express from "express";
import { otpController } from "./otpController.ts";
import { validateRequest } from "../../../shared/middlewares/validateRequest.ts";
import { otpRequestSchema } from "./otpValidator.ts";
const router = express.Router();

router.post("/otp", validateRequest(otpRequestSchema), otpController);

export default router;
