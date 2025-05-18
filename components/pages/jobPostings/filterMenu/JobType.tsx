"use client";

import { selectJobType } from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

const JobType = ({ title, options }: { title: string; options: string[] }) => {
  const { jobType } = useSelector((state: RootState) => state.filtersJob);
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
          className={`job-type-screen ${
            openJobMenu ? "border-[#4045ef]" : "border-white"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            setOpenJobMenu(!openJobMenu);
          }}
        >
          {jobType ? jobType : "Çalışma tercihi"}

          <div className="flex items-center gap-2">
            {jobType && (
              <IoIosClose
                size={20}
                className="hover:text-[#e44343]"
                onClick={() => dispatch(selectJobType(""))}
              />
            )}

            <MdArrowDropDown
              size={22}
              className={openJobMenu ? "rotate-x-180" : "rotate-x-0"}
            />
          </div>
        </div>

        {openJobMenu && (
          <ul className="job-type-list" onClick={(e) => e.stopPropagation()}>
            {options.map((option, index) => (
              <li
                key={index}
                className="job-type-list__item"
                onClick={(e) => {
                  dispatch(selectJobType(e.currentTarget.innerText));
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
