"use client";

import { JobData } from "@/shared/types/jobDetail";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import JobIntro from "./jobIntro/JobIntro";
import JobAbout from "./JobAbout/JobAbout";
import JobOverview from "./JobAbout/JobSidebar/JobOverview";
import JobSkills from "./JobAbout/JobSkills/JobSkills";
import JobMapWrapper from "./JobAbout/JobMap/JobMapWrapper";
import CompanyCard from "./JobAbout/CompanyInfoCard/CompanyCard";
import ApplicationModalWrapper from "./applicationModal/ApplicationModalWrapper";
import { JobContextProvider } from "@/features/jobs/context/JobContext";

const ApplicationStatusModal = dynamic(
  () =>
    import("@/features/job-detail/components/applicationModal/ApplicationStatusModal"),
);

const ExitModal = dynamic(
  () => import("@/features/job-detail/components/ExitModal/ExitModal"),
);

const JobDetailWrapper = ({ job }: { job: JobData }) => {
  return (
    <JobContextProvider job={job}>
      <main>
        <Toaster position="top-right" />
        <JobIntro />
        <ApplicationModalWrapper />
        <ExitModal />
        <ApplicationStatusModal />

        <div className="container flex max-lg:flex-col gap-6.25 justify-between py-12.5">
          <div className="flex-[67.7%]">
            <JobAbout />
            <JobMapWrapper />
          </div>

          <div className="flex-[32.3%] max-lg:flex-none">
            <JobOverview />
            {job && (
              <>
                <JobSkills />
                <CompanyCard />
              </>
            )}
          </div>
        </div>
      </main>
    </JobContextProvider>
  );
};

export default JobDetailWrapper;
