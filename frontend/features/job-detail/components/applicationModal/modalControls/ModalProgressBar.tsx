import { useJob } from "@/features/jobs/context/JobContext";
import { RootState } from "@/shared/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ModalProgressBar = () => {
  const { screeningQuestions } = useJob();
  const { step } = useSelector((state: RootState) => state.modalControlSlice);
  const [barWidthValue, setBarWidthValue] = useState(0);

  useEffect(() => {
    const maxStep = !screeningQuestions ? 3 : 4;
    const barWidth = 100 / maxStep;

    if (step === 4) return setBarWidthValue(100);
    if (step === 1) return setBarWidthValue(0);

    setBarWidthValue(step * barWidth);
  }, [screeningQuestions, step]);

  return (
    <div className="flex items-center py-2 px-6 max-sm:px-3 gap-3">
      <div className="bg-[#E8E8E8] h-2 w-full rounded-full overflow-hidden flex-[95%]">
        <div
          className={`h-full bg-[#4045ef] rounded-s-full transition-all duration-300`}
          style={{ width: `${barWidthValue.toFixed(2)}%` }}
        ></div>
      </div>

      <span className="text-sm text-[#00000099] flex-[5%] text-end">
        %{barWidthValue?.toFixed(0)}
      </span>
    </div>
  );
};

export default ModalProgressBar;
