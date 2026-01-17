import { useLazyFilterJobQuery } from "@/features/jobs/postings/services/jobsApi";
import { setFilterData } from "@/shared/redux/slices/filtersValues";
import { AppDispatch, store } from "@/shared/redux/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { PERPAGE_MAP, SORT_MAP } from "./constants";
import toast from "react-hot-toast";

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
          perPage: PERPAGE_MAP[filtersSlice.perPage] ?? 10,
          sort: SORT_MAP[sortValue] ?? -1,
        }).unwrap();

        if (data) {
          dispatch(setFilterData({ filterData: data, isFetching: false }));
        }
      }
    } catch {
      toast.error(
        "Şu anda iş ilanlarını getiremiyoruz. Lütfen biraz sonra tekrar deneyin.",
        { icon: "🚫" },
      );
    }
  }, [applyFilter, dispatch]);

  return { handleFilter };
};

export default useJobFilter;
