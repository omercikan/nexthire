import JobListingsHeader from "./Header/JobListingsHeader";
import JobFilters from "./JobFilters/JobFilters";
import JobStatCards from "./JobStats/JobStatCards";

const EmployerJobsPanel = () => {
  return (
    <main className="lg:container">
      <JobListingsHeader />
      <JobStatCards />
      <JobFilters />
    </main>
  );
};

export default EmployerJobsPanel;
