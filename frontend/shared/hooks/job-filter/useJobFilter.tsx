import { useFilterJobPostingsMutation } from "@/shared/redux/services/jobPostings";
import { AppDispatch, store } from "@/shared/redux/store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "./loadingSlice";
import { setFilterData } from "@/shared/redux/slices/filters";

const useJobFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [applyFilter, results] = useFilterJobPostingsMutation();

  const filterJob = useCallback(async () => {
    dispatch(setLoading(true));

    const {
      experienceLevel,
      careerLevel,
      jobType,
      sortValue,
      jobKeywords,
      locationKeywords,
      prevPageValue,
      nextPageValue,
      pageValue,
    } = store.getState().jobFilters;

    const currentData = await applyFilter({
      sort:
        (sortValue.includes("yeni") && "asc") ||
        (sortValue.includes("eski") && "desc") ||
        (sortValue.startsWith("Sıralama") && undefined),
      start: prevPageValue,
      end: nextPageValue,
      modeOfWork: jobType,
      experienceTime: experienceLevel,
      positionLevel: careerLevel,
      jobKeywords: jobKeywords,
      locationKeywords: locationKeywords,
      pageValue: pageValue,
    });

    const isAnyFilterItem =
      experienceLevel.length ||
      careerLevel.length ||
      jobType.length ||
      sortValue.length ||
      jobKeywords.length ||
      locationKeywords.length ||
      prevPageValue ||
      nextPageValue;

    if (currentData.data) {
      dispatch(
        setFilterData({
          isFilter: isAnyFilterItem ? true : false,
          countJobs: isAnyFilterItem ? currentData?.data?.countJobs : 0,
          jobs: currentData?.data?.jobs,
        })
      );
      dispatch(setLoading(false));
    }
  }, [applyFilter, dispatch]);

  return { filterJob, isLoading: results?.isLoading };
};

export default useJobFilter;
