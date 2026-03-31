import useJobActions from "./useJobActions";
import LoaderSkeleton from "@/shared/components/ui/LoaderSkeleton";
import JobItem from "../JobItem";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import JobResultContent from "./JobResultContent";

const JobList = () => {
  const {
    data,
    favoriteData,
    isFetching: isDefaultDataFetching,
  } = useJobActions();
  const { isFetching: isFilterDataFetching, filtersItem } = useSelector(
    (state: RootState) => state.jobFilters,
  );
  const jobData = data?.data;

  switch (true) {
    case isDefaultDataFetching || isFilterDataFetching:
      return (
        <LoaderSkeleton
          animationType="wave"
          variant="rectangular"
          sxClass={{
            width: "100%",
            height: "150.6px",
            borderRadius: "8px",
          }}
          extraSxClass={{ marginBottom: "30px", backgroundColor: "#f3f4f6" }}
          length={jobData?.length ?? 4}
        />
      );
    case !jobData?.length && !isFilterDataFetching:
      return (
        <JobResultContent
          isFilterDataFetching={!!filtersItem.length}
          hasAnyJobs={!!jobData?.length}
        />
      );
    default:
      return jobData?.map((job) => (
        <JobItem key={job._id} job={job} favoriteData={favoriteData || []} />
      ));
  }
};

export default JobList;
