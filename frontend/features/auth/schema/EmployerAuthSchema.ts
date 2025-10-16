import z from "zod";

export const EmployerAuthSchema = z.object({
  nameAndSurname: z
    .string()
    .nonempty("Ad ve soyad zorunludur")
    .refine((val) => {
      const surname = String(val.split(" ").at(1));
      return val.split(" ").length === 2 && surname?.length >= 2;
    }, "Lütfen adınızı ve soyadınızı eksiksiz girin")
    .regex(
      /^[a-zA-ZğüşöçıİĞÜŞÖÇ ]+$/,
      "Ad ve soyad yalnızca harf ve boşluk içerebilir"
    )
    .optional(),

  phone: z
    .string()
    .nonempty("Telefon numarası zorunludur")
    .regex(
      /^(?:\+90|0)(5\d{2})\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Geçerli bir telefon numarası girin (örnek: 0555 555 55 55)"
    )
    .optional(),

  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Geçerli bir e-posta adresi girin"
    )
    .nonempty("E-posta adresi zorunludur"),

  password: z.string().nonempty("Şifre alanı zorunludur").trim().optional(),

  companyName: z
    .string()
    .nonempty("Şirket adı zorunludur")
    .min(2, "Şirket adı en az 2 karakter olmalıdır")
    .optional(),

  city: z
    .string()
    .refine((val) => val !== "İl Seçiniz", "Lütfen bir şehir seçin")
    .optional(),

  district: z
    .string()
    .refine((val) => val !== "İlçe Seçiniz", "Lütfen bir ilçe seçin")
    .optional(),

  taxCity: z
    .string()
    .refine(
      (val) => val !== "Vergi Dairesi İli Seçiniz",
      "Lütfen vergi dairesi ilini seçin"
    )
    .optional(),

  taxOffice: z
    .string()
    .refine(
      (val) => val !== "Vergi Dairesi Seçiniz",
      "Lütfen vergi dairesini seçin"
    )
    .optional(),

  taxNumber: z
    .string()
    .nonempty("Vergi numarası zorunludur")
    .regex(/^\d+$/, "Vergi numarası yalnızca rakamlardan oluşmalıdır")
    .refine((val) => val.length === 10, "Vergi numarası 10 haneli olmalıdır")
    .optional(),

  checkboxFirst: z.boolean().optional(),
  checkboxSecond: z
    .boolean()
    .refine(
      (val) => val === true,
      "Kişisel verilerin işlenmesine onay vermeniz gerekmektedir"
    )
    .optional(),
});

export type EmployerFormType = z.infer<typeof EmployerAuthSchema>;
