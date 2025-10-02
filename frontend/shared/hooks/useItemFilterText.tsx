import { AppDispatch } from "@/shared/redux/store";
import { useDispatch } from "react-redux";
import useJobFilter from "./job-filter/useJobFilter";
import { clearAllFilters, setJobSearchFilterData } from "../redux/slices/filters";

const useItemFilterText = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filterJob } = useJobFilter();

  const applyItemFilter = (
    item: string,
    isApplyJob: boolean,
    isApplyLocation: boolean
  ) => {
    dispatch(clearAllFilters());
    dispatch(
      setJobSearchFilterData({
        filterItems: [item],
        jobKeywords: isApplyJob ? [item] : [],
        locationKeywords: isApplyLocation ? [item] : [],
      })
    );
    filterJob();
  };

  return { applyItemFilter };
};

export default useItemFilterText;
