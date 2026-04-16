import StatCardItem from "./StatCardItem";

const JobStatCards = () => {
  return (
    <div className="mt-8 flex gap-3">
      <StatCardItem label="Toplam" value="8" />
      <StatCardItem label="Aktif" value="5" className="text-emerald-600" />
      <StatCardItem label="Pasif" value="2" className="text-slate-500" />
      <StatCardItem label="Taslak" value="1" className="text-amber-600" />
    </div>
  );
};

export default JobStatCards;
