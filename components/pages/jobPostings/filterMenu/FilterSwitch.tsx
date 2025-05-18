"use client";

import { AppDispatch } from "@/lib/redux/store";
import { UnknownAction } from "@reduxjs/toolkit";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

const FilterSwitch = ({
  title,
  switchItems,
  state,
  setState,
}: {
  title: string;
  switchItems: { itemText: string }[];
  state: string[];
  setState: (state: string[]) => UnknownAction;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSwitch = (text: string) =>
    state.includes(text)
      ? dispatch(setState(state.filter((item) => item !== text)))
      : dispatch(setState([...state, text]));

  return (
    <div className="mt-[30px]">
      <span className="filter-title">{title}</span>

      {switchItems.map((val, i) => (
        <div key={i} className="flex gap-[15px] not-last:mb-3">
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
    </div>
  );
};

export default memo(FilterSwitch);
