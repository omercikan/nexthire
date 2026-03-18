import CandidateQuestionsHeader from "./QuestionsHeader";
import { useSelector } from "react-redux";
import NoneQuestionContent from "./Content/NoneQuestionContent";
import QuestionsContent from "./Content/QuestionsContent";
import { selectAllQuestions } from "../slice/candidateQuestionSlice";

const CandidateQuestion = () => {
  const screeningQuestions = useSelector(selectAllQuestions);

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
