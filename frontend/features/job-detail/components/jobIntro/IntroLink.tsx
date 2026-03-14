"use client";

import { JOB_TYPES } from "@/shared/constants/filtersJob";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";
import useItemFilterText from "@/shared/hooks/useItemFilterText";
import useScroll from "@/shared/hooks/useScroll";
import {
  clearAllFilters,
  selectCareerLevel,
  selectFiltersItem,
  selectJobType,
} from "@/shared/redux/slices/filtersValues";
import { AppDispatch } from "@/shared/redux/store";
import Link from "next/link";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

const IntroLink = ({
  icon,
  link,
  wrapperClass,
  JobLocationFilterStatus,
}: {
  icon?: ReactNode;
  link: {
    text: string;
    href: string;
    linkClass?: string;
  }[];
  wrapperClass?: string;
  isLoading?: boolean;
  JobLocationFilterStatus?: {
    isApplyJob: boolean;
    isApplyLocation: boolean;
  };
}) => {
  const { applyItemFilter } = useItemFilterText();
  const { handleFilter: filterJob } = useJobFilter();
  const { applyScroll } = useScroll();
  const dispatch = useDispatch<AppDispatch>();

  const handleFilter = (text: string) => {
    if (
      Object.values(JobLocationFilterStatus as object).filter(Boolean).length
    ) {
      applyItemFilter(
        text.split(",")[0],
        JobLocationFilterStatus?.isApplyJob ?? false,
      );
    } else {
      const isIncludesJobTypes = JOB_TYPES.includes(text);

      dispatch(clearAllFilters());
      dispatch(
        isIncludesJobTypes ? selectJobType(text) : selectCareerLevel([text]),
      );
      dispatch(selectFiltersItem([text]));
      filterJob();
    }

    setTimeout(() => applyScroll(640, 474.57, 386.63), 350);
  };

  return (
    <>
      <div className={!wrapperClass ? "flex gap-1.25" : wrapperClass}>
        {icon}

        {link.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className={
              !item.linkClass
                ? "text-sm text-[#696969] hover:text-[#202124] transition-colors duration-300"
                : item.linkClass
            }
            onClick={() => handleFilter(item.text)}
          >
            {item.text}
          </Link>
        ))}
      </div>
    </>
  );
};

export default IntroLink;
