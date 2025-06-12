"use client";

import React, { useCallback, useEffect, useRef } from "react";
import CustomList from "./CustomList";
import FilterSwitch from "./filterSwitch/FilterSwitch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  openFilterMenu,
  selectCareerLevel,
  selectExperienceLevel,
  selectJobType,
} from "@/lib/redux/features/filterJobs/filters";
import {
  CAREER_LEVELS,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
} from "@/constants/filtersJob";
import CustomButton from "@/components/ui/CustomButton";
import useJobFilter from "@/hooks/useJobFilter";
import { IoCloseOutline } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import { setOpenCustomList } from "@/lib/redux/features/touch";
import useScroll from "@/hooks/useScroll";

const FilterMenuMobile = () => {
  const { experienceLevel, careerLevel, jobType, openfilterMenu } = useSelector(
    (state: RootState) => state.jobFilters
  );
  const { filterJob, isLoading } = useJobFilter();
  const dispatch = useDispatch<AppDispatch>();
  const asideRef = useRef(null);
  const { openCustomList } = useSelector((state: RootState) => state.touch);
  const { applyScroll } = useScroll();

  useEffect(() => {
    window.addEventListener("click", () => {
      dispatch(openFilterMenu(false));
    });
  }, [dispatch]);

  useEffect(() => {
    if (openfilterMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openfilterMenu]);

  const handleFilter = useCallback(() => {
    dispatch(openFilterMenu(false));
    filterJob();

    setTimeout(() => {
      applyScroll(640, 474.57, 386.63);
    }, 10);
  }, [filterJob, dispatch, applyScroll]);

  return (
    <CSSTransition
      in={openfilterMenu}
      timeout={300}
      unmountOnExit
      classNames="modal-menu"
      nodeRef={asideRef}
    >
      <div className="w-full h-screen bg-black/50 fixed top-0 left-0 z-50 min-[1025px]:hidden">
        <aside
          className="bg-white w-[40%] max-md:w-[100%] fixed left-0 top-0 z-50 overflow-auto h-full"
          ref={asideRef}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setOpenCustomList(""));
          }}
        >
          <div
            className="flex justify-center items-center border-b border-[#ECEDF2] py-[15px] cursor-pointer"
            onClick={() => dispatch(openFilterMenu(false))}
          >
            <IoCloseOutline size={24} color="e44343" />
            <span className="text-[#e44343] font-medium text-sm">Kapat</span>
          </div>

          <CustomList
            title="Çalışma Şekli"
            options={JOB_TYPES}
            defaultValue="Çalışma Şekli"
            setState={selectJobType}
            state={jobType}
            listWrapperClass="px-[30px] pt-[30px]"
            screenClass="border !border-[#ECEDF2]"
            openCustomList={openCustomList}
            setOpenCustomList={setOpenCustomList}
          />

          <FilterSwitch
            title="Deneyim Süresi"
            state={experienceLevel}
            setState={selectExperienceLevel}
            switchItems={EXPERIENCE_LEVELS}
            extraSwitch={true}
            extraSwitchText="5+ Yıl"
            switchWrapperClass="px-[30px]"
          />

          <FilterSwitch
            title="Pozisyon Seviyesi"
            state={careerLevel}
            setState={selectCareerLevel}
            switchItems={CAREER_LEVELS}
            switchWrapperClass="px-[30px]"
          />

          <div className="sticky bottom-0 w-full left-0 bg-white p-[30px] rounded-bl-lg rounded-br-lg">
            <CustomButton
              isSubmitting={isLoading}
              text="Uygula"
              className="w-full !rounded-lg"
              handleClick={handleFilter}
            />
          </div>
        </aside>
      </div>
    </CSSTransition>
  );
};

export default FilterMenuMobile;
