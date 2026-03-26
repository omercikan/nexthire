import { useFormContext } from "react-hook-form";

interface MultipleQuestionProps {
  id: string;
  question: string;
  error: string;
  characterLimit: string;
  required: boolean;
  options: string[];
}

const MultipleQuestion: React.FC<MultipleQuestionProps> = (props) => {
  const { register, watch, setValue } = useFormContext();
  const { id, question, required, error, options } = props;

  const handleClick = (newValue: string[]) => {
    setValue(question, newValue, {
      shouldValidate: true,
    });
  };

  return (
    <div key={id} className="flex flex-col gap-4">
      <div>
        <p className="mb-1.5">{question}</p>

        <input
          type="hidden"
          {...register(question, {
            validate: (value) =>
              !required ||
              (Array.isArray(value) && value.length > 0) ||
              "Lütfen en az bir seçenek seçiniz",
          })}
        />

        {options?.map((option) => {
          const rawValue = watch(question);
          const options: string[] = Array.isArray(rawValue) ? rawValue : [];
          const isSelected = options.includes(option);
          const updated = isSelected
            ? options.filter((opt) => opt !== option)
            : [...options, option];

          return (
            <button
              key={option}
              className={`block mb-1.5 w-full bg-[#f7f9fa] border rounded-md transition-colors duration-300 py-1.5 px-3 text-sm text-left ${isSelected ? "border-[#4045ef]" : "border-[#dee2e4]"}`}
              type="button"
              onClick={() => handleClick(updated)}
            >
              {option}
            </button>
          );
        })}

        {error && <div className="text-[#D91B1B] text-sm mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default MultipleQuestion;
