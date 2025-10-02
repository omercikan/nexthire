import React from "react";

const RadioButton = ({ isMatchResumeID }: { isMatchResumeID: boolean }) => {
  return (
    <div
      className={
        isMatchResumeID
          ? "sm:hover:shadow-[0px_0px_0px_1px_#000000BF] rounded-full grid place-content-center"
          : ""
      }
    >
      <button
        className={`w-[24px] h-[24px] border-2 ${
          isMatchResumeID
            ? "border-[#4045ef] border-6 sm:hover:border-[#335990] bg-[#8c8c8c1a]"
            : "border-[#000000BF] sm:hover:shadow-[inset_0px_0px_0px_1px_#000000BF] sm:hover:bg-[#8c8c8c1a]"
        } transition duration-300 rounded-full cursor-pointer`}
      />
    </div>
  );
};

export default RadioButton;
