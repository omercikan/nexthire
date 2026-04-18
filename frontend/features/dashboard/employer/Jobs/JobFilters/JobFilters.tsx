import JobFilterSelect from "./JobFilterSelect";
import JobSearchInput from "./JobSearchInput";

const JobFilters = () => {
  return (
    <div className="mt-8 sm:flex items-center gap-3">
      <JobSearchInput />
      <JobFilterSelect />
    </div>
  );
};

export default JobFilters;
