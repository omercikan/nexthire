import * as z from "zod";

export const employerProfileSchema = z.object({
  companyName: z
    .string()
    .min(2, "Şirket adı en az 2 karakter olmalı")
    .max(100, "Şirket adı en fazla 100 karakter olabilir"),

  email: z.string().email("Geçerli bir e-posta adresi girin"),

  phoneNumber: z
    .string()
    .min(7, "Şirket numarası en az 7 karakter olmalı")
    .max(20, "Şirket numarası en fazla 20 karakter olabilir")
    .regex(/^[0-9+()\s-]+$/, "Şirket numarası yalnızca rakam içermeli"),

  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/.test(val),
      {
        message: "Geçerli bir web sitesi adresi girin",
      },
    ),

  foundedDate: z
    .string()
    .length(4, "Kuruluş yılı 4 haneli olmalı")
    .refine((val) => val >= "1800", "Kuruluş yılı 1800’den küçük olamaz"),

  companySize: z
    .string()
    .min(2, "Şirket büyüklüğü bilgisi gerekli")
    .max(50, "Şirket büyüklüğü bilgisi çok uzun"),

  companyAbout: z
    .string()
    .min(50, "Şirket hakkında en az 50 karakter girin")
    .max(2000, "Şirket hakkında en fazla 2000 karakter girilebilir"),

  IntroductionVideoURL: z.string().optional(),
});
