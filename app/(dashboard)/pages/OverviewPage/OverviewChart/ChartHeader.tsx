import React from "react";
import ChartSquareItem from "./ChartSquareItem";

const ChartHeader = ({ totalView }: { totalView: number }) => {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between py-4 px-8">
      <h3 className="text-[#718EBF] max-sm:text-sm text-center">
        Bu yıl profiliniz{" "}
        {new Intl.NumberFormat("tr-TR").format(Number(totalView ?? 0))} kez
        görüntülendi
      </h3>

      <ul>
        <li className="flex items-center">
          <ChartSquareItem className="bg-[#1A16F3]" />
          <ChartSquareItem className="bg-[#FCAA0B] ms-1 me-3" />
          <span className="text-[#718EBF]">Ay</span>
        </li>
      </ul>
    </div>
  );
};

export default ChartHeader;
