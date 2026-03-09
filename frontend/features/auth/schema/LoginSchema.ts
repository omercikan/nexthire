import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .email("Geçerli bir e-posta adresi giriniz.")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Geçerli bir e-posta adresi giriniz.",
    )
    .trim(),

  password: z.string().nonempty("Lütfen şifre giriniz.").trim(),
});
