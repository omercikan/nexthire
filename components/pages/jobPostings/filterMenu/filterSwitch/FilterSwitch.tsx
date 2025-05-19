"use client";

import { UnknownAction } from "@reduxjs/toolkit";
import React, { memo, useState } from "react";
import { GoPlus } from "react-icons/go";
import SwitchItem from "./SwitchItem";

const FilterSwitch = ({
  title,
  switchItems,
  state,
  setState,
  extraSwitch,
  extraSwitchText,
}: {
  title: string;
  switchItems: { itemText: string }[];
  state: string[];
  setState: (state: string[]) => UnknownAction;
  extraSwitch?: boolean;
  extraSwitchText?: string;
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mt-[30px]">
      <span className="filter-title">{title}</span>

      {switchItems.map((val, i) => (
        <SwitchItem key={i} state={state} setState={setState} val={val} />
      ))}

      {showMore && (
        <SwitchItem
          state={state}
          setState={setState}
          val={{ itemText: String(extraSwitchText) }}
        />
      )}

      {extraSwitch && (
        <div
          className="flex items-center mt-5 group cursor-pointer w-max"
          onClick={() => setShowMore(!showMore)}
        >
          <span className="extra-filter-switch-plus">
            <GoPlus />
          </span>
          <span className="text-[#1967d2] text-[13px]">
            {showMore ? "Daha az göster" : "Daha fazla göster"}
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(FilterSwitch);
