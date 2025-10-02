import { RootState } from "@/shared/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const ResumeLabel = () => {
  const fileName = useSelector(
    (state: RootState) =>
      state.applicationModalData.placeholderUploadData.fileName
  );

  return (
    <label
      htmlFor="resume-upload"
      className={`!py-1.5 !px-4 !bg-transparent hover:!bg-[#EBF4FD] shadow-[0_0_0_1px_#4045ef] hover:shadow-[0_0_0_2px_#4045ef] transition-shadow duration-300 !text-[#4045ef] font-semibold rounded-full inline-block max-sm:w-full max-sm:text-center ${
        fileName.length ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      Özgeçmiş yükle
    </label>
  );
};

export default ResumeLabel;
