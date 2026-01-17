import {
  clearAllFilters,
  selectFiltersItem,
} from "../redux/slices/filtersValues";
import useJobFilter from "./job-filter/useJobFilter";
import useMultipleDispatch from "./useMultipleDispatch";
import { clearFilters, setFilters } from "../redux/slices/filtersData";
import { useCallback } from "react";

const useItemFilterText = () => {
  const { handleFilter } = useJobFilter();
  const dispatchs = useMultipleDispatch();

  const applyItemFilter = useCallback(
    (item: string, isApplyJob: boolean) => {
      dispatchs([
        clearAllFilters(),
        clearFilters(),
        selectFiltersItem([item]),
        setFilters(isApplyJob ? { jobTitle: item } : { location: item }),
      ]);

      handleFilter();
    },
    [dispatchs, handleFilter],
  );

  return { applyItemFilter };
};

export default useItemFilterText;
