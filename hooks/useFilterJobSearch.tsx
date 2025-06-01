import {
  selectFiltersItem,
  selectJobKeyword,
  selectLocationKeyword,
  setJobSearchFilterData,
} from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { JobSearchFilters } from "@/types/filtersJob";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const useFilterJobSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobKeywords, locationKeywords, filtersItem } = useSelector(
    (state: RootState) => state.jobFilters
  );
  const pathname = usePathname();

  const filterSearchJob = (locationKeyword: string, jobKeyword: string) => {
    const trimmedJobKeyword = jobKeyword.trim();
    const trimmedLocationKeyword = locationKeyword.trim();

    const jobSearchFilters: JobSearchFilters = {
      jobKeywords: trimmedJobKeyword ? [trimmedJobKeyword] : [],
      locationKeywords: trimmedLocationKeyword ? [trimmedLocationKeyword] : [],
      filterItems: [trimmedJobKeyword, trimmedLocationKeyword].filter(Boolean),
    };

    if (pathname === "/") {
      dispatch(setJobSearchFilterData(jobSearchFilters));
    }

    const updatedFilters = new Set(filtersItem); //! Unique filter items !//

    if (trimmedLocationKeyword) {
      if (
        !locationKeywords.includes(locationKeyword) &&
        pathname === "/is-ilanlari"
      ) {
        dispatch(
          selectLocationKeyword([...locationKeywords, trimmedLocationKeyword])
        );
        updatedFilters.add(trimmedLocationKeyword);
      }
    }

    if (trimmedJobKeyword) {
      if (
        !jobKeywords.includes(trimmedJobKeyword) &&
        pathname === "/is-ilanlari"
      ) {
        dispatch(selectJobKeyword([...jobKeywords, trimmedJobKeyword]));
        updatedFilters.add(trimmedJobKeyword);
      }
    }

    if (updatedFilters.size !== filtersItem.length) {
      dispatch(selectFiltersItem([...updatedFilters]));
    }
  };

  return { filterSearchJob };
};

export default useFilterJobSearch;
