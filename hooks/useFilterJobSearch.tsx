import {
  selectFiltersItem,
  selectJobKeyword,
  selectLocationKeyword,
} from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";

const useFilterJobSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobKeywords, locationKeywords, filtersItem } = useSelector(
    (state: RootState) => state.jobFilters
  );

  const filterSearchJob = (locationKeyword: string, jobKeyword: string) => {
    const trimmedJobKeyword = jobKeyword.trim();
    const trimmedLocationKeyword = locationKeyword.trim();

    const updatedFilters = new Set(filtersItem); //! Unique filter items !//

    if (trimmedLocationKeyword) {
      if (!locationKeywords.includes(locationKeyword)) {
        dispatch(
          selectLocationKeyword([...locationKeywords, trimmedLocationKeyword])
        );
      }
      updatedFilters.add(trimmedLocationKeyword);
    }

    if (trimmedJobKeyword) {
      if (!jobKeywords.includes(trimmedJobKeyword)) {
        dispatch(selectJobKeyword([...jobKeywords, trimmedJobKeyword]));
      }
      updatedFilters.add(trimmedJobKeyword);
    }

    if (updatedFilters.size !== filtersItem.length) {
      dispatch(selectFiltersItem([...updatedFilters]));
    }
  };

  return { filterSearchJob };
};

export default useFilterJobSearch;
