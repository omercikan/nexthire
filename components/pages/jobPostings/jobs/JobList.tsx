import { useGetJobPostingsQuery } from "@/lib/redux/services/jobPostings";
import { EmployerOpenJobs } from "@/types";
import React from "react";
import JobItem from "./JobItem";
import { JobCompanyInformations } from "@/types/filtersJob";
import ResultNavigator from "./ResultNavigator";
import FilterBar from "./FilterBar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";

const JobList = () => {
  const { filterData } = useSelector((state: RootState) => state.jobFilters);
  const { loading } = useSelector((state: RootState) => state.loading);
  const { data, isLoading } = useGetJobPostingsQuery<{
    data: {
      jobs: (JobCompanyInformations & EmployerOpenJobs)[];
      countJobs: number;
    };
    isLoading: boolean;
  }>(undefined);

  return (
    <div className="flex-[calc(67.2%+.0625rem)]">
      <FilterBar />
      <ResultNavigator
        searchedDataLength={
          isLoading || loading
            ? 0
            : (filterData.isFilter
                ? filterData?.countJobs
                : data?.jobs.length) ?? 0
        }
      />

      {isLoading || loading ? (
        <LoaderSkeleton
          animationType="wave"
          variant="rectangular"
          sxClass={{
            width: "100%",
            height: "150.6px",
            borderRadius: "8px",
          }}
          extraSxClass={{ marginBottom: "30px", backgroundColor: "#f3f4f6" }}
          length={
            (filterData.countJobs ? filterData?.countJobs : data?.countJobs) ??
            4
          }
        />
      ) : filterData?.countJobs === 0 && filterData?.isFilter ? (
        <div className="bg-[#D4E1F5] text-[#1967D2] p-[15px] rounded-lg">
          <p>Aramana uygun bir sonuç bulunamadı. 😔</p>
        </div>
      ) : filterData?.countJobs > 0 && filterData?.isFilter ? (
        filterData?.jobs.map((job) => <JobItem key={job.postId} job={job} />)
      ) : (
        data?.jobs.map((job) => <JobItem key={job.postId} job={job} />)
      )}
    </div>
  );
};

export default JobList;
