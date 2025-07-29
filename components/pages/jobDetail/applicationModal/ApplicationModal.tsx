import React, { useEffect } from "react";
import ModalHeader from "./modalUI/ModalHeader";
import ModalProgressBar from "./modalControls/ModalProgressBar";
import ModalBody from "./modalBody/ModalBody";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  setIsAdditionalQuestions,
  setProgressBarValue,
} from "@/lib/redux/features/applicationModal/progressBar";
import { setApplicationModal } from "@/lib/redux/features/touch";
import { JobPostingAdditionalQuestions } from "@/types/auth/employer/open-jobs.types";

const ApplicationModal = ({
  companyName,
  jobTitle,
  additionalQuestions,
}: {
  companyName: string;
  jobTitle: string;
  additionalQuestions: JobPostingAdditionalQuestions;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const modalStep = useSelector(
    (state: RootState) => state.applicationModalProgressBar.modalStep
  );

  const handleCloseModal = () => {
    dispatch(setApplicationModal(false));
    document.body.style.overflow = "visible";
  };

  useEffect(() => {
    dispatch(
      setProgressBarValue({
        barWidthValue: 0,
        barWidth: !Boolean(additionalQuestions) ? 100 / 2 : 100 / 3,
      })
    );
    dispatch(setIsAdditionalQuestions(Boolean(additionalQuestions)));
  }, [additionalQuestions, dispatch]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-50 bg-black/25"
      onClick={handleCloseModal}
    >
      <div
        className="bg-white fixed left-1/2 top-[2rem] -translate-x-1/2 rounded-lg w-[46.5rem] max-md:w-[95%]"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader companyName={companyName} jobTitle={jobTitle} />

        <div
          className={
            modalStep === 4
              ? "h-[500px] overflow-auto"
              : "max-sm:h-[500px] max-sm:overflow-auto"
          }
        >
          <ModalProgressBar />
          <ModalBody />
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
