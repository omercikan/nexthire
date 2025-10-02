import { RootState } from "@/shared/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const ResumeHeader = () => {
  const { isSmallScreen } = useSelector(
    (state: RootState) => state.applyModalScreen
  );

  return (
    <div className="px-6 max-sm:px-0">
      <h3 className="font-semibold text-[#000000E6]">Özgeçmiş</h3>
      <p className="mt-1 text-[#000000E6] max-sm:text-sm max-sm:mb-5">
        Başvurunuzun değerlendirilebilmesi için güncel özgeçmişinizi yükleyin{" "}
        {!isSmallScreen && <span>*</span>}
      </p>
    </div>
  );
};

export default ResumeHeader;
