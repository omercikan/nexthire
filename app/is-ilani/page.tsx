"use client";

import JobIntro from "@/components/pages/jobDetail/jobIntro/JobIntro";
import { Timestamp } from "firebase/firestore";
import { Toaster } from "react-hot-toast";
import { useGetJobDetailQuery } from "@/lib/redux/services/jobDetail";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import ApplicationModal from "@/components/pages/jobDetail/applicationModal/ApplicationModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { JobPostingAdditionalQuestions } from "@/types/auth/employer/open-jobs.types";
import {
  setAdditionalQuestionsFromJob,
  setApplicationData,
} from "@/lib/redux/features/applicationModal/modalData";
import { setApplicationModal } from "@/lib/redux/features/touch";

const JobDetail = () => {
  const params = useSearchParams();
  const { data, isLoading } = useGetJobDetailQuery({
    postID: atob(params.get("jpi") ?? ""),
    companyID: atob(params.get("jci") ?? ""),
  });
  const { openApplicationModal } = useSelector(
    (state: RootState) => state.touch
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const additionalQuestionsFromJob = data?.job.additionalQuestions;

    if (additionalQuestionsFromJob) {
      dispatch(setAdditionalQuestionsFromJob(additionalQuestionsFromJob));
    }
  }, [data?.job.additionalQuestions, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setApplicationModal(false));
      dispatch(
        setApplicationData({
          additionalQuestions: [],
          email: "",
          phone: "",
          resume: "",
        })
      );
      dispatch(setAdditionalQuestionsFromJob({}));
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
    </main>
  );
};

export default JobDetail;
