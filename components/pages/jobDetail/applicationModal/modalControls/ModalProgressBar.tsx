import { RootState } from "@/lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const ModalProgressBar = () => {
  const {
    progressBar: { barWidthValue },
    isEdit,
  } = useSelector((state: RootState) => state.applicationModalProgressBar);

  return (
    <>
      <div className="flex items-center py-2 px-6 gap-3">
        <div className="bg-[#E8E8E8] h-2 w-full rounded-full overflow-hidden flex-[95%]">
          <div
            className={`h-full bg-[#4045ef] rounded-s-full transition-all duration-300`}
            style={{
              width: isEdit ? "100%" : `${barWidthValue.toFixed(2)}%`,
            }}
          ></div>
        </div>

        <span className="text-sm text-[#00000099] flex-[5%] text-end">
          %
          {isEdit
            ? "100"
            : barWidthValue?.toFixed(0).includes("-")
            ? "0"
            : barWidthValue?.toFixed(0)}
        </span>
      </div>
    </>
  );
};

export default ModalProgressBar;
