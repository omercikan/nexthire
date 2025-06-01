import { setJobSearchFilterData } from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch } from "@/lib/redux/store";
import { useDispatch } from "react-redux";
import useJobFilter from "./useJobFilter";

const useItemFilterText = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filterJob } = useJobFilter();

  const applyItemFilter = (
    item: string,
    isApplyJob: boolean,
    isApplyLocation: boolean
  ) => {
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
