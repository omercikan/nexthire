import { FilterSwitchInterface, JobTypesInterface } from "@/types/filtersJob";

export const JOB_TYPES: JobTypesInterface = [
  "Hibrit",
  "Stajyer",
  "Freelance",
  "İş Yerinde",
  "Tam Zamanlı",
  "Yarı Zamanlı",
  "Uzaktan / Remote",
];

export const EXPERIENCE_LEVELS: FilterSwitchInterface[] = [
  { itemText: "Deneyimli" },
  { itemText: "Deneyimsiz" },
  { itemText: "1 Yıl" },
  { itemText: "2 Yıl" },
  { itemText: "3 Yıl" },
  { itemText: "4 Yıl" },
];

export const CAREER_LEVELS: FilterSwitchInterface[] = [
  { itemText: "Uzman" },
  { itemText: "Kıdemli Uzman" },
  { itemText: "Uzman Yardımcısı" },
  { itemText: "Stajyer" },
  { itemText: "Yeni Mezun" },
  { itemText: "Takım Lideri" },
  { itemText: "Kıdemli Yönetici" },
  { itemText: "Müdür" },
  { itemText: "Genel Müdür" },
  { itemText: "Genel Müdür Yardımcısı" },
];
