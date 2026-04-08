import CustomButton from "@/shared/components/ui/CustomButton";
import { CandidateQuestionIcons } from "../icon/icon";
import CandidateQuestionInput from "./QuestionInput";
import CandidateAnswerList from "./AnswerList";
import CandidateDisplaySelectAnswer from "./DisplaySelectAnswer";
import { Activity, FC, useState } from "react";
import AnswerFormat from "./AnswerFormat";
import SwitchContainer from "./Switch/SwitchContainer";
import KnockoutQuestion from "./KnockoutQuestion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import {
  removeScreeningQuestion,
  selectQuestionById,
} from "../slice/candidateQuestionSlice";

interface QuestionCardProps {
  index: number;
  cardId: string;
}

const QuestionCard: FC<QuestionCardProps> = ({ index, cardId }) => {
  const question = useSelector((state: RootState) =>
    selectQuestionById(state, cardId),
  );
  const [selectAnswerType, setSelectAnswerType] = useState(question.type ?? "Kısa Metin");
  const [showAnswerList, setShowAnswerList] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mt-6 border border-[#dee2e4] p-6 rounded-lg">
      <div className="flex gap-3">
        <CustomButton className="bg-transparent! p-0! self-start">
          <CandidateQuestionIcons.Dots
            className="text-[#5e6468]"
            size={20}
            cursor="move"
          />
        </CustomButton>

        <div className="w-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#5e6468] font-medium text-sm">
              Soru {index + 1}
            </span>

            <CustomButton
              className="bg-transparent! p-0!"
              handleClick={() => dispatch(removeScreeningQuestion(cardId))}
            >
              <CandidateQuestionIcons.Trash className="text-[#5e6468]" />
            </CustomButton>
          </div>

          <CandidateQuestionInput cardId={cardId} />

          <div className="mt-3 relative">
            <CandidateDisplaySelectAnswer
              showAnswerListFn={setShowAnswerList}
              selectedAnswerType={selectAnswerType}
            />

            <Activity mode={showAnswerList ? "visible" : "hidden"}>
              <CandidateAnswerList
                cardId={cardId}
                selectedAnswerType={selectAnswerType}
                showAnswerListFn={setShowAnswerList}
                selectAnswerTypeFn={setSelectAnswerType}
                items={[
                  "Kısa Metin",
                  "Uzun Metin",
                  "Evet / Hayır",
                  "Çoklu Seçim",
                  "Sayı",
                ]}
              />
            </Activity>
          </div>

          <AnswerFormat cardId={cardId} selectedAnswerType={selectAnswerType} />
          <SwitchContainer cardId={cardId} />

          {question.knockout && <KnockoutQuestion cardId={cardId} />}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
