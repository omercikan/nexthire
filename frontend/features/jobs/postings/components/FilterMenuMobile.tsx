"use client";

import { useCallback, useEffect, useRef } from "react";
import CustomList from "./CustomList";
import FilterSwitch from "./filterSwitch/FilterSwitch";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";
import CustomButton from "@/shared/components/ui/CustomButton";
import { IoCloseOutline } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import useScroll from "@/shared/hooks/useScroll";
import { openFilterMenu } from "@/shared/redux/slices/filtersValues";
import { setOpenCustomList } from "@/shared/redux/slices/touch";
import {
  CAREER_LEVELS,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
} from "@/shared/constants/filtersJob";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";
import { setFilters } from "@/shared/redux/slices/filtersData";

const FilterMenuMobile = () => {
  const {
    filtersSlice: { experience, careerLevel, workType },
    jobFilters: { openfilterMenu },
  } = useSelector((state: RootState) => state);
  const { handleFilter: filterJob } = useJobFilter();
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
  }, [dispatch, filterJob, applyScroll]);

  return (
    <CSSTransition
      in={openfilterMenu}
      timeout={300}
      unmountOnExit
      classNames="modal-menu"
      nodeRef={asideRef}
    >
      <div className="w-full h-screen bg-black/50 fixed top-0 left-0 z-[1002] min-[1025px]:hidden">
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
            setState={(value) => setFilters({ workType: value })}
            state={workType}
            listWrapperClass="px-[30px] pt-[30px]"
            screenClass="border !border-[#ECEDF2]"
            openCustomList={openCustomList}
            setOpenCustomList={setOpenCustomList}
          />

          <FilterSwitch
            title="Deneyim Süresi"
            state={experience}
            setState={(value) => setFilters({ experience: value })}
            switchItems={EXPERIENCE_LEVELS}
            extraSwitch={true}
            extraSwitchText="5+ Yıl"
            switchWrapperClass="px-[30px]"
          />

          <FilterSwitch
            title="Pozisyon Seviyesi"
            state={careerLevel}
            setState={(value) => setFilters({ careerLevel: value })}
            switchItems={CAREER_LEVELS}
            switchWrapperClass="px-[30px]"
          />

          <div className="sticky bottom-0 w-full left-0 bg-white p-[30px] rounded-bl-lg rounded-br-lg">
            <CustomButton
              isSubmitting={false}
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
