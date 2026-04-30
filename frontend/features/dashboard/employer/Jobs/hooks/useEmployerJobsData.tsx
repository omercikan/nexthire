import { useGetEmployerJobsQuery } from "../services/employerJobsApi";
import { useSearchParams } from "next/navigation";

export const useEmployerJobsData = () => {
  const page = useSearchParams().get("page") ?? "1";
  const { data, isLoading } = useGetEmployerJobsQuery({ page });

  return {
    jobs: data?.jobs ?? [],
    stats: data?.stats ?? null,
    isLoading,
  };
};
