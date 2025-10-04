import z from "zod";

export const candidateUserSchema = z.object({
  fullname: z
    .string()
    .nonempty("fullname is required")
    .min(3, "fullname must be 3 characters long."),

  email: z
    .email("email address is not in a valid format.")
    .nonempty("email address is required"),

  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password must be 8 characters long."),
});
