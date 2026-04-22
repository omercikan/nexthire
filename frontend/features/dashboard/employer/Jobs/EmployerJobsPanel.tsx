import { useSearchParams } from "next/navigation";
import JobListingsHeader from "./Header/JobListingsHeader";
import JobApplicationsDrawer from "./JobApplicationsDrawer/JobApplicationsDrawer";
import JobFilters from "./JobFilters/JobFilters";
import JobList from "./JobList/JobList";
import JobStatCards from "./JobStats/JobStatCards";

const EmployerJobsPanel = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  return (
    <main className="lg:container">
      <JobListingsHeader />
      <JobStatCards />
      <JobFilters />
      <JobList />

      <JobApplicationsDrawer open={!!jobId} jobId={jobId ?? ""} />
    </main>
  );
};

export default EmployerJobsPanel;
