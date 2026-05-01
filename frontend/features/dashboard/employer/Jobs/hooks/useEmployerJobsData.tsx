import { useEffect } from "react";
import { useGetEmployerJobsQuery } from "../services/employerJobsApi";
import { useRouter, useSearchParams } from "next/navigation";

export const useEmployerJobsData = () => {
  const router = useRouter();
  const page = useSearchParams().get("page") ?? "1";
  const { data, isLoading } = useGetEmployerJobsQuery({ page });

  useEffect(() => {
    if (!isLoading && data && Number(page) > data.totalPages) {
      router.replace("?page=1");
    }
  }, [data, isLoading, page, router]);

  return {
    jobs: data?.jobs ?? [],
    stats: data?.stats ?? null,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    page,
  };
};
