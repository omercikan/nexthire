import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty("Lütfen yeni şifrenizi girin")
      .min(8, "Şifreniz en az 8 karakter olmalıdır")
      .regex(/[0-9]/, "Şifre bir sayı içermelidir")
      .regex(/[a-z]/, "Şifre bir küçük harf içermelidir")
      .regex(/[A-Z]/, "Şifre bir büyük harf içermelidir")
      .regex(/[^\w]/, "Şifre bir sembol içermelidir"),

    confirmPassword: z.string().nonempty("Lütfen şifrenizi onaylayın").trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
