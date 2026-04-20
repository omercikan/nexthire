const statusMap = {
  published: {
    text: "Aktif",
    style: "text-[#059669] bg-[#ecfdf5] border-[#a7f3d0]",
  },
  draft: {
    text: "Taslak",
    style: "text-[#d97706] bg-[#fef3c7] border-[#fcd34d]",
  },
  passive: {
    text: "Pasif",
    style: "text-[#6b7280] bg-[#f3f4f6] border-[#e5e7eb]",
  },
};

const workTypeMap: Record<string, { text: string; style: string }> = {
  "tam-zamanlı": { text: "Tam Zamanlı", style: "text-[#2563eb] bg-[#eff6ff]" },
  "yarı-zamanlı": {
    text: "Yarı Zamanlı",
    style: "text-[#0d9488] bg-[#f0fdfa]",
  },
  freelance: {
    text: "Serbest (Freelance)",
    style: "text-[#d97706] bg-[#fef3c7]",
  },
  stajyer: { text: "Stajyer", style: "text-[#059669] bg-[#ecfdf5]" },
  uzaktan: { text: "Uzaktan", style: "text-[#2563eb] bg-[#eff6ff]" },
  hibrit: { text: "Hibrit", style: "text-[#7c3aed] bg-[#faf5ff]" },
};

export { statusMap, workTypeMap };
