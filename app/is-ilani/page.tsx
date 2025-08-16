"use client";

import JobIntro from "@/components/pages/jobDetail/jobIntro/JobIntro";
import { Timestamp } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import { useGetJobDetailQuery } from "@/lib/redux/services/jobDetail";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { JobPostingAdditionalQuestions } from "@/types/auth/employer/open-jobs.types";
import {
  resetApplicationData,
  setAdditionalQuestionsFromJob,
} from "@/lib/redux/features/applicationModal/modalData";
import { setApplicationModal } from "@/lib/redux/features/touch";
import { setJobDetail } from "@/lib/redux/features/jobDetail";
import dynamic from "next/dynamic";
import JobAbout from "@/components/pages/jobDetail/JobAbout/JobAbout";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";

const ApplicationStatusModal = dynamic(
  () =>
    import(
      "@/components/pages/jobDetail/applicationModal/ApplicationStatusModal"
    ),
  { ssr: false }
);

const ApplicationModal = dynamic(
  () =>
    import("@/components/pages/jobDetail/applicationModal/ApplicationModal"),
  { ssr: false }
);

const ExitModal = dynamic(
  () => import("@/components/pages/jobDetail/ExitModal/ExitModal"),
  { ssr: false }
);

const JobOverview = dynamic(
  () => import("@/components/pages/jobDetail/JobAbout/JobSidebar/JobOverview"),
  { ssr: false }
);

const JobDetail = () => {
  const params = useSearchParams();
  const { data, isLoading } = useGetJobDetailQuery({
    postID: atob(params.get("jpi") ?? ""),
    companyID: atob(params.get("jci") ?? ""),
  });
  const { openApplicationModal, isExitModal } = useSelector(
    (state: RootState) => state.touch
  );
  const { status, postId } = useSelector(
    (state: RootState) => state.applicationModalData.applicationStatus
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const additionalQuestionsFromJob = data?.job.additionalQuestions;

    if (additionalQuestionsFromJob) {
      dispatch(setAdditionalQuestionsFromJob(additionalQuestionsFromJob));
    }
  }, [data?.job.additionalQuestions, dispatch]);

  useEffect(() => {
    if (data?.job) {
      const {
        location,
        companyLogo,
        jobTitle,
        companyName,
        postId,
        companyId,
      } = data?.job;

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
  }, [data?.job, dispatch]);

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
          applicationDeadlineDate: data?.job?.applicationDeadlineDate ?? "",
          category: data?.job.category ?? "",
          companyLogo: data?.job.companyLogo ?? "",
          companyName: data?.job.companyName ?? "",
          jobTitle: data?.job.jobTitle ?? "",
          location: data?.job.location ?? "",
          modeOfWork: data?.job.modeOfWork ?? "",
          positionLevel: data?.job.positionLevel ?? "",
          serviceArea: data?.job.serviceArea ?? "",
          datePosted: data?.job.datePosted as Timestamp,
          numberOfEmployees: data?.job.numberOfEmployees ?? "",
          postId: data?.job.postId ?? "",
        }}
        isLoading={isLoading}
      />

      {openApplicationModal && (
        <ApplicationModal
          companyName={data?.job?.companyName ?? ""}
          jobTitle={data?.job.jobTitle ?? ""}
          additionalQuestions={
            data?.job?.additionalQuestions as JobPostingAdditionalQuestions
          }
        />
      )}

      {isExitModal && <ExitModal />}

      {(status !== "" || data?.job.postId === postId) && (
        <ApplicationStatusModal />
      )}

      <div className="container flex max-lg:flex-col gap-[25px] justify-between py-[50px]">
        <JobAbout
          about={{
            description: data?.job.jobAbout as string,
            requirements: data?.job.requirements as string[],
            responsibilities: data?.job.responsibilities as string[],
          }}
        />

        {data?.job ? (
          <JobOverview
            overviewData={{
              postedDate: data?.job.datePosted as Timestamp,
              applicationDeadline: data?.job.applicationDeadlineDate as string,
              careerLevel: data?.job.positionLevel as string,
              educationLevel: data?.job.educationLevel as string[],
              experience: data?.job.experienceTime as string,
              location: data?.job.location as string,
              gender: data.job.gender as string,
              salary: data.job.salary as string,
            }}
          />
        ) : (
          <LoaderSkeleton
            length={1}
            variant="rounded"
            animationType="pulse"
            className="lg:!h-[613px] flex-[32.3%] max-lg:flex-none max-lg:!h-[728px] !rounded-lg"
          />
        )}
      </div>
    </main>
  );
};

export default JobDetail;
