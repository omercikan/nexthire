import { useContext } from "react";
import StatCard from "./StatCard/StatCard";
import { AuthContext } from "@/features/auth/authContext";
import AnalyticsCharts from "./Chart/AnalyticsCharts";

const Overview = () => {
  const { user } = useContext(AuthContext);
  const firstName = user?.fullname.split(" ")[0];

  return (
    <div>
      <p className="mb-6 text-[#5b646f] max-sm:text-center max-sm:mt-4">
        Hoş geldin <strong>{firstName}</strong>! İşte iş ilanlarınla ilgili son
        durum.
      </p>

      <StatCard />
      <AnalyticsCharts />
    </div>
  );
};

export default Overview;
