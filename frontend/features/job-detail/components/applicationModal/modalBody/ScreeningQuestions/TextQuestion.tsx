import { useFormContext } from "react-hook-form";

interface TextQuestionProps {
  id: string;
  question: string;
  error: string;
  characterLimit: string;
  required: boolean;
}

const TextQuestion: React.FC<TextQuestionProps> = (props) => {
  const { register, watch } = useFormContext();
  const { id, question, characterLimit, required, error } = props;

  return (
    <div key={id} className="flex flex-col gap-4">
      <div>
        <p className="mb-1.5">{question}</p>
        <div>
          <textarea
            className={`candidate-question-input w-full ${error ? "candidate-question-input-error" : ""}`}
            maxLength={Number(characterLimit)}
            {...register(question, {
              required: {
                value: required,
                message: "Bu alan boş bırakılamaz",
              },
              maxLength: {
                value: Number(characterLimit),
                message: `Lütfen en fazla ${characterLimit} karakter giriniz`,
              },
            })}
          />

          <span className="text-xs text-red-600 float-right">
            {watch(question)?.length}/{characterLimit}
          </span>
        </div>

        {error && <div className="text-[#D91B1B] text-sm mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default TextQuestion;
