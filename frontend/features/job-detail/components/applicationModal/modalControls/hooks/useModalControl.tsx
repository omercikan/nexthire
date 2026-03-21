import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { updateStep } from "../../slices/modalControlSlice";
import { useJob } from "@/features/jobs/context/JobContext";

const useModalControl = (isValid: boolean) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    modalControlSlice: { step },
    applicationModalData: { applicationData },
  } = useSelector((state: RootState) => state);
  const job = useJob();
  const hasScreeningQuestions = job.screeningQuestions ? true : false;

  const nextStep = () => {
    if (!isValid) return;

    if (step === 4) return;

    if (hasScreeningQuestions && step === 2) return dispatch(updateStep(4));

    dispatch(updateStep(step + 1));
  };

  const prevStep = () => {
    if (step === 1) return;

    if (hasScreeningQuestions && step === 4) return dispatch(updateStep(2));

    dispatch(updateStep(step - 1));
  };

  return { step, applicationData, hasScreeningQuestions, nextStep, prevStep };
};

export default useModalControl;
