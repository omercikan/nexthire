"use client";

import { AppDispatch } from "@/lib/redux/store";
import { UnknownAction } from "@reduxjs/toolkit";
import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { GoPlus } from "react-icons/go";

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
  const dispatch = useDispatch<AppDispatch>();
  const [showMore, setShowMore] = useState(false);

  const handleSwitch = (text: string) =>
    state.includes(text)
      ? dispatch(setState(state.filter((item) => item !== text)))
      : dispatch(setState([...state, text]));

  return (
    <div className="mt-[30px]">
      <span className="filter-title">{title}</span>

      {switchItems.map((val, i) => (
        <div key={i} className="flex gap-[15px] not-last:mb-5">
          <div
            className={`filter-switch-wrapper ${
              state.includes(val.itemText)
                ? "bg-[#1967D2] border-[#1967D2]"
                : "bg-white border-[#ECEDF2]"
            } relative cursor-pointer`}
            onClick={() => handleSwitch(val.itemText)}
          >
            <span
              className={`filter-switch-circle ${
                state.includes(val.itemText)
                  ? "left-[25px] bg-white"
                  : "left-[5px] bg-[#D2D3D8]"
              } top-1/2 -translate-y-1/2`}
            />
          </div>

          <span
            className="filter-switch-text"
            onClick={() => handleSwitch(val.itemText)}
          >
            {val.itemText}
          </span>
        </div>
      ))}

      {showMore && (
        <div className="flex gap-[15px]">
          <div
            className={`filter-switch-wrapper ${
              state.includes(String(extraSwitchText))
                ? "bg-[#1967D2] border-[#1967D2]"
                : "bg-white border-[#ECEDF2]"
            } relative cursor-pointer`}
            onClick={() => handleSwitch(String(extraSwitchText))}
          >
            <span
              className={`filter-switch-circle ${
                state.includes(String(extraSwitchText))
                  ? "left-[25px] bg-white"
                  : "left-[5px] bg-[#D2D3D8]"
              } top-1/2 -translate-y-1/2`}
            />
          </div>

          <span
            className="filter-switch-text"
            onClick={() => handleSwitch(String(extraSwitchText))}
          >
            {extraSwitchText}
          </span>
        </div>
      )}

      {extraSwitch && (
        <div
          className="flex items-center mt-5 group cursor-pointer w-max"
          onClick={() => setShowMore(!showMore)}
        >
          <span className="bg-[#D4E1F5] text-[#1967D2] group-hover:bg-[#1967d2] group-hover:text-white transition-colors duration-500 w-[25px] h-[25px] me-2.5 rounded-full grid place-content-center">
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
