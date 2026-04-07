import { useJob } from "@/features/jobs/context/JobContext";
import { setApplicationData } from "@/shared/redux/slices/applicationModal/modalData";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

type QuestionAnswers = Record<string, string>;

const useQuestionsForm = () => {
  const {
    job: { screeningQuestions },
  } = useJob();
  const dispatch = useDispatch<AppDispatch>();
  const { screeningQuestions: savedAnswers } = useSelector(
    (state: RootState) => state.applicationModalData.applicationData,
  );

  // Convert saved answers array to react-hook-form compatible defaultValues object
  const defaultValues = savedAnswers?.reduce<QuestionAnswers>(
    (acc, { question, answer }) => ({ ...acc, [question]: answer }),
    {},
  );

  const methods = useForm<QuestionAnswers>({
    mode: "onChange",
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  // Total number of questions marked as required
  const requiredQuestionsCount = screeningQuestions?.filter(
    (item) => item.required === true,
  ).length;

  // Required questions that have been answered by the user
  const answeredRequiredQuestions = screeningQuestions?.filter(
    (item) => item.required && watch(item.question),
  );

  // Returns true if the form has any validation errors
  const hasErrors = Object.keys(errors).length > 0;

  // Returns true when all required questions have been answered
  const areRequiredFieldsFilled =
    requiredQuestionsCount === answeredRequiredQuestions?.length;

  useEffect(() => {
    // Subscribes to form value changes and syncs answers to the Redux store
    const subscription = methods.watch((formValues) => {
      const answers = Object.entries(formValues).map(([key, value]) => ({
        question: key,
        answer: value as string,
      }));

      if (answers.length) {
        dispatch(
          setApplicationData({
            screeningQuestions: answers,
          }),
        );
      }
    });

    // Unsubscribes on unmount to prevent memory leaks
    return () => subscription.unsubscribe();
  }, [methods, dispatch]);

  return {
    screeningQuestions,
    methods,
    errors,
    hasErrors,
    areRequiredFieldsFilled,
    handleSubmit,
  };
};

export default useQuestionsForm;
