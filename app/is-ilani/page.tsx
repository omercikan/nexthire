"use client";

import JobIntro from "@/components/pages/jobDetail/jobIntro/JobIntro";
import { Timestamp } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import { useGetJobDetailQuery } from "@/lib/redux/services/jobDetail";
import { useSearchParams } from "next/navigation";
import React from "react";
import ApplicationModal from "@/components/pages/jobDetail/applicationModal/ApplicationModal";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { JobPostingAdditionalQuestions } from "@/types";

const JobDetail = () => {
  const params = useSearchParams();
  const { data, isLoading } = useGetJobDetailQuery({
    postID: atob(params.get("jpi") ?? ""),
    companyID: atob(params.get("jci") ?? ""),
  });
  const { openApplicationModal } = useSelector(
    (state: RootState) => state.touch
  );

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
    </main>
  );
};

export default JobDetail;
