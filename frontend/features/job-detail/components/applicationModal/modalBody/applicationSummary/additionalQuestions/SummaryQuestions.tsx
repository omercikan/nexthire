import { RootState } from "@/shared/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const SummaryQuestions = () => {
  const { screeningQuestions } = useSelector(
    (state: RootState) => state.applicationModalData.applicationData,
  );

  if (!screeningQuestions.length) return null;

  return (
    <>
      {screeningQuestions.map(({ question, answer }, i) => (
        <div key={i} className="mb-3">
          <label className="text-[#00000099] text-xs line-clamp-none">
            {question}
          </label>
          <p className="text-[#000000E6] text-sm mt-1.5">
            {typeof answer === "string"
              ? answer
              : (answer as string[]).join(", ")}
          </p>
        </div>
      ))}
    </>
  );
};

export default SummaryQuestions;
