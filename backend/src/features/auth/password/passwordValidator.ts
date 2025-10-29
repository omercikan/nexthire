import z from "zod";

export const passwordRequestSchema = z.object({
  token: z.string().min(20, "Token must be 20 characters long.").optional(),

  userId: z.string("userId is required"),

  role: z.enum(
    ["employer", "candidate"],
    "role must be an employer or a candidate."
  ),

  oldPassword: z.string().optional(),

  newPassword: z
    .string("newPassword is required")
    .min(8, "newPassword must be at least 8 characters long.")
    .regex(/[0-9]/, "newPassword must contain an integer.")
    .regex(/[a-z]/, "newPassword must contain lowercase letters.")
    .regex(/[A-Z]/, "newPassword must contain one uppercase letter.")
    .regex(/[^\w]/, "newPassword must contain a symbol."),
});
