import React from "react";
import SearchJob from "@/components/SearchJob";

import FilterMenu from "@/components/pages/jobPostings/filterMenu/FilterMenu";

const JobAdverts = () => {
  return (
    <main className="mt-[79.43px]">
      <section className="py-[85px] bg-[#F4F5FA]">
        <SearchJob
          formClass="!rounded-lg !w-[1290px] max-[1380px]:!w-[95%] drop-shadow-xl"
          jobInputPlaceholder="Meslek ara"
          buttonClass="!bg-[#4045ef] hover:!bg-transparent hover:!text-[#4045ef] !border-[#4045ef] !rounded-lg"
        />
      </section>

      <section className="container flex gap-[30px] my-[50px]">
        <FilterMenu />

        <div className="bg-blue-300 flex-[calc(67.2%+1px)]">İş ilanları</div>
      </section>
    </main>
  );
};

export default JobAdverts;
