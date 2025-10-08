import z from "zod";

export const SignupSchema = z
  .object({
    name: z
      .string()
      .nonempty("Lütfen isim giriniz.")
      .min(3, "Lütfen en az 3 karakter giriniz.")
      .max(30, "İsim en fazla 30 karakter olmalıdır.")
      .regex(
        /^[A-Za-zçöşğüıİÇÖŞĞÜ\s]+$/,
        "İsim yalnızca harf ve boşluklardan oluşmalıdır."
      )
      .trim(),

    surname: z
      .string()
      .nonempty("Lütfen soyadı giriniz.")
      .min(3, "Lütfen en az 3 karakter giriniz.")
      .max(30, "Soyadı en fazla 30 karakter olmalıdır.")
      .regex(
        /^[A-Za-zçöşğüıİÇÖŞĞÜ\s]+$/,
        "Soyadı yalnızca harf ve boşluklardan oluşmalıdır."
      )
      .trim(),

    email: z
      .email("Geçerli bir e-posta adresi giriniz.")
      .nonempty("Lütfen e-posta adresi giriniz.")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Geçerli bir e-posta adresi giriniz."
      )
      .max(50, "E-posta en fazla 50 karakter olmalıdır.")
      .trim(),

    password: z
      .string()
      .nonempty("Lütfen şifre giriniz.")
      .min(8, "Lütfen en az 8 karakter giriniz.")
      .regex(/[0-9]/, "Şifre bir sayı içermelidir")
      .regex(/[a-z]/, "Şifre bir küçük harf içermelidir")
      .regex(/[A-Z]/, "Şifre bir büyük harf içermelidir")
      .regex(/[^\w]/, "Şifre bir sembol içermelidir")
      .trim(),

    confirmPassword: z.string().nonempty("Lütfen şifrenizi onaylayın").trim(),

    checkbox: z
      .boolean()
      .refine((val) => val === true, "Lütfen kullanım şartlarını kabul ediniz"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export interface SignupSchemaValue {
  name?: string;
  surname?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  checkbox?: boolean;
}
