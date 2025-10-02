"use client";

import { AppDispatch, RootState } from "@/shared/redux/store";
import React, { MouseEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { CustomListProps } from "@/shared/types/filtersJob";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";
import { setTouchSortList } from "@/shared/redux/slices/touch";
import { selectFiltersItem } from "@/shared/redux/slices/filters";

const CustomList = ({
  title,
  options,
  state,
  setState,
  defaultValue,
  screenClass,
  listClass,
  listWrapperClass,
  openCustomList,
  setOpenCustomList,
}: CustomListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);
  const { filterJob } = useJobFilter();

  useEffect(() => {
    window.addEventListener("click", () => {
      dispatch(setOpenCustomList(""));
      dispatch(setTouchSortList(false));
    });
  }, [dispatch, setOpenCustomList]);

  const handleItemAction = (option: string): void => {
    dispatch(setOpenCustomList(""));

    if (option !== "Sıralama (Varsayılan)" && option !== "Sayfa Başına 10") {
      dispatch(setState(option));
      const updatedFilters = filtersItem.filter(
        (item) => !options.includes(item)
      );

      dispatch(selectFiltersItem([...updatedFilters, option]));
    } else {
      dispatch(setState(""));
      dispatch(
        selectFiltersItem(filtersItem.filter((fi) => !options.includes(fi)))
      );
    }

    filterJob();
  };

  const handleClearCurrent = (e: MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    dispatch(setOpenCustomList(""));

    dispatch(setState(""));
    dispatch(selectFiltersItem(filtersItem.filter((item) => item !== state)));

    filterJob();
  };

  const handleOpenList = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (openCustomList === defaultValue) {
      dispatch(setOpenCustomList(""));
    } else {
      dispatch(setOpenCustomList(defaultValue));
    }

    if (
      defaultValue.startsWith("Sıralama") &&
      openCustomList !== defaultValue
    ) {
      dispatch(setTouchSortList(true));
    } else {
      dispatch(setTouchSortList(false));
    }
  };

  return (
    <div className={`${listWrapperClass ?? ""}`}>
      {title && <span className="filter-title">{title}</span>}

      <div className="relative z-[1]">
        <div
          className={`job-type-screen ${screenClass} ${
            openCustomList === defaultValue
              ? "border-[#4045ef]"
              : "border-white"
          }`}
          onClick={handleOpenList}
        >
          {state ? state : defaultValue}

          <div className="flex items-center gap-2 z-10">
            {state && state !== defaultValue && (
              <IoIosClose
                size={20}
                className="hover:text-[#e44343]"
                onClick={handleClearCurrent}
              />
            )}

            <MdArrowDropDown
              size={22}
              className={
                openCustomList === defaultValue ? "rotate-x-180" : "rotate-x-0"
              }
            />
          </div>
        </div>

        {openCustomList === defaultValue && (
          <ul
            className={`job-type-list ${listClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((option, index) => (
              <li
                key={index}
                className="job-type-list__item"
                onClick={() => handleItemAction(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomList;
