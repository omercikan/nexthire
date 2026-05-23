import { useSearchParams } from "next/navigation";
import JobListingsHeader from "./Header/JobListingsHeader";
import JobApplicationsDrawer from "./JobApplicationsDrawer/JobApplicationsDrawer";
import JobFilters from "./JobFilters/JobFilters";
import JobList from "./JobList/JobList";
import JobStatCards from "./JobStats/JobStatCards";
import DeleteJobModal from "./Modal/DeleteJobModal";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { AnimatePresence } from "framer-motion";

const EmployerJobsPanel = () => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const applicationId = searchParams.get("applicationId");
  const { open } = useSelector(
    (state: RootState) => state.jobListMenu.deleteModal,
  );

  return (
    <main className="lg:container">
      <JobListingsHeader />
      <JobStatCards />
      <JobFilters />
      <JobList />

      <JobApplicationsDrawer
        open={!!jobId}
        jobId={jobId ?? ""}
        currentMenuAction={searchParams.get("action") ?? ""}
        applicationId={applicationId ?? ""}
      />

      <AnimatePresence>
        {open && <DeleteJobModal key="delete-modal" />}
      </AnimatePresence>
    </main>
  );
};

export default EmployerJobsPanel;
