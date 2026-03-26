import CustomInput from "@/shared/components/ui/CustomInput";
import { useFormContext } from "react-hook-form";

interface NumberQuestionProps {
  id: string;
  question: string;
  error: string;
  required: boolean;
}

const NumberQuestion: React.FC<NumberQuestionProps> = ({
  id,
  question,
  required,
  error,
}) => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor={id} className="mb-1.5">
          {question}
        </label>

        <CustomInput
          type="number"
          id={id}
          className={`candidate-question-input w-full ${error ? "candidate-question-input-error" : ""}`}
          min={0}
          {...register(question, {
            required: {
              value: required,
              message: "Bu alan zorunludur",
            },
            min: {
              value: 0,
              message: "Lütfen geçerli bir değer giriniz",
            },
          })}
          error={error}
        />
    </div>
    </div>
  );
};

export default NumberQuestion;
