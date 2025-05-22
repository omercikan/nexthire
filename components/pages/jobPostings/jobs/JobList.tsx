import { useGetJobPostingsQuery } from "@/lib/redux/services/jobPostings";
import { EmployerOpenJobs } from "@/types";
import React from "react";
import JobItem from "./JobItem";
import { JobCompanyInformations } from "@/types/filtersJob";

const JobList = () => {
  const { data } = useGetJobPostingsQuery<{
    data: {
      jobPostings: (JobCompanyInformations & EmployerOpenJobs)[];
      countJobs: number;
    };
  }>(undefined);

  return (
    <div className="flex-[calc(67.2%+.0625rem)]">
      {data?.jobPostings.map((job) => (
        <JobItem key={job.postId} job={job} />
      ))}
    </div>
  );
};

export default JobList;
