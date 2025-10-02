import { AppDispatch, RootState } from "@/shared/redux/store";
import { JobSearchFilters } from "@/shared/types/filtersJob";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearAllFilters, setJobSearchFilterData } from "../redux/slices/filters";

const useFilterJobSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobKeywords, locationKeywords, filtersItem } = useSelector(
    (state: RootState) => state.jobFilters
  );
  const pathname = usePathname();

  const filterSearchJob = (locationKeyword: string, jobKeyword: string) => {
    const trimmedJobKeyword = jobKeyword.trim();
    const trimmedLocationKeyword = locationKeyword.trim();

    //? Filters for homepage job search ("/") ?//
    const homeSearchFilters: JobSearchFilters = {
      jobKeywords: trimmedJobKeyword ? [trimmedJobKeyword] : [],
      locationKeywords: trimmedLocationKeyword ? [trimmedLocationKeyword] : [],
      filterItems: [trimmedJobKeyword, trimmedLocationKeyword].filter(Boolean),
    };

    //? Job search filters for the ("/is-ilanlari") page ?//
    const jobPostingsSearchFilters: JobSearchFilters = {
      jobKeywords: [...jobKeywords, trimmedJobKeyword].filter(Boolean),
      locationKeywords: [...locationKeywords, trimmedLocationKeyword].filter(
        Boolean
      ),
      filterItems: Array.from(
        new Set([...filtersItem, trimmedJobKeyword, trimmedLocationKeyword])
      ).filter(Boolean),
    };

    switch (pathname) {
      case "/": //* match home ("/") route only
        dispatch(clearAllFilters());
        dispatch(setJobSearchFilterData(homeSearchFilters));
        break;
      case "/is-ilanlari": //* only match ("/is-ilanlari") route
        dispatch(setJobSearchFilterData(jobPostingsSearchFilters));
        break;
      default:
        dispatch(clearAllFilters());
    }
  };

  return { filterSearchJob };
};

export default useFilterJobSearch;
