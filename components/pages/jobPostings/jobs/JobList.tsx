import { useGetJobPostingsQuery } from "@/lib/redux/services/jobPostings";
import { EmployerOpenJobs } from "@/types";
import React from "react";
import JobItem from "./JobItem";
import { JobCompanyInformations } from "@/types/filtersJob";
import ResultNavigator from "./ResultNavigator";
import FilterBar from "./FilterBar";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

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
        "Yükleniyor"
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
