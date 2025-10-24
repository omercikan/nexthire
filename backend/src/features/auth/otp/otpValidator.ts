import z from "zod";

export const otpRequestSchema = z.object({
  token: z
    .string("Token is required")
    .min(20, "Token must be min 20 characters long."),

  code: z
    .string("OTP code is required")
    .min(6, "OTP code must be 6 characters long.")
    .regex(/^\d*$/, "OTP code must be integer."),
});
