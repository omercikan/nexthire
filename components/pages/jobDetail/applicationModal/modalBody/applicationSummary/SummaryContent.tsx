import React, { ReactElement } from "react";

const SummaryContent = ({
  contentTitle,
  subTitle,
  children,
}: {
  contentTitle: string;
  subTitle?: string;
  children: ReactElement;
}) => {
  return (
    <div className="px-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-[#000000E6] font-semibold">{contentTitle}</h4>
          <p className="mt-3 text-[#00000099] text-xs">{subTitle}</p>
        </div>
        <button className="text-[#4045ef] hover:underline text-sm font-semibold">
          Düzenle
        </button>
      </div>

      {children}

      <div className="border-t border-t-[#E8E8E8] my-6"></div>
    </div>
  );
};

export default SummaryContent;
