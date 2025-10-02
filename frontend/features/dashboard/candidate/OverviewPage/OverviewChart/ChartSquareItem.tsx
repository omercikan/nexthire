import React from "react";

const ChartSquareItem = ({ className }: { className?: string }) => {
  return (
    <span
      className={`w-[15px] h-[15px] rounded-[5px] block ${className ?? ""}`}
    />
  );
};

export default ChartSquareItem;
