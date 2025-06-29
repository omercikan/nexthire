"use client";

import LoaderSkeleton from "@/components/ui/LoaderSkeleton";
import { JOB_TYPES } from "@/constants/filtersJob";
import useItemFilterText from "@/hooks/useItemFilterText";
import useJobFilter from "@/hooks/useJobFilter";
import useScroll from "@/hooks/useScroll";
import {
  clearAllFilters,
  selectCareerLevel,
  selectFiltersItem,
  selectJobType,
} from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch } from "@/lib/redux/store";
import { Typography } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";

const IntroLink = ({
  icon,
  link,
  wrapperClass,
  isLoading,
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
  const { filterJob } = useJobFilter();
  const { applyScroll } = useScroll();
  const dispatch = useDispatch<AppDispatch>();

  const handleFilter = (text: string) => {
    if (
      Object.values(JobLocationFilterStatus as object).filter(Boolean).length
    ) {
      applyItemFilter(
        text.split(",")[0],
        JobLocationFilterStatus?.isApplyJob ?? false,
        JobLocationFilterStatus?.isApplyLocation ?? false
      );
    } else {
      const isIncludesJobTypes = JOB_TYPES.includes(text);

      dispatch(clearAllFilters());
      dispatch(
        isIncludesJobTypes ? selectJobType(text) : selectCareerLevel([text])
      );
      dispatch(selectFiltersItem([text]));
      filterJob();
    }

    setTimeout(() => applyScroll(640, 474.57, 386.63), 350);
  };

  return (
    <>
      {isLoading ? (
        <Typography variant="body1">
          <LoaderSkeleton
            animationType="wave"
            length={1}
            variant="text"
            sxClass={{
              borderRadius: "4px",
              height: "25px",
              width: "100px",
            }}
            className="max-lg:mx-auto"
          />
        </Typography>
      ) : (
        <div className={!wrapperClass ? "flex gap-[5px]" : wrapperClass}>
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
      )}
    </>
  );
};

export default IntroLink;
