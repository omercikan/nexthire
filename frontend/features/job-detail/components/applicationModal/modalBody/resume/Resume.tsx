import React from "react";
import ResumeHeader from "./ResumeHeader";
import ResumeList from "./ResumeList";
import UploadResume from "./UploadResume";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";

const ModalResume = () => {
  const isShowMore = useSelector(
    (state: RootState) => state.touch.showMoreResumes
  );

  return (
    <div
      className={`max-sm:px-3! h-[calc(100%-241.56px)] visible-scrollbar ${
        isShowMore ? "sm:h-112.5!" : ""
      }`}
    >
      <ResumeHeader />
      <ResumeList />
      <UploadResume />
    </div>
  );
};

export default ModalResume;
