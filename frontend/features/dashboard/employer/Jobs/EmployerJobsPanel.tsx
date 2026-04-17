import JobListingsHeader from "./Header/JobListingsHeader";
import JobStatCards from "./JobStats/JobStatCards";

const EmployerJobsPanel = () => {
  return (
    <main className="lg:container">
      <JobListingsHeader />
      <JobStatCards />
    </main>
  );
};

export default EmployerJobsPanel;
