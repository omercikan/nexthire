"use client";

import { AppDispatch } from "@/shared/redux/store";
import { JobData } from "@/shared/types/jobDetail";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setJobDetail } from "../slices/jobDetailSlice";
import { setApplicationModal } from "@/shared/redux/slices/touch";
import { resetApplicationData } from "@/shared/redux/slices/applicationModal/modalData";
import JobIntro from "./jobIntro/JobIntro";
import ApplicationModalWrapper from "./applicationModal/ApplicationModalWrapper";
import JobAbout from "./JobAbout/JobAbout";
import JobOverview from "./JobAbout/JobSidebar/JobOverview";
import LoaderSkeleton from "@/shared/components/ui/LoaderSkeleton";
import JobSkills from "./JobAbout/JobSkills/JobSkills";
import JobMapWrapper from "./JobAbout/JobMap/JobMapWrapper";
import CompanyCard from "./JobAbout/CompanyInfoCard/CompanyCard";

const ApplicationStatusModal = dynamic(
  () =>
    import(
      "@/features/job-detail/components/applicationModal/ApplicationStatusModal"
    )
);

const ExitModal = dynamic(
  () => import("@/features/job-detail/components/ExitModal/ExitModal")
);

const JobDetailWrapper = ({ job }: { job: JobData }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    additionalQuestions,
    applicationDeadlineDate,
    category,
    companyId,
    companyLocation,
    companyLogo,
    companyName,
    datePosted,
    educationLevel,
    email,
    experienceTime,
    foundedData,
    gender,
    jobAbout,
    jobTitle,
    location,
    modeOfWork,
    numberOfEmployees,
    phoneNumber,
    positionLevel,
    postId,
    requirements,
    responsibilities,
    salary,
    serviceArea,
    socials,
    websiteUrl,
  } = job;

  useEffect(() => {
    if (job) {
      dispatch(
        setJobDetail({
          jobDetail: {
            companyLocation: location,
            companyId: companyId,
            companyLogo,
            jobTitle,
            companyName,
            postId,
          },
        })
      );
    }
  }, [
    dispatch,
    companyId,
    companyLogo,
    jobTitle,
    companyName,
    postId,
    location,
    job,
  ]);

  useEffect(() => {
    return () => {
      dispatch(setApplicationModal(false));
      dispatch(resetApplicationData());
    };
  }, [dispatch]);

  return (
    <main>
      <Toaster position="top-right" />

      <JobIntro
        data={{
          applicationDeadlineDate: applicationDeadlineDate,
          category: category,
          companyLogo: companyLogo,
          companyName: companyName,
          jobTitle: jobTitle,
          location: location,
          modeOfWork: modeOfWork,
          positionLevel: positionLevel,
          serviceArea: serviceArea,
          datePosted: datePosted,
          numberOfEmployees: numberOfEmployees,
          postId: postId,
        }}
        isLoading={false}
      />

      <ApplicationModalWrapper
        companyName={companyName}
        jobTitle={jobTitle}
        additionalQuestions={additionalQuestions}
      />

      <ExitModal />

      <ApplicationStatusModal />

      <div className="container flex max-lg:flex-col gap-[25px] justify-between py-[50px]">
        <JobAbout
          about={{
            description: jobAbout,
            requirements: requirements,
            responsibilities: responsibilities,
          }}
          jobTitle={jobTitle}
        />

        <div className="flex-[32.3%] max-lg:flex-none">
          {job ? (
            <JobOverview
              overviewData={{
                postedDate: datePosted,
                applicationDeadline: applicationDeadlineDate,
                careerLevel: positionLevel,
                educationLevel: educationLevel,
                experience: experienceTime,
                location: location,
                gender: gender,
                salary: salary,
              }}
            />
          ) : (
            <LoaderSkeleton
              length={1}
              variant="rounded"
              animationType="pulse"
              className="lg:!h-[613px] max-lg:!h-[728px] !rounded-lg mb-[30px]"
            />
          )}

          <JobMapWrapper city={location} companyLogo={companyLogo} />

          {job && (
            <JobSkills
              skills={[category, positionLevel, modeOfWork, experienceTime]}
            />
          )}

          {job && (
            <CompanyCard
              companyInformations={{
                companyId: companyId,
                category: category ?? "Belirtilmemiş",
                companyLogo: companyLogo ?? "",
                companyName: companyName ?? "Belirtilmemiş",
                email: email ?? "Belirtilmemiş",
                foundedDate: foundedData ?? "Belirtilmemiş",
                location: companyLocation ?? "Belirtilmemiş",
                phoneNumber: phoneNumber ?? "Belirtilmemiş",
                websiteUrl: websiteUrl,
                socials: socials,
              }}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default JobDetailWrapper;
