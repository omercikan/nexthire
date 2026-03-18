import { useDispatch, useSelector } from "react-redux";
import Label from "./Label";
import { AppDispatch, RootState } from "@/shared/redux/store";
import {
  selectQuestionById,
  updateQuestion,
} from "../slice/candidateQuestionSlice";

const KnockoutQuestion = ({ cardId }: { cardId: string }) => {
  const question = useSelector((state: RootState) =>
    selectQuestionById(state, cardId),
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateStetes = (value: string) => {
    dispatch(
      updateQuestion({
        id: cardId,
        changes: { knockoutAnswer: value },
      }),
    );
  };

  return (
    <div className="bg-[#F3F8FC] border border-[#C6DEF1] rounded-lg mt-4 p-4">
      <Label
        htmlFor="knockout_question"
        label="Doğru Cevap (Yanlış cevap veren adaylar otomatik olarak elenecektir)"
        className="text-[#0f74c5]! "
      />

      <input
        className={`candidate-question-input w-full ${!question.knockoutAnswer ? "candidate-question-input-error" : ""}`}
        placeholder="Beklenen cevabı girin"
        onChange={(e) => handleUpdateStetes(e.target.value)}
      />

      {!question.knockoutAnswer && (
        <p className="text-[#D91B1B] text-sm mt-1 mb-2">
          bu alan boş bırakılamaz
        </p>
      )}
    </div>
  );
};

export default KnockoutQuestion;
