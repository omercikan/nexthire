import {
  selectFiltersItem,
  selectJobKeyword,
  selectLocationKeyword,
  setJobSearchFilterData,
} from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
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

    if (pathname === "/") {
      if (trimmedJobKeyword && !trimmedLocationKeyword) {
        dispatch(
          setJobSearchFilterData({
            jobKeywords: [trimmedJobKeyword],
            filterItems: [trimmedJobKeyword],
            locationKeywords: [],
          })
        );
      } else if (trimmedLocationKeyword && !trimmedJobKeyword) {
        dispatch(
          setJobSearchFilterData({
            jobKeywords: [],
            filterItems: [trimmedLocationKeyword],
            locationKeywords: [trimmedLocationKeyword],
          })
        );
      } else if (!trimmedJobKeyword && !trimmedLocationKeyword) {
        dispatch(
          setJobSearchFilterData({
            jobKeywords: [],
            filterItems: [],
            locationKeywords: [],
          })
        );
      } else {
        dispatch(
          setJobSearchFilterData({
            jobKeywords: [trimmedJobKeyword],
            filterItems: [trimmedJobKeyword, trimmedLocationKeyword],
            locationKeywords: [trimmedLocationKeyword],
          })
        );
      }
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
