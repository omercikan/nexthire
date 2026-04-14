import React from "react";
import { IconType } from "react-icons/lib";
import { statIcons } from "../../icons/statIcons";
import { cn } from "@/shared/libs/utils";

interface StatCardItemProps {
  icon: IconType;
  dataText: string;
  delta: number;
  isPositiveDelta: boolean;
  dataDescription: string;
  dataSubDescription: string;
  isLoading: boolean;
}

const StatCardItem: React.FC<StatCardItemProps> = (props) => {
  const {
    icon: Icon,
    dataText,
    delta,
    isPositiveDelta,
    dataDescription,
    dataSubDescription,
    isLoading,
  } = props;

  return (
    <div className="flex-1 max-sm:text-center border border-[#e2e5e8] bg-white shadow-lg rounded-2xl py-6 px-5">
      <div className="flex justify-between items-center">
        <div className="bg-[#E6F1FB] p-2.5 rounded-xl w-max max-sm:mx-auto">
          <Icon color="0073d5" size={20} />
        </div>

        {!isLoading ? (
          <div
            className={cn(
              "flex items-center gap-1 font-medium text-xs",
              isPositiveDelta ? "text-[#5bb661]" : "text-[#cc272e]",
            )}
          >
            {isPositiveDelta ? (
              <statIcons.TrendingUp />
            ) : (
              <statIcons.TrendingDown />
            )}
            {isPositiveDelta ? "+" : "-"}
            {delta.toString().replace("-", "")}
          </div>
        ) : (
          <div className="animate-pulse rounded-md bg-gray-300 w-10 h-5" />
        )}
      </div>

      <div className="mt-4">
        {!isLoading ? (
          <p className="text-[#0f171f] text-2xl font-bold">{dataText}</p>
        ) : (
          <p className="animate-pulse rounded-md bg-gray-300 w-7 h-7" />
        )}
        <p className="text-[#5b646f] text-sm mt-1 whitespace-nowrap">
          {dataDescription}
        </p>
        <p className="text-[#5b646f] text-sm mt-1 whitespace-nowrap">
          {dataSubDescription}
        </p>
      </div>
    </div>
  );
};

export default StatCardItem;
