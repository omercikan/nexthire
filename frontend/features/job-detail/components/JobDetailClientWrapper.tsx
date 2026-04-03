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
import {
  AppliedData,
  JobContextProvider,
  Resume,
} from "@/features/jobs/context/JobContext";
import { ResumeProvider } from "./applicationModal/modalBody/resume/uploadResume/resumeContext";
import JobDraftActions from "./JobDraftActions";
import { PiWarningCircle } from "react-icons/pi";
import { LuEye } from "react-icons/lu";

const ApplicationStatusModal = dynamic(
  () =>
    import("@/features/job-detail/components/applicationModal/ApplicationStatusModal"),
);

const ExitModal = dynamic(
  () => import("@/features/job-detail/components/ExitModal/ExitModal"),
);

interface JobDetailWrapperProps {
  job: JobData;
  appliedData: AppliedData;
  totalApplicationCount: number;
  resumes: Resume[];
}

const JobDetailWrapper: React.FC<JobDetailWrapperProps> = ({
  job,
  resumes,
  appliedData,
  totalApplicationCount,
}) => {
  return (
    <JobContextProvider
      job={job}
      appliedData={appliedData}
      totalApplicationCount={totalApplicationCount}
      resumes={resumes}
    >
      <main>
        <JobDraftActions
          containerClassName="border-y border-y-[#dedede]"
          wrapperClassName="max-[375px]:flex-col"
          info={
            <div>
              <span className="text-xs flex items-center py-1 px-3 gap-2 text-[#063ad7] bg-[#e8effc] w-max rounded-md font-medium">
                <LuEye />
                Önizleme Modu
              </span>
            </div>
          }
        />

        <Toaster position="top-right" />
        <ResumeProvider>
          <JobIntro />

          <ApplicationModalWrapper />
          <ExitModal />
          <ApplicationStatusModal />
        </ResumeProvider>

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

        <JobDraftActions
          containerClassName="border-t border-t-[#dedede] bottom-0"
          wrapperClassName="max-[600px]:justify-center"
          info={
            <p className="text-[#636363] flex items-center gap-2 text-sm">
              <PiWarningCircle />
              Bu ilan yayınlandıktan sonra 30 gün boyunca aktif kalacaktır.
            </p>
          }
        />
      </main>
    </JobContextProvider>
  );
};

export default JobDetailWrapper;
