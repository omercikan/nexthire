import * as z from "zod";

export const shareJobFormSchema = z
  .object({
    jobTitle: z.string().nonempty("Pozisyon başlığı zorunludur"),

    jobDescription: z
      .string()
      .nonempty("Pozisyona ait iş tanımı ve sorumlulukları giriniz"),

    category: z.string().nonempty("Lütfen ilan kategorisini seçiniz"),

    workType: z.string().nonempty("Çalışma şeklini seçiniz"),

    gender: z.string().nonempty("Cinsiyet tercihini seçiniz"),

    applicationMethod: z.string().nonempty("Başvuru yöntemini seçiniz"),

    applicationAddress: z.string().optional(),

    salaryPeriod: z.string().nonempty("Maaş periyodunu seçiniz"),

    minSalary: z
      .string()
      .nonempty("Minimum maaş bilgisini giriniz")
      .refine((val) => !val.startsWith("-"), "Minimum maaş 0’dan küçük olamaz"),

    maxSalary: z
      .string()
      .nonempty("Maksimum maaş bilgisini giriniz")
      .refine(
        (val) => !val.startsWith("-"),
        "Maksimum maaş 0’dan küçük olamaz"
      ),

    experience: z.string().nonempty("Aranan deneyim süresini belirtiniz"),

    careerLevel: z
      .string()
      .nonempty("Pozisyona uygun kariyer seviyesini belirtiniz"),

    educationLevel: z.string().nonempty("Aranan eğitim düzeyini seçiniz"),

    introductionUrl: z.string(),
  })
  .refine(
    (val) =>
      val.applicationMethod === "NextHire üzerinden" ||
      (val.applicationAddress && val.applicationAddress.trim() !== ""),
    {
      error:
        "Seçilen başvuru yöntemine göre geçerli bir başvuru adresi girilmelidir",
      path: ["applicationAddress"],
    }
  )
  .refine((val) => Number(val.minSalary) <= Number(val.maxSalary), {
    error: "Minimum maaş, maksimum maaştan büyük olamaz",
    path: ["minSalary"],
  })
  .refine((val) => Number(val.maxSalary) >= Number(val.minSalary), {
    error: "Maksimum maaş, minimum maaştan az olamaz",
    path: ["maxSalary"],
  });

export type shareJobFormSchemaType = z.infer<typeof shareJobFormSchema>;
export type formFields = keyof shareJobFormSchemaType;
