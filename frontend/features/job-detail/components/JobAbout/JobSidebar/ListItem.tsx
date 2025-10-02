import React, { memo } from "react";
import { OverviewList } from "./sidebar.types";

const ListItem = ({ list }: { list: OverviewList }) => {
  const { icon: Icon, text, value } = list;

  return (
    <li className="flex gap-[15px]">
      <div className="text-[#1967d2] text-[28px]">
        <Icon />
      </div>

      <div>
        <span className="text-[#202124] font-medium">{text}</span>
        <span className="text-[#696969] text-[15px] block leading-[26.25px]">
          {value}
        </span>
      </div>
    </li>
  );
};

export default memo(ListItem);
