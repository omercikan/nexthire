import z from "zod";

export const employerUserSchema = z.object({
  fullname: z
    .string()
    .nonempty("fullname is required")
    .min(3, "fullname must be 3 characters long."),

  phoneNumber: z
    .string()
    .nonempty("phone number is required")
    .regex(
      /^(?:\+90|0)(5\d{2})\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "phone number is must be exp: 0555 555 55 55"
    ),
  companyName: z
    .string()
    .nonempty("company name is required")
    .max(70, "company name must be max 70 characters long."),

  email: z
    .string()
    .nonempty("email address is required")
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "email address is not in a valid format."
    ),

  password: z.string("password is required"),

  city: z.string().nonempty("city is required"),

  district: z.string().nonempty("district is required"),

  taxCity: z.string().nonempty("tax city is required"),

  taxOffice: z.string().nonempty("tax office is required"),

  taxNumber: z
    .string()
    .nonempty("tax number is required")
    .regex(/^\d{10}$/, "tax number must be 10 digits."),

  emailConsent: z.boolean().optional().default(false),

  personalDataConsent: z.refine(
    (val) => val === true,
    "personal data consent must be accepted."
  ),
});
