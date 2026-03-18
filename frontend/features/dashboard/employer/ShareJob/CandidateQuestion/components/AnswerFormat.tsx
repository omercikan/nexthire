import CharacterInput from "./Inputs/CharacterInput";
import MultipleInput from "./Inputs/MultipleInput";
import NumberInput from "./Inputs/NumberInput";
import SelectInput from "./Inputs/SelectInput";

interface AnswerFormatProps {
  selectedAnswerType: string;
  cardId: string;
}

const AnswerFormat: React.FC<AnswerFormatProps> = ({
  selectedAnswerType,
  cardId,
}) => {
  let content;

  switch (selectedAnswerType) {
    case "Kısa Metin":
      content = (
        <CharacterInput cardId={cardId} min={50} max={100} placeholder="50" />
      );
      break;
    case "Uzun Metin":
      content = (
        <CharacterInput
          cardId={cardId}
          min={500}
          max={1000}
          placeholder="500"
        />
      );
      break;
    case "Evet / Hayır":
      content = <SelectInput />;
      break;
    case "Çoklu Seçim":
      content = <MultipleInput cardId={cardId} />;
      break;
    case "Sayı":
      content = <NumberInput />;
      break;
    default:
      content = null;
  }

  return <div className="mt-10">{content}</div>;
};

export default AnswerFormat;
