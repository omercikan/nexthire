import { cn } from "@/shared/libs/utils";
import JobIListItem from "./JobListItem";
import NoneJobContent from "./NoneJobContent";
import { useEmployerJobsData } from "../hooks/useEmployerJobsData";
import JobListPagination from "./JobListPagination";
import JobCardSkeleton from "./JobCardSkeleton";

const JobList = () => {
  const { isLoading, jobs, totalPages, page } = useEmployerJobsData();

  return (
    <div className="mt-6">
      <div>
        <p className="text-muted-foreground text-sm">
          {jobs.length} sonuç gösteriliyor
        </p>
      </div>

      {isLoading ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div
            className={cn(
              "mt-4 grid gap-4",
              jobs.length ? "md:grid-cols-2" : "grid-cols-1",
            )}
          >
            {jobs.length ? (
              jobs.map((job) => <JobIListItem key={job._id} job={job} />)
            ) : (
              <NoneJobContent />
            )}
          </div>

          {!!jobs.length && (
            <JobListPagination totalPages={totalPages} currentPage={page} />
          )}
        </>
      )}
    </div>
  );
};

export default JobList;
