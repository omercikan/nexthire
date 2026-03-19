"use client";

import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { setAdditionalQuestionsFromJob } from "@/shared/redux/slices/applicationModal/modalData";
import { JobScreeningQuestions } from "@/shared/types/jobDetail";

const ApplicationModal = dynamic(() => import("./ApplicationModal"), {
  ssr: false,
});

const ApplicationModalWrapper = ({
  companyName,
  jobTitle,
  screeningQuestions,
}: {
  companyName: string;
  jobTitle: string;
  screeningQuestions: JobScreeningQuestions;
}) => {
  const isOpenModal = useSelector(
    (state: RootState) => state.touch.openApplicationModal,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const additionalQuestionsFromJob = screeningQuestions;

    if (isOpenModal && additionalQuestionsFromJob) {
      dispatch(setAdditionalQuestionsFromJob(additionalQuestionsFromJob));
    }
  }, [screeningQuestions, isOpenModal, dispatch]);

  return (
    <>
      {isOpenModal && (
        <ApplicationModal
          companyName={companyName ?? ""}
          jobTitle={jobTitle ?? ""}
          additionalQuestions={
            screeningQuestions as JobScreeningQuestions
          }
        />
      )}
    </>
  );
};

export default ApplicationModalWrapper;
