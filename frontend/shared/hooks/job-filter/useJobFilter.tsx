import { useLazyFilterJobQuery } from "@/features/jobs/postings/services/jobsApi";
import { setFilterData } from "@/shared/redux/slices/filtersValues";
import { AppDispatch, store } from "@/shared/redux/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useJobFilter = () => {
  const [applyFilter] = useLazyFilterJobQuery();
  const dispatch = useDispatch<AppDispatch>();

  const handleFilter = useCallback(async () => {
    const {
      filtersSlice,
      paginationSlice: { currentPage },
      jobFilters: { filtersItem },
    } = store.getState();

    try {
      const sortValue = filtersSlice.sort;

      if (filtersItem.length) {
        dispatch(setFilterData({ isFetching: true }));

        const data = await applyFilter({
          ...filtersSlice,
          page: currentPage,
          perPage: filtersSlice.perPage === "Tümü" ? "all" : 10,
          sort: sortValue === "" ? 1 : sortValue === "En Yeni" ? 1 : -1,
        }).unwrap();

        if (data) {
          dispatch(setFilterData({ filterData: data, isFetching: false }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  }, [applyFilter, dispatch]);

  return { handleFilter };
};

export default useJobFilter;
