import { CandidateQuestionIcons } from "../../icon/icon";
import CustomButton from "@/shared/components/ui/CustomButton";
import {
  addScreeningQuestions,
  selectAllQuestions,
} from "../../slice/candidateQuestionSlice";
import { nanoid } from "@reduxjs/toolkit";
import QuestionCard from "../QuestionCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/shared/redux/store";

const QuestionsContent = () => {
  const screeningQuestions = useSelector(selectAllQuestions);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {screeningQuestions.map(({ id }, i) => (
        <QuestionCard key={id} cardId={id} index={i} />
      ))}

      <CustomButton
        className="candidate-question-input ring-0! border-[#dee2e4]! hover:bg-[#0f74c5]! hover:text-white! py-2! text-[#080c0f]! flex items-center justify-center font-medium! mt-4 gap-2 w-full"
        handleClick={() =>
          dispatch(
            addScreeningQuestions({
              id: nanoid(),
              question: "",
              type: "Kısa Metin",
              knockout: false,
              required: false,
            }),
          )
        }
      >
        <CandidateQuestionIcons.Plus />
        Soru Ekle
      </CustomButton>
    </>
  );
};

export default QuestionsContent;
