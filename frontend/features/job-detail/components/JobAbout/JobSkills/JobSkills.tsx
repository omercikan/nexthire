import { CAREER_LEVELS, JOB_TYPES } from "@/shared/constants/filtersJob";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";
import useScroll from "@/shared/hooks/useScroll";
import {
  clearAllFilters,
  selectCareerLevel,
  selectExperienceLevel,
  selectFiltersItem,
  selectJobKeyword,
  selectJobType,
} from "@/shared/redux/slices/filtersValues";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const JobSkills = ({ skills }: { skills: string[] }) => {
  const { handleFilter } = useJobFilter();
  const dispatch = useDispatch();
  const router = useRouter();
  const { applyScroll } = useScroll();

  const handleItemFilter = (text: string) => {
    const isIncludesExperience = text.includes("Yıl");

    const isFindCareerLevel = CAREER_LEVELS.find((val) =>
      text.includes(val.itemText),
    )?.itemText;

    console.log(text)

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

    handleFilter();
    router.push("/is-ilanlari");
    dispatch(selectFiltersItem([text]));
    setTimeout(() => applyScroll(640, 474.57, 386.63), 400);
  };

  return (
    <div className="mt-7.5 bg-[#f5f7fc] p-7.5 max-[992px]:p-5 rounded-lg">
      <h2 className="text-lg text-[#202124] font-medium mb-4.5">
        Pozisyon Bilgileri
      </h2>

      <ul className="flex flex-wrap gap-1.5">
        {skills.map((val, i) => (
          <li
            key={i}
            className="bg-white hover:bg-black text-[#696969] hover:text-white transition-colors duration-500 py-0.75 px-5 rounded-sm text-sm cursor-pointer"
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
