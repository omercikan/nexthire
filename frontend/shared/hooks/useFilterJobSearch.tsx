import { AppDispatch, RootState } from "@/shared/redux/store";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllFilters,
  selectFiltersItem,
} from "../redux/slices/filtersValues";
import useMultipleDispatch from "./useMultipleDispatch";
import { clearFilters, setFilters } from "../redux/slices/filtersData";
import { setPage } from "@/features/jobs/postings/components/pagination/paginationSlice";

const useFilterJobSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);
  const multipleDispatch = useMultipleDispatch();
  const pathname = usePathname();

  const filterSearchJob = (jobTitle: string, location: string) => {
    const arrayValues = Array.from([jobTitle, location]);
    dispatch(setPage(1));

    switch (pathname) {
      case "/":
        multipleDispatch([
          clearAllFilters(),
          selectFiltersItem(arrayValues.filter(Boolean)),
          setFilters({ jobTitle, location }),
        ]);
        break;
      case "/is-ilanlari":
        if (arrayValues.some((v) => Boolean(v))) {
          dispatch(
            selectFiltersItem(
              Array.from(
                new Set([...filtersItem, jobTitle, location].filter(Boolean))
              )
            )
          );
        }

        for (const [key, value] of Object.entries({ jobTitle, location })) {
          if (Boolean(value)) dispatch(setFilters({ [key]: value }));
        }
        break;
      default:
        multipleDispatch([clearAllFilters(), clearFilters()]);
    }
  };

  return { filterSearchJob };
};

export default useFilterJobSearch;
