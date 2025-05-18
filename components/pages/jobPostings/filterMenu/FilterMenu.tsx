"use client";

import React from "react";
import JobType from "./JobType";
import FilterSwitch from "./FilterSwitch";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import {
  selectCareerLevel,
  selectExperienceLevel,
} from "@/lib/redux/features/filterJobs/filters";

const FilterMenu = () => {
  const { experienceLevel, careerLevel } = useSelector(
    (state: RootState) => state.filtersJob
  );

  return (
    <aside className="bg-[#F5F7FC] p-[30px] rounded-lg flex-[calc(32.8%-1px)]">
      <JobType
        title="Çalışma Şekli"
        options={[
          "Hibrit",
          "Stajyer",
          "Freelance",
          "İş Yerinde",
          "Tam Zamanlı",
          "Yarı Zamanlı",
          "Uzaktan / Remote",
        ]}
      />

      <FilterSwitch
        title="Deneyim Süresi"
        state={experienceLevel}
        setState={selectExperienceLevel}
        switchItems={[
          { itemText: "Deneyimli" },
          { itemText: "Deneyimsiz" },
          { itemText: "1 Yıl" },
          { itemText: "2 Yıl" },
          { itemText: "3 Yıl" },
          { itemText: "4 Yıl" },
        ]}
      />

      <FilterSwitch
        title="Pozisyon Seviyesi"
        state={careerLevel}
        setState={selectCareerLevel}
        switchItems={[
          { itemText: "Uzman" },
          { itemText: "Kıdemli Uzman" },
          { itemText: "Uzman Yardımcısı" },
          { itemText: "Stajyer" },
          { itemText: "Yeni Mezun" },
          { itemText: "Takım Lideri" },
          { itemText: "Kıdemli Yönetici" },
          { itemText: "Müdür" },
          { itemText: "Genel Müdür" },
          { itemText: "Genel Müdür Yardımcısı" },
        ]}
      />
    </aside>
  );
};

export default FilterMenu;
