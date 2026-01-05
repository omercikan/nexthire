import { useSelector } from "react-redux";
import { useGetJobsQuery } from "../../services/jobsApi";
import { RootState } from "@/shared/redux/store";

const useJobActions = () => {
  const {
    jobFilters: { filterData, filtersItem },
    paginationSlice: { currentPage },
  } = useSelector((state: RootState) => state);
  const { data, isFetching } = useGetJobsQuery({ page: currentPage });
  const jobData = filtersItem?.length ? filterData : data;

  return {
    data: jobData,
    isFetching,
    filterData,
    filtersItem,
  };
};

export default useJobActions;
