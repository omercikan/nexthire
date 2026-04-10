import React from "react";
import { IconType } from "react-icons/lib";

interface StatCardItemProps {
  icon: IconType;
  dataText: string;
  dataDescription: string;
  dataSubDescription: string;
}

const StatCardItem: React.FC<StatCardItemProps> = (props) => {
  const { icon: Icon, dataText, dataDescription, dataSubDescription } = props;

  return (
    <div className="flex-1 max-sm:text-center border border-[#e2e5e8] bg-white shadow-lg rounded-2xl py-6 px-5">
      <div className="bg-[#E6F1FB] p-2.5 rounded-xl w-max max-sm:mx-auto">
        <Icon color="0073d5" size={20} />
      </div>

      <div className="mt-4">
        <p className="text-[#0f171f] text-2xl font-bold">{dataText}</p>
        <p className="text-[#5b646f] text-sm mt-1 whitespace-nowrap">{dataDescription}</p>
        <p className="text-[#5b646f] text-sm mt-1 whitespace-nowrap">{dataSubDescription}</p>
      </div>
    </div>
  );
};

export default StatCardItem;
