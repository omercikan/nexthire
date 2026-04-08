import { useDispatch, useSelector } from "react-redux";
import Label from "./Label";
import { selectQuestionById, updateQuestion } from "../slice/candidateQuestionSlice";
import { RootState } from "@/shared/redux/store";

const CandidateQuestionInput = ({ cardId }: { cardId: string }) => {
  const dispatch = useDispatch();
  const {question} = useSelector((state: RootState) => selectQuestionById(state, cardId))

  return (
    <div>
      <Label htmlFor="question" label="Soru" />

      <input
        type="text"
        id="question"
        value={question}
        placeholder="Sorunuzu girin..."
        className="candidate-question-input w-full"
        onChange={(e) =>
          dispatch(
            updateQuestion({
              id: cardId,
              changes: { question: e.target.value },
            }),
          )
        }
      />
    </div>
  );
};

export default CandidateQuestionInput;
