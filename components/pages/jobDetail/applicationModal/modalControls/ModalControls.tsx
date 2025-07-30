import CustomButton from "@/components/ui/CustomButton";
import { setResumeErrorMessage } from "@/lib/redux/features/applicationModal/modalData";
import {
  setIsEdit,
  setModalStep,
  setProgressBarValue,
} from "@/lib/redux/features/applicationModal/progressBar";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalControls = ({
  isErrors,
  formValues,
  extraControl = { message: "", state: true },
}: {
  isErrors: string[];
  formValues: unknown;
  extraControl?: {
    state: boolean | undefined;
    message: string;
  };
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { progressBar, modalStep, isAdditionalQuestions, isEdit } = useSelector(
    (state: RootState) => state.applicationModalProgressBar
  );
  const { barWidth, barWidthValue } = progressBar;
  const isFormValid =
    !isErrors.length && !Object.values(formValues as object).includes("");

  const prevStep = () => {
    dispatch(setResumeErrorMessage(""));

    if (modalStep > 1) {
      dispatch(setModalStep(modalStep - 1));
    }

    if (barWidthValue > 0) {
      dispatch(
        setProgressBarValue({
          ...progressBar,
          barWidthValue: barWidthValue - barWidth,
        })
      );
    }

    if (!isAdditionalQuestions && modalStep == 4) {
      dispatch(setModalStep(2));
    }
  };

  const nextStep = () => {
    dispatch(setResumeErrorMessage(""));

    if (isEdit && isFormValid) {
      dispatch(setIsEdit(false));
      dispatch(setModalStep(4));
      return;
    }

    if (!extraControl?.state) {
      return dispatch(setResumeErrorMessage(extraControl?.message as string));
    }

    if (isFormValid) {
      if (modalStep < 4) {
        dispatch(setModalStep(modalStep + 1));
      }

      if (barWidthValue !== 100) {
        dispatch(
          setProgressBarValue({
            ...progressBar,
            barWidthValue: barWidthValue + barWidth,
          })
        );
      }

      if (!isAdditionalQuestions && modalStep == 2) {
        dispatch(setModalStep(4));
      }
    }
  };

  return (
    <div className="py-4 px-6 flex justify-end gap-2">
      {modalStep > 1 && !isEdit && (
        <CustomButton
          text="Geri"
          className="hover:!bg-[#EBF4FD] !bg-transparent !text-[#4045ef] font-semibold !py-1.5 !px-2 !rounded-sm"
          handleClick={prevStep}
          isSubmitting={false}
        />
      )}

      {modalStep !== 4 ? (
        <CustomButton
          text={
            (modalStep === 2 && !isAdditionalQuestions) ||
            modalStep === 3 ||
            isEdit
              ? "İncele"
              : "İleri"
          }
          isSubmitting={false}
          className="!py-1.5 !px-4 font-semibold"
          handleClick={nextStep}
        />
      ) : (
        <CustomButton
          isSubmitting={false}
          text="Başvuruyu gönder"
          className="!py-1.5 !px-4 font-semibold"
        />
      )}
    </div>
  );
};

export default ModalControls;
