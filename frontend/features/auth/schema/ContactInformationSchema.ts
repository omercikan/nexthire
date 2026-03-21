import * as z from "zod";

export const ContactInformationSchema = z.object({
  email: z.email("Geçerli bir e-posta adresi girin"),

  phone: z
    .string()
    .regex(
      /^(?:(?:\+90|0)?5\d{2})\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Geçerli bir telefon numarası girin",
    ),
});
