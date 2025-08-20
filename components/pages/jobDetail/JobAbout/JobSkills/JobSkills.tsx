import { CAREER_LEVELS, JOB_TYPES } from "@/constants/filtersJob";
import useJobFilter from "@/hooks/useJobFilter";
import useScroll from "@/hooks/useScroll";
import {
  clearAllFilters,
  selectCareerLevel,
  selectExperienceLevel,
  selectFiltersItem,
  selectJobKeyword,
  selectJobType,
} from "@/lib/redux/features/filterJobs/filters";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const JobSkills = ({ skills }: { skills: string[] }) => {
  const { filterJob } = useJobFilter();
  const dispatch = useDispatch();
  const router = useRouter();
  const { applyScroll } = useScroll();

  const handleItemFilter = (text: string) => {
    const isIncludesExperience = text.includes("Yıl");

    const isFindCareerLevel = CAREER_LEVELS.find((val) =>
      text.includes(val.itemText)
    )?.itemText;

    const isFindJobType = JOB_TYPES.find((val) => text.includes(val));

    dispatch(clearAllFilters());

    if (isIncludesExperience) dispatch(selectExperienceLevel([text]));

    if (isFindJobType) dispatch(selectJobType(isFindJobType));

    if (isFindCareerLevel || text.includes("Düzey")) {
      dispatch(selectCareerLevel([text || (isFindCareerLevel as string)]));
    }

    if (!isFindCareerLevel && !isIncludesExperience) {
      dispatch(selectJobKeyword([text]));
    }

    filterJob();
    router.push("/is-ilanlari");
    dispatch(selectFiltersItem([text]));
    setTimeout(() => applyScroll(640, 474.57, 386.63), 400);
  };

  return (
    <div className="mt-[30px] bg-[#f5f7fc] p-[30px] max-[992px]:p-5 rounded-lg">
      <h2 className="text-lg text-[#202124] font-medium mb-[18px]">
        Pozisyon Bilgileri
      </h2>

      <ul className="flex flex-wrap gap-1.5">
        {skills.map((val, i) => (
          <li
            key={i}
            className="bg-white hover:bg-black text-[#696969] hover:text-white transition-colors duration-500 py-[3px] px-5 rounded-sm text-sm cursor-pointer"
            onClick={() => handleItemFilter(val)}
          >
            {val.includes("Yıl")
              ? `${val} Deneyim`
              : !JOB_TYPES.includes(val) && val}
            {JOB_TYPES.includes(val) ? `${val} Çalışma` : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobSkills;
