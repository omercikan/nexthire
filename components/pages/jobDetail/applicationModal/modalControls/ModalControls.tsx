import CustomButton from "@/components/ui/CustomButton";
import {
  setModalStep,
  setProgressBarValue,
} from "@/lib/redux/features/applicationModal/progressBar";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ModalControls = ({
  isErrors,
  formValues,
}: {
  isErrors: string[];
  formValues: unknown;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { progressBar, modalStep, isAdditionalQuestions } = useSelector(
    (state: RootState) => state.applicationModalProgressBar
  );
  const { barWidth, barWidthValue } = progressBar;

  const prevStep = () => {
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
    if (!isErrors.length && !Object.values(formValues as object).includes("")) {
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
      {modalStep > 1 && (
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
            (modalStep === 2 && !isAdditionalQuestions) || modalStep === 3
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
