import { useSelector } from "react-redux";
import { useGetJobsQuery } from "../../services/jobsApi";
import { RootState } from "@/shared/redux/store";

const useJobActions = () => {
  const {
    jobFilters: { filterData, filtersItem },
    paginationSlice: { currentPage },
  } = useSelector((state: RootState) => state);
  const { data, isFetching } = useGetJobsQuery({ page: currentPage });

  return { data, isFetching, filterData, filtersItem };
};

export default useJobActions;
