import { selectFiltersItem } from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { UnknownAction } from "@reduxjs/toolkit";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const SwitchItem = ({
  state,
  setState,
  val,
}: {
  state: string[];
  setState: (state: string[]) => UnknownAction;
  val: { itemText: string };
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);

  const handleSwitch = (text: string) => {
    if (state.includes(text)) {
      dispatch(setState(state.filter((item) => item !== text)));
      dispatch(selectFiltersItem(filtersItem.filter((item) => item !== text)));
    } else {
      dispatch(setState([...state, text]));
      dispatch(selectFiltersItem([...filtersItem, text]));
    }
  };

  return (
    <div className="flex gap-[15px] not-last:mb-5">
      <div
        className={`filter-switch-wrapper ${
          state.includes(val?.itemText)
            ? "bg-[#1967D2] border-[#1967D2]"
            : "bg-white border-[#ECEDF2]"
        } relative cursor-pointer`}
        onClick={() => handleSwitch(val?.itemText)}
      >
        <span
          className={`filter-switch-circle ${
            state.includes(val?.itemText)
              ? "left-[25px] bg-white"
              : "left-[5px] bg-[#D2D3D8]"
          } top-1/2 -translate-y-1/2`}
        />
      </div>

      <span
        className="filter-switch-text"
        onClick={() => handleSwitch(val?.itemText)}
      >
        {val?.itemText}
      </span>
    </div>
  );
};

export default memo(SwitchItem);
