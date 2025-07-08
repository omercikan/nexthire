import React from "react";
import ResumeHeader from "./ResumeHeader";
import ResumeList from "./ResumeList";
import UploadResume from "./UploadResume";

const ModalResume = () => {
  return (
    <>
      <ResumeHeader />
      <ResumeList />
      <UploadResume />
    </>
  );
};

export default ModalResume;
