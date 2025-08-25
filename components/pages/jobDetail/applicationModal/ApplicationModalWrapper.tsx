"use client";

import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { JobPostingAdditionalQuestions } from "@/types/auth/employer/open-jobs.types";
import dynamic from "next/dynamic";
import { setAdditionalQuestionsFromJob } from "@/lib/redux/features/applicationModal/modalData";

const ApplicationModal = dynamic(() => import("./ApplicationModal"), {
  ssr: false,
});

const ApplicationModalWrapper = ({
  companyName,
  jobTitle,
  additionalQuestions,
}: {
  companyName: string;
  jobTitle: string;
  additionalQuestions: JobPostingAdditionalQuestions;
}) => {
  const isOpenModal = useSelector(
    (state: RootState) => state.touch.openApplicationModal
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const additionalQuestionsFromJob = additionalQuestions;

    if (isOpenModal && additionalQuestionsFromJob) {
      dispatch(setAdditionalQuestionsFromJob(additionalQuestionsFromJob));
    }
  }, [additionalQuestions, isOpenModal, dispatch]);

  return (
    <>
      {isOpenModal && (
        <ApplicationModal
          companyName={companyName ?? ""}
          jobTitle={jobTitle ?? ""}
          additionalQuestions={
            additionalQuestions as JobPostingAdditionalQuestions
          }
        />
      )}
    </>
  );
};

export default ApplicationModalWrapper;
