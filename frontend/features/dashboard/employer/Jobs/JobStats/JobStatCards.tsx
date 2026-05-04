import { useEmployerJobsData } from "../hooks/useEmployerJobsData";
import StatCardItem from "./StatCardItem";

const JobStatCards = () => {
  const { stats, isLoading } = useEmployerJobsData();

  return (
    <div className="mt-8 grid grid-cols-4 max-sm:grid-cols-2 gap-3">
      <StatCardItem
        label="Toplam"
        value={stats?.total ?? 0}
        isLoading={isLoading}
      />

      <StatCardItem
        label="Aktif"
        value={stats?.published ?? 0}
        className="text-emerald-600"
        isLoading={isLoading}
      />
      <StatCardItem
        label="Pasif"
        value={stats?.passive ?? 0}
        className="text-slate-500"
        isLoading={isLoading}
      />
      <StatCardItem
        label="Taslak"
        value={stats?.draft ?? 0}
        className="text-amber-600"
        isLoading={isLoading}
      />
    </div>
  );
};

export default JobStatCards;
