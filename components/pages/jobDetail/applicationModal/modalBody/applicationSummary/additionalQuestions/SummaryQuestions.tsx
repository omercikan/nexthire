import { RootState } from "@/lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const SummaryQuestions = () => {
  const additionalQuestions = useSelector(
    (state: RootState) =>
      state.applicationModalData.applicationData.additionalQuestions
  );

  return (
    <>
      {additionalQuestions.map(({ title, answer }, index) => (
        <div key={index} className="mb-3">
          <label className="text-[#00000099] text-xs line-clamp-none">
            {title}
          </label>
          <p className="text-[#000000E6] text-sm">{answer}</p>
        </div>
      ))}
    </>
  );
};

export default SummaryQuestions;
