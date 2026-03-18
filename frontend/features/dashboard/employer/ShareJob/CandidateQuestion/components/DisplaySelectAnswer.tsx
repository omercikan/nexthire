import CustomButton from "@/shared/components/ui/CustomButton";
import { CandidateQuestionIcons } from "../icon/icon";
import React from "react";
import Label from "./Label";

interface CandidateDisplaySelectAnswerProps {
  selectedAnswerType: string;
  showAnswerListFn: React.Dispatch<React.SetStateAction<boolean>>;
}

const CandidateDisplaySelectAnswer: React.FC<
  CandidateDisplaySelectAnswerProps
> = ({ selectedAnswerType, showAnswerListFn }) => {
  return (
    <>
      <Label htmlFor="answer_type" label="Soru Tipi" />

      <CustomButton
        className="py-2! px-3! rounded-lg! flex items-center gap-2 border border-[#dee2e4] bg-[#f7f9fa]!"
        handleClick={() => showAnswerListFn((prev) => !prev)}
      >
        <span className="text-sm text-[#080C0F]">{selectedAnswerType}</span>
        <CandidateQuestionIcons.Down className="text-[#5e6468]" size={16} />
      </CustomButton>
    </>
  );
};

export default CandidateDisplaySelectAnswer;
