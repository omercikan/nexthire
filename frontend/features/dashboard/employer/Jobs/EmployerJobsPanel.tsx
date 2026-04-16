import JobListingsHeader from "./Header/JobListingsHeader";
import JobStatCards from "./JobStats/JobStatCards";

const EmployerJobsPanel = () => {
  return (
    <main className="container">
      <JobListingsHeader />
      <JobStatCards />
    </main>
  );
};

export default EmployerJobsPanel;
