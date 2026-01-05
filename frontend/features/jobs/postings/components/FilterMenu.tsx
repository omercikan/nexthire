"use client";

import { useCallback, useEffect, useState } from "react";
import CustomList from "./CustomList";
import FilterSwitch from "./filterSwitch/FilterSwitch";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import CustomButton from "@/shared/components/ui/CustomButton";
import useScroll from "@/shared/hooks/useScroll";
import { setOpenCustomList } from "@/shared/redux/slices/touch";
import {
  CAREER_LEVELS,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
} from "@/shared/constants/filtersJob";
import { setFilters } from "@/shared/redux/slices/filtersData";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";

const FilterMenu = () => {
  const { experience, careerLevel, workType } = useSelector(
    (state: RootState) => state.filtersSlice
  );
  const { openCustomList } = useSelector((state: RootState) => state.touch);
  const { handleFilter: filterJob } = useJobFilter();
  const [isMobile, setIsMobile] = useState(false);
  const { applyScroll } = useScroll();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1025);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFilter = useCallback(() => {
    filterJob();

    setTimeout(() => {
      applyScroll(640, 474.57, 386.63);
    }, 10);
  }, [applyScroll, filterJob]);

  return (
    <>
      {!isMobile && (
        <aside className="bg-[#F5F7FC] rounded-lg flex-[calc(32.8%-1px)] h-max max-[1025px]:hidden">
          <CustomList
            title="Çalışma Şekli"
            options={JOB_TYPES}
            defaultValue="Çalışma Şekli"
            setState={(value) => setFilters({ workType: value })}
            state={workType}
            listWrapperClass="px-[30px] pt-[30px]"
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

          <div className="sticky bottom-0 bg-[#F5F7FC] p-[30px] rounded-bl-lg rounded-br-lg">
            <CustomButton
              isSubmitting={false}
              text="Uygula"
              className="w-full !rounded-lg"
              handleClick={handleFilter}
            />
          </div>
        </aside>
      )}
    </>
  );
};

export default FilterMenu;
