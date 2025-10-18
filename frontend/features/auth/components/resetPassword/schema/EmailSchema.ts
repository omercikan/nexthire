import z from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .nonempty("Lütfen e-posta adresi giriniz")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Geçerli bir e-posta adresi giriniz"
    )
    .trim(),
});
