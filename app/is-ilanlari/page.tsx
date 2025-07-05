"use client";

import React, { useEffect } from "react";
import SearchJob from "@/components/SearchJob";
import FilterMenu from "@/components/pages/jobPostings/filterMenu/FilterMenu";
import toast, { Toaster } from "react-hot-toast";
import JobList from "@/components/pages/jobPostings/jobs/JobList";
import FilterMenuMobile from "@/components/pages/jobPostings/filterMenu/FilterMenuMobile";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

const JobAdverts = () => {
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);

  useEffect(() => toast.dismiss(), []);

  return (
    <main className="mt-[79.4304px] max-sm:mt-[40px]">
      <Toaster position="top-right" />

      <section
        className={`py-[85px] max-sm:py-[40px] ${
          filtersItem?.length ? "max-sm:mt-[196.5px]" : ""
        }  bg-[#F4F5FA]`}
      >
        <SearchJob
          formClass="!rounded-lg !w-[80.625rem] max-[86.25rem]:!w-[95%] drop-shadow-xl"
          jobInputPlaceholder="Meslek ara"
          buttonClass="!bg-[#4045ef] hover:!bg-transparent hover:!text-[#4045ef] !border-[#4045ef] !rounded-lg"
        />
      </section>

      <section className="container max-xl:px-0 max-[1080px]:!px-8 flex gap-[1.875rem] my-[50px] max-sm:my-[25px]">
        <FilterMenu />
        <FilterMenuMobile />

        <JobList />
      </section>
    </main>
  );
};

export default JobAdverts;
