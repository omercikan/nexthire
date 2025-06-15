import { useGetJobPostingsQuery } from "@/lib/redux/services/jobPostings";
import { EmployerOpenJobs } from "@/types";
import React from "react";
import JobItem from "./JobItem";
import { JobCompanyInformations } from "@/types/filtersJob";
import ResultNavigator from "./ResultNavigator";
import FilterBar from "./FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";
import { openFilterMenu } from "@/lib/redux/features/filterJobs/filters";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import JobPagination from "./JobPagination";

const JobList = () => {
  const { filterData, filtersItem } = useSelector(
    (state: RootState) => state.jobFilters
  );
  const { loading } = useSelector((state: RootState) => state.loading);
  const { data, isLoading } = useGetJobPostingsQuery<{
    data: {
      jobs: (JobCompanyInformations & EmployerOpenJobs)[];
      countJobs: number;
    };
    isLoading: boolean;
  }>(undefined);

  const dispatch = useDispatch();

  return (
    <div className="flex-[calc(67.2%+.0625rem)] max-md:w-full">
      {!filtersItem?.length && (
        <div
          className="flex gap-2 items-center cursor-pointer group w-max min-[1025px]:hidden"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(openFilterMenu(true));
          }}
        >
          <TbAdjustmentsHorizontal size={20} color="1967d2" />
          <span className="text-[#1967d2] font-bold text-sm group-hover:underline">
            Filtreleri Göster
          </span>
        </div>
      )}

      <FilterBar />
      <ResultNavigator
        searchedDataLength={isLoading || loading ? 0 : data?.countJobs}
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
            (filterData?.jobs.length
              ? filterData?.jobs.length
              : data?.countJobs) ?? 4
          }
        />
      ) : filterData?.countJobs === 0 && filterData?.isFilter ? (
        <div className="bg-[#D4E1F5] text-[#1967D2] p-[15px] mb-[30px] rounded-lg">
          <p>Aramana uygun bir sonuç bulunamadı. 😔</p>
        </div>
      ) : filterData?.jobs.length > 0 && filterData?.isFilter ? (
        filterData?.jobs.map((job) => <JobItem key={job.postId} job={job} />)
      ) : (
        data?.jobs.map((job) => <JobItem key={job.postId} job={job} />)
      )}

      {!filtersItem?.length && !isLoading && (
        <JobPagination countJobs={data?.countJobs} />
      )}
    </div>
  );
};

export default JobList;
