import JobListingsHeader from "./Header/JobListingsHeader";
import JobFilters from "./JobFilters/JobFilters";
import JobList from "./JobList/JobList";
import JobStatCards from "./JobStats/JobStatCards";

const EmployerJobsPanel = () => {
  return (
    <main className="lg:container">
      <JobListingsHeader />
      <JobStatCards />
      <JobFilters />
      <JobList />
    </main>
  );
};

export default EmployerJobsPanel;
