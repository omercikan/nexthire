import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectProps {
  question: string;
  children: React.ReactNode;
  error: string;
}

interface OptionProps {
  value: string;
  question: string;
  required: boolean;
}

interface SelectQuestionProps {
  question: string;
  error: string;
  required: boolean;
}

const Select = ({ question, children, error }: SelectProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <p className="mb-1.5">{question}</p>

        <div className="flex items-center gap-3">{children}</div>

        {error && <div className="text-[#D91B1B] text-sm mt-1">{error}</div>}
      </div>
    </div>
  );
};

Select.Option = function Option(props: OptionProps) {
  const { register, setValue, clearErrors, watch } = useFormContext();
  const { value, question, required } = props;

  const handleClick = () => {
    setValue(question, value);

    if (watch(question)) clearErrors(question);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className={`w-4 h-4 border border-[#dee2e4] rounded-full transition-colors duration-300 ${watch(question) === value ? "border-5 border-[#4045ef]!" : ""}`}
        type="button"
        {...register(question, {
          required: {
            value: required,
            message: "Lütfen bir seçenek belirtiniz",
          },
        })}
        onClick={handleClick}
      />
      <label
        htmlFor="no"
        className={`text-[#080C0F] block text-sm font-medium`}
        onClick={handleClick}
      >
        {value}
      </label>
    </div>
  );
};

const SelectQuestion: React.FC<SelectQuestionProps> = (props) => {
  const { error, question, required } = props;

  return (
    <Select question={question} error={error}>
      <Select.Option required={required} question={question} value="Evet" />
      <Select.Option required={required} question={question} value="Hayır" />
    </Select>
  );
};

export default SelectQuestion;
