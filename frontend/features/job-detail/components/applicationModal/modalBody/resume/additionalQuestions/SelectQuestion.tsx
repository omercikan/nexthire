import React, { SelectHTMLAttributes } from "react";
import { MdArrowDropDown } from "react-icons/md";

type SelectQuestion = {
  question: { questionTitle: string; questionAnswers: string[] };
  index: number;
  error: string | undefined;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectQuestion = ({
  question,
  index,
  error,
  ...props
}: SelectQuestion) => {
  const { questionTitle, questionAnswers } = question;

  return (
    <div>
      <label
        htmlFor={`select_${index}`}
        className="block text-[#00000099] text-sm"
      >
        {questionTitle}
      </label>

      <div className="relative">
        <select
          {...props}
          id={`select_${index}`}
          className={`custom__input appearance-none none-spin-button !rounded-[6.4px] !py-1.5 !px-2 ${
            error ? "!border-[#d91b1b]" : "!border-[#d3e0fe]"
          }`}
        >
          <option disabled value="">
            Bir seçenek seçin
          </option>
          {questionAnswers.map((answer, i) => (
            <option key={i} value={answer}>
              {answer}
            </option>
          ))}
        </select>
        <MdArrowDropDown
          size={28}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>

      {error && <div className="text-[#d91b1b] text-sm mt-1">{error}</div>}
    </div>
  );
};

export default SelectQuestion;
