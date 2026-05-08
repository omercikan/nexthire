export const statusMap = {
  Yeni: { value: "Yeni", style: "text-blue-700 bg-blue-50 border-blue-200" },
  pending: {
    value: "İncelenmedi",
    style: "text-amber-700 bg-amber-50 border-amber-200",
  },
  reviewed: {
    value: "İncelendi",
    style: "text-sky-700 bg-sky-50 border-sky-200",
  },
  shortlisted: {
    value: "Kısa Liste",
    style: "text-emerald-700 bg-emerald-50 border-[#a4f4cf]",
  },
  accepted: {
    value: "Kabul Edildi",
    style: "text-green-700 bg-green-50 border-green-200",
  },
  scheduled: {
    value: "Mülakat",
    style: "text-indigo-700 bg-indigo-50 border-[#c6d2ff]",
  },
  interviewed: {
    value: "Mülakata Alındı",
    style: "text-violet-700 bg-violet-50 border-violet-200",
  },
  hired: {
    value: "İşe Alındı",
    style: "text-teal-700 bg-teal-50 border-teal-200",
  },
  rejected: {
    value: "Reddedildi",
    style: "text-red-600 bg-red-50 border-[#ffc9c9]",
  },
  auto_rejected: {
    value: "Otomatik Red",
    style: "text-red-700 bg-red-100 border-[#ffa2a2]",
  },
};
