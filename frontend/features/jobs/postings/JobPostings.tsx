import JobList from "./components/JobList/JobList";
import useJobActions from "./components/JobList/useJobActions";
import Pagination from "./components/pagination/JobPagination";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import FilterBar from "./components/FilterBar";
import ResultNavigator from "./components/ResultNavigator";
import { openFilterMenu } from "@/shared/redux/slices/filtersValues";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";

const JobPostings = () => {
  const { data } = useJobActions();
  const { perPage } = useSelector((state: RootState) => state.filtersSlice);
  const dispatch = useDispatch();

  return (
    <div className="flex-[calc(67.2%+.0625rem)] max-md:w-full">
      <>
        {(data?.totalCount[0]?.count as number) > 0 ? (
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
        ) : null}

        <FilterBar />

        <ResultNavigator dataLength={data?.totalCount[0]?.count as number} />
      </>

      <JobList />

      {data?.data.length && perPage !== "Tümü" ? (
        <Pagination countJobs={data?.totalCount[0]?.count} />
      ) : null}
    </div>
  );
};

export default JobPostings;
