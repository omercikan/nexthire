import { useEffect, useMemo } from "react";
import { useGetEmployerJobsQuery } from "../services/employerJobsApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { Job } from "../types/employerJobsTypes";

const searchFileds = (job: Job) => [
  job.department,
  job.jobLocation,
  job.category,
  job.jobTitle,
];

const matchesSearch = (job: Job, searchTerm: string) => {
  return searchFileds(job).some((field) =>
    field?.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()),
  );
};

const sortJobs = (jobs: Job[], sort: string) => {
  return [...jobs].sort((a, b) => {
    if (sort === "newest")
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === "oldest")
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    if (sort === "most_applied") return b.applicants - a.applicants;
    return 0;
  });
};

export const useEmployerJobsData = () => {
  const router = useRouter();
  const page = useSearchParams().get("page") ?? "1";
  const { data, isLoading } = useGetEmployerJobsQuery({ page });
  const {
    filters: { searchTerm, status, sort },
  } = useSelector((state: RootState) => state.jobListFilters);

  const jobs = useMemo(() => {
    if (!data?.jobs) return [];

    let result = data.jobs;

    if (searchTerm) {
      result = result.filter((job) => matchesSearch(job, searchTerm));
    }

    if (status && status !== "all")
      result = result.filter((job) => job.status === status);

    if (sort) result = sortJobs(result, sort);

    return result;
  }, [data?.jobs, searchTerm, status, sort]);

  useEffect(() => {
    if (!isLoading && data && Number(page) > data.totalPages) {
      router.replace("?page=1");
    }
  }, [data, isLoading, page, router]);

  return {
    jobs,
    stats: data?.stats ?? null,
    totalPages: data?.totalPages ?? 1,
    isLoading,
    page,
    isFiltered: !!searchTerm || !!status || !!sort,
  };
};
