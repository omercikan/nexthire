import z from "zod";

export const emailValidator = z.object({
  email: z
    .string("Email address is required")
    .regex(
      /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/,
      "Email address is invalid format."
    ),
});
