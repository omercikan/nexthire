import CandidateQuestionsHeader from "./QuestionsHeader";
import { useDispatch, useSelector } from "react-redux";
import NoneQuestionContent from "./Content/NoneQuestionContent";
import QuestionsContent from "./Content/QuestionsContent";
import {
  selectAllQuestions,
  setManyQuestion,
} from "../slice/candidateQuestionSlice";
import useJobEditMode from "../../hooks/useJobEditMode";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/shared/redux/store";

const CandidateQuestion = () => {
  const screeningQuestions = useSelector(selectAllQuestions);
  const isEditMode = useJobEditMode();
  const dispatch = useDispatch<AppDispatch>();
  const { editedJobData } = useSelector(
    (state: RootState) => state.jobDataSlice,
  );

  useEffect(() => {
    if (isEditMode) {
      const editedJobDataScreeningQuestions = editedJobData?.screeningQuestions;

      if (editedJobDataScreeningQuestions?.length) {
        dispatch(setManyQuestion(editedJobDataScreeningQuestions));
      }
    }
  }, [dispatch, editedJobData?.screeningQuestions, isEditMode]);

  return (
    <section className="mt-6 p-6 rounded-[25px] bg-white">
      <CandidateQuestionsHeader questionCount={screeningQuestions.length} />

      {!screeningQuestions.length ? (
        <NoneQuestionContent />
      ) : (
        <QuestionsContent />
      )}
    </section>
  );
};

export default CandidateQuestion;
