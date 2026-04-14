import { useContext } from "react";
import StatCard from "./StatCard/StatCard";
import { AuthContext } from "@/features/auth/authContext";
import AnalyticsCharts from "./Chart/AnalyticsCharts";
import RecentActivity from "./RecentActivity/RecentActivity";
import QuickActions from "./QuickActions/QuickActions";
import useEmployerOverview from "../hooks/useEmployerOverview";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const firstName = user?.fullname.split(" ")[0];
  const { stats, isLoading } = useEmployerOverview();

  return (
    <div>
      <p className="mb-6 text-[#5b646f] max-sm:text-center max-sm:mt-4">
        Hoş geldin <strong>{firstName}</strong>! İşte iş ilanlarınla ilgili son
        durum.
      </p>

      <StatCard stats={stats} isLoading={isLoading} />
      <AnalyticsCharts />

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <RecentActivity />
        <QuickActions />
      </div>
    </div>
  );
};

export default Overview;
