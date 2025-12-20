export const SHARE_JOB_FIELDS = [
  {
    id: 1,
    label: "Pozisyon Başlığı",
    name: "jobTitle",
    type: "input",
    field: "text",
    placeholder: "Örn: Frontend Yazılım Geliştirici",
  },

  {
    id: 2,
    label: "İlan Kategorisi",
    name: "category",
    type: "select",
    options: [
      "Yazılım & Bilişim",
      "Tasarım & Kreatif",
      "Pazarlama & Reklam",
      "Satış & Müşteri Hizmetleri",
      "Muhasebe & Finans",
      "İnsan Kaynakları",
      "Mühendislik",
      "Eğitim",
      "Sağlık",
      "Lojistik & Üretim",
    ],
    defaultValue: "İlan kategorisini seçiniz",
  },

  {
    id: 3,
    label: "Çalışma Şekli",
    name: "workType",
    type: "select",
    options: [
      "Tam Zamanlı",
      "Yarı Zamanlı",
      "Serbest (Freelance)",
      "Stajyer",
      "Uzaktan",
      "Hibrit",
    ],
    defaultValue: "Çalışma şeklini seçiniz",
  },

  {
    id: 4,
    label: "Tercih Edilen Cinsiyet",
    name: "gender",
    type: "select",
    options: ["Erkek", "Kadın", "Fark Etmez"],
    defaultValue: "Cinsiyet tercihini seçiniz",
  },

  {
    id: 5,
    label: "Maaş Periyodu",
    name: "salaryPeriod",
    type: "select",
    options: ["Aylık", "Haftalık", "Günlük", "Saatlik", "Yıllık"],
    defaultValue: "Maaş periyodunu seçiniz",
  },

  {
    id: 6,
    label: "Minimum Maaş",
    name: "minSalary",
    type: "input",
    field: "number",
    min: 0,
    inputMode: "numeric",
    placeholder: "Belirlenen minimum maaş tutarı",
    className: "none-spin-button",
  },

  {
    id: 7,
    label: "Maksimum Maaş",
    name: "maxSalary",
    type: "input",
    field: "number",
    min: 0,
    inputMode: "numeric",
    placeholder: "Belirlenen maksimum maaş tutarı",
    className: "none-spin-button",
  },

  {
    id: 8,
    label: "Deneyim Süresi",
    name: "experience",
    type: "input",
    field: "text",
    placeholder: "Örn: 2–5 yıl arası deneyim",
  },

  {
    id: 9,
    label: "Kariyer Seviyesi",
    name: "careerLevel",
    type: "input",
    field: "text",
    placeholder: "Örn: Junior / Mid-Level / Senior",
  },

  {
    id: 10,
    label: "Eğitim Düzeyi",
    name: "educationLevel",
    type: "select",
    options: [
      "Fark Etmez",
      "İlkokul",
      "Ortaokul",
      "Lise",
      "Önlisans",
      "Lisans",
      "Yüksek Lisans",
      "Doktora",
    ],
    defaultValue: "Eğitim düzeyini seçiniz",
  },

  {
    id: 11,
    label: "Tanıtım Videosu Bağlantısı",
    name: "introductionUrl",
    type: "input",
    field: "text",
    placeholder: "Varsa tanıtım videosu bağlantısını giriniz",
  },
];

export type ShareJobFields = typeof SHARE_JOB_FIELDS;
