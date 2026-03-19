"use client";

import { JobData } from "@/shared/types/jobDetail";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import JobIntro from "./jobIntro/JobIntro";
import JobAbout from "./JobAbout/JobAbout";
import JobOverview from "./JobAbout/JobSidebar/JobOverview";
import LoaderSkeleton from "@/shared/components/ui/LoaderSkeleton";
import JobSkills from "./JobAbout/JobSkills/JobSkills";
import JobMapWrapper from "./JobAbout/JobMap/JobMapWrapper";
import CompanyCard from "./JobAbout/CompanyInfoCard/CompanyCard";
import dayjs from "dayjs";
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

        <JobIntro
          applicationMethod={job.applicationMethod}
          applicationAddress={job.applicationAddress}
          applicationDeadlineDate={dayjs(job.createdAt).add(1, "month")}
          category={job.category}
          companyLogo={job.employer.profilePhoto}
          companyName={job.employer.companyName}
          jobTitle={job.jobTitle}
          location={job.employer.city}
          modeOfWork={job.workType}
          positionLevel={job.careerLevel}
          serviceArea={job.employer.categories}
          datePosted={job.createdAt}
          numberOfEmployees={job.employer.companySize}
          postId={job._id}
        />

        <ApplicationModalWrapper
          companyName={job.employer.companyName}
          jobTitle={job.jobTitle}
          screeningQuestions={job.screeningQuestions}
        />

        <ExitModal />

        <ApplicationStatusModal />

        <div className="container flex max-lg:flex-col gap-6.25 justify-between py-12.5">
          <div className="flex-[67.7%]">
            <JobAbout about={job.jobDescription} jobTitle={job.jobTitle} />

            <JobMapWrapper
              city={job.employer.city}
              companyLogo={job.employer.profilePhoto}
            />
          </div>

          <div className="flex-[32.3%] max-lg:flex-none">
            {job ? (
              <JobOverview
                overviewData={{
                  postedDate: job.createdAt,
                  applicationDeadline: dayjs(job.createdAt).add(1, "month"),
                  careerLevel: job.careerLevel,
                  educationLevel: [job.educationLevel],
                  experience: job.experience,
                  location: job.location,
                  gender: job.gender,
                  salary: job.salaryPeriod,
                }}
              />
            ) : (
              <LoaderSkeleton
                length={1}
                variant="rounded"
                animationType="pulse"
                className="lg:h-153.25! max-lg:h-182! rounded-lg! mb-7.5"
              />
            )}

            {job && (
              <JobSkills
                skills={[
                  job.category,
                  job.careerLevel,
                  job.workType,
                  job.experience,
                ]}
              />
            )}

            {job && (
              <CompanyCard
                companyInformations={{
                  companyId: job.employer._id,
                  category: job.category ?? "Belirtilmemiş",
                  companyLogo: job.employer.profilePhoto ?? "",
                  companyName: job.employer.companyName ?? "Belirtilmemiş",
                  email: job.employer.email ?? "Belirtilmemiş",
                  foundedDate: job.employer.foundedDate,
                  location: job.employer.city ?? "Belirtilmemiş",
                  phoneNumber: job.employer.phoneNumber ?? "Belirtilmemiş",
                  websiteUrl: job.employer.website,
                  socials: job.employer.socialPlatforms,
                }}
              />
            )}
          </div>
        </div>
      </main>
    </JobContextProvider>
  );
};

export default JobDetailWrapper;
