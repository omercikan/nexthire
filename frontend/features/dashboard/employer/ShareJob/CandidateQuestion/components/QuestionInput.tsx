import { useDispatch } from "react-redux";
import Label from "./Label";
import { updateQuestion } from "../slice/candidateQuestionSlice";

const CandidateQuestionInput = ({ cardId }: { cardId: string }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Label htmlFor="question" label="Soru" />

      <input
        type="text"
        id="question"
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
