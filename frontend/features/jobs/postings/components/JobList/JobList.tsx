import useJobActions from "./useJobActions";
import LoaderSkeleton from "@/shared/components/ui/LoaderSkeleton";
import JobItem from "../JobItem";

const JobList = () => {
  const { data, isFetching, filterData } = useJobActions();

  switch (true) {
    case isFetching:
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
          length={
            (filterData.countJobs
              ? filterData.countJobs
              : data?.currentCounts) ?? 4
          }
        />
      );
    case !filterData.countJobs && filterData.isFilter:
      return (
        <div className="bg-[#D4E1F5] text-[#1967D2] p-[15px] mb-[30px] rounded-lg">
          <p>Aramana uygun bir sonuç bulunamadı. 😔</p>
        </div>
      );
    default:
      return data?.jobs.map((job) => <JobItem key={job._id} job={job} />);
  }
};

export default JobList;
