import { useSelector } from "react-redux";
import { useGetJobsQuery } from "../../services/jobsApi";
import { RootState } from "@/shared/redux/store";
import { useGetFavoritesQuery } from "../Favorite/favoritesApi";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/authContext";

const useJobActions = () => {
  const {
    jobFilters: { filterData, filtersItem },
    paginationSlice: { currentPage },
  } = useSelector((state: RootState) => state);
  const { data, isFetching } = useGetJobsQuery({ page: currentPage });
  const jobData = filtersItem?.length ? filterData : data;
  const { user } = useContext(AuthContext);

  const { data: favoriteData } = useGetFavoritesQuery(undefined, {
    skip: !Boolean(user),
  });

  return {
    data: jobData,
    favoriteData,
    isFetching,
    filterData,
    filtersItem,
  };
};

export default useJobActions;
