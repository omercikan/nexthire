import { setFilterData } from "@/lib/redux/features/filterJobs/filters";
import { setLoading } from "@/lib/redux/features/loading";
import { useFilterJobPostingsMutation } from "@/lib/redux/services/jobPostings";
import { AppDispatch, store } from "@/lib/redux/store";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const useJobFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [applyFilter, results] = useFilterJobPostingsMutation();

  const filterJob = useCallback(() => {
    setTimeout(async () => {
      const {
        experienceLevel,
        careerLevel,
        jobType,
        sortValue,
        jobKeywords,
        locationKeywords,
      } = store.getState().jobFilters;

      const currentData = await applyFilter({
        sort:
          (sortValue.includes("yeni") && "asc") ||
          (sortValue.includes("eski") && "desc") ||
          (sortValue.startsWith("Sıralama") && undefined),
        modeOfWork: jobType,
        experienceTime: experienceLevel,
        positionLevel: careerLevel,
        jobKeywords: jobKeywords,
        locationKeywords: locationKeywords,
      });

      if (currentData.data) {
        dispatch(
          setFilterData({
            isLoading: results?.isLoading,
            isFilter:
              experienceLevel.length ||
              careerLevel.length ||
              jobType.length ||
              sortValue.length ||
              jobKeywords.length ||
              locationKeywords.length
                ? true
                : false,
            countJobs:
              experienceLevel.length ||
              careerLevel.length ||
              jobType.length ||
              sortValue.length ||
              jobKeywords.length ||
              locationKeywords.length
                ? currentData?.data?.countJobs
                : 0,
            jobs: currentData?.data?.jobs,
          })
        );
      }
    }, 0);
  }, [applyFilter, dispatch, results?.isLoading]);

  useEffect(() => {
    if (results.isLoading) {
      dispatch(setLoading(results.isLoading));
    } else {
      dispatch(setLoading(results.isLoading));
    }
  }, [results.isLoading, dispatch]);

  return { filterJob, isLoading: results?.isLoading };
};

export default useJobFilter;
