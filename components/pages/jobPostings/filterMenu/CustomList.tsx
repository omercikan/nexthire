"use client";

import { AppDispatch } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { CustomListProps } from "@/types/filtersJob";

const JobType = ({
  title,
  options,
  state,
  setState,
  defaultValue,
  screenClass,
  listClass,
}: CustomListProps) => {
  const [openJobMenu, setOpenJobMenu] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    window.addEventListener("click", () => setOpenJobMenu(false));
  }, []);

  return (
    <div>
      <span className="filter-title">{title}</span>

      <div className="relative">
        <div
          className={`job-type-screen ${screenClass} ${
            openJobMenu ? "border-[#4045ef]" : "border-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setOpenJobMenu(!openJobMenu);
          }}
        >
          {state ? state : defaultValue}

          <div className="flex items-center gap-2">
            {state && state !== defaultValue && (
              <IoIosClose
                size={20}
                className="hover:text-[#e44343]"
                onClick={() => dispatch(setState(""))}
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
                onClick={(e) => {
                  dispatch(setState(e.currentTarget.innerText));
                  setOpenJobMenu(false);
                }}
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
