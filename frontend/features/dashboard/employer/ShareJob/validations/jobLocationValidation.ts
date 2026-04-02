import * as z from "zod";

const TURKISH_CITIES = [
  "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "Mersin",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce",
] as const;

export type TurkishCity = (typeof TURKISH_CITIES)[number];

const normalizeLocation = (val: string): string =>
  val
    .split(",")
    .map((part) => {
      const trimmed = part.trim().toLocaleLowerCase("tr-TR");
      return trimmed.charAt(0).toLocaleUpperCase("tr-TR") + trimmed.slice(1);
    })
    .join(", ");

const jobLocationSchema = z
  .string()
  .nonempty("İş konumu zorunludur")
  .refine(
    (val) => {
      const city = normalizeLocation(val).split(",")[0].trim();
      return TURKISH_CITIES.includes(city as TurkishCity);
    },
    { message: "Geçersiz şehir — örn: İstanbul veya İstanbul, Kadıköy" },
  )
  .refine((val) => val.split(",").length <= 2, {
    message: "En fazla 'Şehir, İlçe' formatında giriniz",
  })
  .refine(
    (val) => {
      const parts = val.split(",").map((p) => p.trim());
      return parts.length === 2 ? parts[1].length >= 2 : true;
    },
    { message: "İlçe adı en az 2 karakter olmalıdır" },
  )
  .transform(normalizeLocation);

export { jobLocationSchema };
