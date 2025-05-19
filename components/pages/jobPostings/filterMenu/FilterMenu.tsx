"use client";

import React from "react";
import JobType from "./JobType";
import FilterSwitch from "./filterSwitch/FilterSwitch";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  selectCareerLevel,
  selectExperienceLevel,
} from "@/lib/redux/features/filterJobs/filters";
import {
  CAREER_LEVELS,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
} from "@/constants/filtersJob";

const FilterMenu = () => {
  const { experienceLevel, careerLevel } = useSelector(
    (state: RootState) => state.filtersJob
  );

  return (
    <aside className="bg-[#F5F7FC] p-[30px] rounded-lg flex-[calc(32.8%-1px)]">
      <JobType title="Çalışma Şekli" options={JOB_TYPES} />

      <FilterSwitch
        title="Deneyim Süresi"
        state={experienceLevel}
        setState={selectExperienceLevel}
        switchItems={EXPERIENCE_LEVELS}
        extraSwitch={true}
        extraSwitchText="5 Yıl"
      />

      <FilterSwitch
        title="Pozisyon Seviyesi"
        state={careerLevel}
        setState={selectCareerLevel}
        switchItems={CAREER_LEVELS}
      />
    </aside>
  );
};

export default FilterMenu;
