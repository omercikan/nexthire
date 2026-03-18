import { useDispatch } from "react-redux";
import Label from "../Label";
import { AppDispatch } from "@/shared/redux/store";
import { updateQuestion } from "../../slice/candidateQuestionSlice";
import { useState } from "react";

interface CharacterInputProps {
  min: number;
  max: number;
  placeholder: string;
  cardId: string;
}

const CharacterInput: React.FC<CharacterInputProps> = ({
  min,
  max,
  placeholder,
  cardId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [characterLimit, setCharacterLimit] = useState("");

  const handleUpdateStates = (value: string) => {
    setCharacterLimit(value);
    dispatch(
      updateQuestion({
        id: cardId,
        changes: { characterLimit: value },
      }),
    );
  };

  return (
    <>
      <Label htmlFor="character_input" label="Karakter Limit" />

      <input
        type="number"
        id="character_input"
        className={`candidate-question-input w-37.5 ${!characterLimit ? "candidate-question-input-error" : ""}`}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e) => handleUpdateStates(e.target.value)}
      />

      {!characterLimit && (
        <p className="text-[#D91B1B] text-sm mt-1 mb-2">
          bu alan boş bırakılamaz
        </p>
      )}
    </>
  );
};

export default CharacterInput;
