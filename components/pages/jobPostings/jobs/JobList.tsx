import { useGetJobPostingsQuery } from "@/lib/redux/services/jobPostings";
import { EmployerOpenJobs } from "@/types";
import React, { useState } from "react";
import JobItem from "./JobItem";
import { JobCompanyInformations } from "@/types/filtersJob";
import ResultNavigator from "./ResultNavigator";
import FilterBar from "./FilterBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";
import useCreateArray from "@/hooks/useCreateArray";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";
import useJobFilter from "@/hooks/useJobFilter";
import {
  openFilterMenu,
  setPagination,
} from "@/lib/redux/features/filterJobs/filters";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

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
  const paginationButtons = useCreateArray(
    data?.countJobs < 10
      ? Math.floor(10 / data?.countJobs - 1)
      : Math.ceil(data?.countJobs / 10)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { filterJob } = useJobFilter();
  const dispatch = useDispatch();

  const handleChangePage = (currentIndex: number) => {
    setCurrentPage(currentIndex);
    const nextPage = 10 * currentIndex;
    const prevPage = nextPage - 10;
    dispatch(
      setPagination({ nextPageValue: nextPage, prevPageValue: prevPage })
    );

    if (currentPage !== currentIndex) {
      filterJob();
      window.scrollTo({ top: 0 });
    }
  };
  return (
    <div className="flex-[calc(67.2%+.0625rem)] max-md:w-full">
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
            (filterData.jobs.length
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

      {/*//* Pagination area */}
      {!(loading || isLoading) && !filtersItem?.length && (
        <div className="flex justify-center items-center gap-5 lg:sticky lg:bottom-0 bg-white p-4">
          <li
            className={`${
              currentPage > 1
                ? "opacity-100 visible cursor-pointer"
                : "opacity-0 invisible"
            } hover:bg-[#1967d2] text-black hover:text-white w-[44px] h-[44px] grid place-content-center rounded-full transition-colors duration-500`}
            onClick={() => handleChangePage(currentPage - 1)}
          >
            <GoChevronLeft size={22} />
          </li>
          <ul className="flex justify-center items-center gap-5">
            {paginationButtons.map((_, i) => (
              <li key={i} className="">
                <span
                  className={`${
                    currentPage === i + 1
                      ? "bg-[#1967d2] text-white cursor-default"
                      : "bg-transparent text-black cursor-pointer"
                  } w-[44px] h-[44px] hover:bg-[#1967d2] select-none hover:text-white grid place-content-center rounded-full transition-colors duration-500`}
                  onClick={() => handleChangePage(i + 1)}
                >
                  {i + 1}
                </span>
              </li>
            ))}
          </ul>
          <li
            className={`${
              paginationButtons.length === currentPage
                ? "opacity-0 invisible"
                : "opacity-100 visible cursor-pointer"
            } hover:bg-[#1967d2] text-black hover:text-white w-[44px] h-[44px] grid place-content-center rounded-full transition-colors duration-500`}
            onClick={() => handleChangePage(currentPage + 1)}
          >
            <GoChevronRight size={22} />
          </li>
        </div>
      )}
    </div>
  );
};

export default JobList;
