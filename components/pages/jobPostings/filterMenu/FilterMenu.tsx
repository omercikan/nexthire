import React from "react";
import JobType from "./JobType";

const FilterMenu = () => {
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
    </aside>
  );
};

export default FilterMenu;
