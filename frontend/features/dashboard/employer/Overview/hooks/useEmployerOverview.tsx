import { useGetEmployerOverviewQuery } from "../service/overview-api";

const useEmployerOverview = () => {
  const { data, isLoading, isError } = useGetEmployerOverviewQuery();

  return {
    stats: data?.stats,
    applicantTrends: data?.applicantTrends,
    jobPerformance: data?.jobPerformance,
    recentActivity: data?.recentActivity,
    isLoading,
    isError,
  };
};

export default useEmployerOverview;
