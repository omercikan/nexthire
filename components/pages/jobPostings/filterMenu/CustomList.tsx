"use client";

import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { CustomListProps } from "@/types/filtersJob";
import { selectFiltersItem } from "@/lib/redux/features/filterJobs/filters";
import useJobFilter from "@/hooks/useJobFilter";
import { setTouchSortList } from "@/lib/redux/features/touch";

const JobType = ({
  title,
  options,
  state,
  setState,
  defaultValue,
  screenClass,
  listClass,
  listWrapperClass,
}: CustomListProps) => {
  const [openJobMenu, setOpenJobMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);
  const { filterJob } = useJobFilter();

  useEffect(() => {
    window.addEventListener("click", () => {
      setOpenJobMenu(false);
      dispatch(setTouchSortList(false));
    });
  }, [dispatch]);

  const handleItemAction = (option: string): void => {
    dispatch(setState(option));
    setOpenJobMenu(false);

    if (option !== "Sıralama (Varsayılan)" && option !== "Sayfa Başına 10") {
      const updatedFilters = filtersItem.filter(
        (item) => !options.includes(item)
      );

      dispatch(selectFiltersItem([...updatedFilters, option]));
    } else {
      dispatch(
        selectFiltersItem(filtersItem.filter((fi) => !options.includes(fi)))
      );
    }

    filterJob();
  };

  const handleClearCurrent = () => {
    filterJob();

    dispatch(setState(""));
    dispatch(
      selectFiltersItem(filtersItem.filter((item) => !options.includes(item)))
    );
  };

  const handleOpenList = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpenJobMenu(!openJobMenu);

    if (defaultValue.startsWith("Sıralama") && !openJobMenu) {
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
            openJobMenu ? "border-[#4045ef]" : "border-white"
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
              className={openJobMenu ? "rotate-x-180" : "rotate-x-0"}
            />
          </div>
        </div>

        {openJobMenu && (
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

export default JobType;
