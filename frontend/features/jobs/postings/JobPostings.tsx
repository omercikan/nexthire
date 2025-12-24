import JobList from "./components/JobList/JobList";
import useJobActions from "./components/JobList/useJobActions";
import Pagination from "./components/pagination/JobPagination";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import FilterBar from "./components/FilterBar";
import ResultNavigator from "./components/ResultNavigator";
import { openFilterMenu } from "@/shared/redux/slices/filters";
import { useDispatch } from "react-redux";

const JobPostings = () => {
  const { data, filtersItem, isFetching } = useJobActions();
  const dispatch = useDispatch();

  return (
    <div className="flex-[calc(67.2%+.0625rem)] max-md:w-full">
      <>
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
          searchedDataLength={isFetching ? 0 : (data?.totalCounts as number)}
        />
      </>

      <JobList />

      {!filtersItem.length && !isFetching && (
        <Pagination countJobs={data?.totalCounts as number} />
      )}
    </div>
  );
};

export default JobPostings;
