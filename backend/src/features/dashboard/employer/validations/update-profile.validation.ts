import * as z from "zod";
import { zfd } from "zod-form-data";

export const employerProfileSchema = zfd.formData({
  companyName: zfd.text(
    z
      .string()
      .min(2, "Şirket adı en az 2 karakter olmalı")
      .max(100, "Şirket adı en fazla 100 karakter olabilir"),
  ),

  email: zfd.text(z.email("Geçerli bir e-posta adresi girin")),

  phoneNumber: zfd.text(
    z
      .string("Telefon numarası zorunlu")
      .min(7, "Telefon numarası en az 7 karakter olmalı")
      .max(20, "Telefon numarası en fazla 20 karakter olabilir")
      .regex(
        /^[0-9+()\s-]+$/,
        "Telefon numarası yalnızca rakam ve +() - içerebilir",
      ),
  ),

  website: zfd
    .text(
      z
        .string()
        .optional()
        .refine(
          (val) =>
            !val || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/.test(val),
          {
            message: "Geçerli bir web sitesi adresi girin",
          },
        ),
    )
    .optional(),

  foundedDate: zfd.text(
    z
      .string("Kuruluş yılı zorunlu")
      .regex(/^\d{4}$/, "Kuruluş yılı 4 haneli olmalı")
      .refine(
        (val) => Number(val) >= 1800 && Number(val) <= new Date().getFullYear(),
        "Geçerli bir kuruluş yılı girin",
      ),
  ),

  companySize: zfd.text(
    z
      .string("Şirket büyüklüğü bilgisi zorunlu")
      .min(2, "Şirket büyüklüğü bilgisi için en az 2 karakter girin")
      .max(50, "Şirket büyüklüğü bilgisi çok uzun"),
  ),

  companyAbout: zfd.text(
    z
      .string("Şirket hakkında bilgisi zorunlu")
      .min(50, "Şirket hakkında en az 50 karakter girin")
      .max(2000, "Şirket hakkında en fazla 2000 karakter girilebilir"),
  ),

  IntroductionVideoURL: zfd
    .text(z.url("Geçerli bir video URL girin"))
    .optional(),

  categories: zfd.text(
    z.preprocess(
      (val) => {
        if (typeof val === "string") {
          try {
            return JSON.parse(val);
          } catch {
            return val.split(",").map((c) => c.trim());
          }
        }
        return val;
      },
      z
        .array(z.string("En az bir kategori seçilmelidir"))
        .min(1, "En az bir kategori seçilmelidir")
        .max(3, "En fazla 3 kategori seçebilirsiniz"),
    ),
  ),

  socialPlatforms: zfd
    .text(
      z.preprocess(
        (val) => {
          if (typeof val === "string") {
            try {
              return JSON.parse(val);
            } catch {
              return [];
            }
          }
          return val;
        },
        z.array(
          z.object({
            platform: z
              .string()
              .min(2, "Platform adı gerekli (örn: LinkedIn, Twitter)"),
            url: z.url("Geçerli bir sosyal medya URL girin"),
          }),
        ),
      ),
    )
    .optional(),
});

export type EmployerProfileType = z.infer<typeof employerProfileSchema>;
