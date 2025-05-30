"use client";

import React from "react";
import CustomList from "./CustomList";
import FilterSwitch from "./filterSwitch/FilterSwitch";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  selectCareerLevel,
  selectExperienceLevel,
  selectJobType,
  setFilterData,
} from "@/lib/redux/features/filterJobs/filters";
import {
  CAREER_LEVELS,
  EXPERIENCE_LEVELS,
  JOB_TYPES,
} from "@/constants/filtersJob";
import CustomButton from "@/components/ui/CustomButton";
import useJobFilter from "@/hooks/useJobFilter";

const FilterMenu = () => {
  const {
    experienceLevel,
    careerLevel,
    jobType,
    filterData,
    sortValue,
    jobKeywords,
    locationKeywords,
  } = useSelector((state: RootState) => state.jobFilters);
  const { filterJob, isLoading } = useJobFilter();
  const dispatch = useDispatch();

  const handleFilter = () => {
    filterJob();
    dispatch(
      setFilterData({
        ...filterData,
        isFilter:
          experienceLevel.length ||
          careerLevel.length ||
          jobType.length ||
          sortValue.length ||
          jobKeywords.length ||
          locationKeywords.length
            ? true
            : false,
      })
    );
  };

  return (
    <aside className="bg-[#F5F7FC] rounded-lg flex-[calc(32.8%-1px)]">
      <CustomList
        title="Çalışma Şekli"
        options={JOB_TYPES}
        defaultValue="Çalışma Şekli"
        setState={selectJobType}
        state={jobType}
        listWrapperClass="px-[30px] pt-[30px]"
      />

      <FilterSwitch
        title="Deneyim Süresi"
        state={experienceLevel}
        setState={selectExperienceLevel}
        switchItems={EXPERIENCE_LEVELS}
        extraSwitch={true}
        extraSwitchText="5 Yıl"
        switchWrapperClass="px-[30px]"
      />

      <FilterSwitch
        title="Pozisyon Seviyesi"
        state={careerLevel}
        setState={selectCareerLevel}
        switchItems={CAREER_LEVELS}
        switchWrapperClass="px-[30px]"
      />

      <div className="sticky bottom-0 bg-[#F5F7FC] p-[30px] rounded-bl-lg rounded-br-lg">
        <CustomButton
          isSubmitting={isLoading}
          text="Uygula"
          className="w-full !rounded-lg"
          handleClick={handleFilter}
        />
      </div>
    </aside>
  );
};

export default FilterMenu;
