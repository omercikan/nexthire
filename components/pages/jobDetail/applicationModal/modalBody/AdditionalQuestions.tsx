import React from "react";
import Question from "./resume/additionalQuestions/Question";

const AdditionalQuestions = () => {
  return (
    <div className="h-[calc(100%-249.58px)] sm:h-[410px] overflow-auto">
      <h3 className="text-[#000000E6] font-medium mb-3 px-6 max-sm:px-3">
        Ek Sorular
      </h3>
      <Question />
    </div>
  );
};

export default AdditionalQuestions;
