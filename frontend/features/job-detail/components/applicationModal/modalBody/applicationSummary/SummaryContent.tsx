import { AppDispatch } from "@/shared/redux/store";
import React, { ReactElement, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateStep } from "../../slices/modalControlSlice";

const SummaryContent = ({
  contentTitle,
  subTitle,
  children,
  step,
}: {
  contentTitle: string;
  subTitle?: string;
  children: ReactElement;
  step: number;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleApplicationMenu = useCallback(
    (step: number) => {
      dispatch(updateStep(step));
    },
    [dispatch],
  );

  return (
    <div className="px-6 max-sm:px-3">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-[#000000E6] font-semibold">{contentTitle}</h4>
          <p className="mt-3 text-[#00000099] text-xs">{subTitle}</p>
        </div>
        <button
          className="text-[#4045ef] hover:underline text-sm font-semibold"
          onClick={() => handleApplicationMenu(step)}
        >
          Düzenle
        </button>
      </div>

      {children}

      <div className="border-t border-t-[#E8E8E8] my-6"></div>
    </div>
  );
};

export default SummaryContent;
