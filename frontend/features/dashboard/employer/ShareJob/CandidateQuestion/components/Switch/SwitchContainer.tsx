import React from "react";
import CandidateQuestionSwitch from "./SwitchItem";
import Label from "../Label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import {
  selectQuestionById,
  updateQuestion,
} from "../../slice/candidateQuestionSlice";

const SwitchContainer = ({ cardId }: { cardId: string }) => {
  const question = useSelector((state: RootState) =>
    selectQuestionById(state, cardId),
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="border-t border-[#dee2e4] mt-4 pt-4 flex items-center gap-6">
      <CandidateQuestionSwitch switchName="required" cardId={cardId}>
        <Label
          htmlFor="required"
          label="Zorunlu"
          className="mb-0! font-normal! select-none"
          onClick={() =>
            dispatch(
              updateQuestion({
                id: cardId,
                changes: { required: !question.required },
              }),
            )
          }
        />
      </CandidateQuestionSwitch>

      <CandidateQuestionSwitch switchName="knockout" cardId={cardId}>
        <Label
          htmlFor="knockout"
          label="Eleme Sorusu"
          className="mb-0! font-normal! select-none"
          onClick={() =>
            dispatch(
              updateQuestion({
                id: cardId,
                changes: { knockout: !question.knockout },
              }),
            )
          }
        />
      </CandidateQuestionSwitch>
    </div>
  );
};

export default SwitchContainer;
