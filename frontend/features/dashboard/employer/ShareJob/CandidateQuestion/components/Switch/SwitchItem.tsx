import { AppDispatch, RootState } from "@/shared/redux/store";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionById,
  updateQuestion,
} from "../../slice/candidateQuestionSlice";

interface CandidateQuestionSwitchProps {
  children: ReactNode;
  switchName: "required" | "knockout";
  cardId: string;
}

const CandidateQuestionSwitch: React.FC<CandidateQuestionSwitchProps> = ({
  children,
  switchName,
  cardId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const question = useSelector((state: RootState) =>
    selectQuestionById(state, cardId),
  );
  const switchStatus = question?.[switchName];

  const handleSwitchStatus = () => {
    dispatch(
      updateQuestion({ id: cardId, changes: { [switchName]: !switchStatus } }),
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        className={`w-8 h-[18.4px] rounded-full relative transition-all duration-300 ${switchStatus ? "bg-[#0f74c5]" : "bg-[#dee2e4]"}`}
        onClick={handleSwitchStatus}
      >
        <span
          className={`bg-[#f7f9fa] w-4 h-4 rounded-full absolute top-1/2 -translate-y-1/2 left-0.5 inline-block transition-all duration-300 ${switchStatus ? "translate-x-3.25" : "translate-x-0"}`}
        />
      </button>

      {children}
    </div>
  );
};

export default CandidateQuestionSwitch;
