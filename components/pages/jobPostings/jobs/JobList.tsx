import { useGetJobPostingsQuery } from "@/lib/redux/services/jobPostings";
import { EmployerOpenJobs } from "@/types";
import React, { useEffect, useState } from "react";
import JobItem from "./JobItem";
import { useSearchParams } from "next/navigation";
import { JobCompanyInformations } from "@/types/filtersJob";
import { routeParser } from "@/lib/routeFormat";
import { normalize } from "path";

const JobList = () => {
  const { data, isLoading } = useGetJobPostingsQuery(undefined);
  const params = useSearchParams();
  const jobParam = routeParser(String(params.get("meslek")));
  const locationParam = routeParser(String(params.get("konum")));
  const [searchedData, setSearchedData] = useState<
    (JobCompanyInformations & EmployerOpenJobs)[]
  >([]);

  useEffect(() => {
    const searchedData: (JobCompanyInformations & EmployerOpenJobs)[] =
      data?.jobPostings.filter((job: EmployerOpenJobs) => {
        if (jobParam !== "Null" && locationParam === "Null") {
          return (
            job.jobTitle.toLowerCase().includes(jobParam.toLowerCase()) ||
            job.category.toLowerCase().includes(jobParam.toLowerCase())
          );
        }

        if (locationParam !== "Null" && jobParam === "Null") {
          return normalize(job.location)
            .toLocaleLowerCase("tr")
            .includes(normalize(locationParam.toLowerCase()));
        }

        if (jobParam !== "Null" && locationParam !== "Null") {
          return (
            (job.jobTitle.toLowerCase().includes(jobParam.toLowerCase()) ||
              job.category.toLowerCase().includes(jobParam.toLowerCase())) &&
            normalize(job.location)
              .toLocaleLowerCase("tr")
              .includes(normalize(locationParam.toLowerCase()))
          );
        }

        return true;
      });

    if (searchedData?.length > 0) {
      setSearchedData(searchedData);
    } else {
      setSearchedData([]);
    }
  }, [data?.jobPostings, jobParam, locationParam]);

  return (
    <>
      <div className="flex-[calc(67.2%+.0625rem)]">
        {isLoading ? (
          "Loading"
        ) : searchedData?.length ? (
          searchedData?.map((job) => <JobItem key={job.postId} job={job} />)
        ) : (
          <div className="bg-[#D4E1F5] text-[#1967D2] p-[15px] rounded-lg">
            <p>Aramana uygun bir sonuç bulunamadı. 😔</p>
          </div>
        )}
      </div>
    </>
  );
};

export default JobList;
