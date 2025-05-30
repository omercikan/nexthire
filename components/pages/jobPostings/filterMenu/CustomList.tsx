"use client";

import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { CustomListProps } from "@/types/filtersJob";
import { selectFiltersItem } from "@/lib/redux/features/filterJobs/filters";
import useJobFilter from "@/hooks/useJobFilter";

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
    window.addEventListener("click", () => setOpenJobMenu(false));
  }, []);

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
  };

  const handleClearCurrent = () => {
    filterJob();

    dispatch(setState(""));
    dispatch(
      selectFiltersItem(filtersItem.filter((item) => !options.includes(item)))
    );
  };

  return (
    <div className={`${listWrapperClass ?? ""}`}>
      {title && <span className="filter-title">{title}</span>}

      <div className="relative z-[1]">
        <div
          className={`job-type-screen z-10 ${screenClass} ${
            openJobMenu ? "border-[#4045ef]" : "border-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setOpenJobMenu(!openJobMenu);
          }}
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
