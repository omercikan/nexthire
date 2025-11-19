import React from "react";
import { CVDataFields } from "@/shared/types/resume";
import ResumeItem from "./ResumeItem";

const ResumeList = ({ resumes }: { resumes: CVDataFields[] }) => {
  return (
    <ul className="flex flex-col gap-5">
      {resumes.map((val, index) => (
        <ResumeItem key={val._id} resume={val} index={index + 1} />
      ))}
    </ul>
  );
};

export default ResumeList;
