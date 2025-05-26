import FavoriteCompany from "@/components/FavoriteCompany";
import { JOB_TYPES } from "@/constants/filtersJob";
import {
  selectCareerLevel,
  selectFiltersItem,
  selectJobType,
} from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { normalize, routeFormatter } from "@/lib/routeFormat";
import { EmployerOpenJobs } from "@/types";
import { JobCompanyInformations } from "@/types/filtersJob";
import { UnknownAction } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SlLocationPin } from "react-icons/sl";
import { VscBriefcase } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

const JobItem = ({
  job,
}: {
  job: JobCompanyInformations & EmployerOpenJobs;
}) => {
  const { careerLevel, filtersItem } = useSelector(
    (state: RootState) => state.jobFilters
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleAction = (
    text: string,
    addState: UnknownAction,
    removeState?: UnknownAction
  ): void => {
    if (!filtersItem.includes(text)) {
      dispatch(addState);
      dispatch(selectFiltersItem([...filtersItem, text]));
    } else {
      if (removeState) dispatch(removeState);
      dispatch(selectFiltersItem(filtersItem.filter((item) => item !== text)));
    }
  };

  const handleJobTypeBadge = () => {
    const isIncludes = filtersItem.includes(job.modeOfWork);
    const filtredJobs = filtersItem.filter((fi) => !JOB_TYPES.includes(fi));

    const updatedFilters = isIncludes
      ? filtredJobs
      : [...filtredJobs, job.modeOfWork];

    dispatch(selectFiltersItem(updatedFilters));
    dispatch(selectJobType(isIncludes ? "" : job.modeOfWork));
  };

  return (
    <article
      key={job.postId}
      className="p-[30px] mb-[30px] border border-[#ECEDF2] rounded-lg hover:shadow-[0_6px_15px_0_rgba(64,79,104,0.05)] transition-shadow duration-300 relative group"
    >
      <FavoriteCompany job={job} />

      <div className="flex">
        <figure>
          <Image
            src={job.companyInformations.companyLogo}
            alt={job.companyInformations.companyName}
            width={50}
            height={50}
            className="rounded-lg"
          />
        </figure>

        <div className="px-5">
          <div className="flex items-center">
            <Link
              href={`/is-ilani/${routeFormatter(job.jobTitle)}-${job.postId}`}
            >
              <h2 className="text-[#202124] hover:text-[#1967d2] transition-colors duration-300 text-lg font-medium">
                {job.jobTitle}
              </h2>
            </Link>

            <span className="ms-[5px] text-[#34a853] text-[13px]">
              {job.companyInformations.featured ? "Öne çıkan" : ""}
            </span>
          </div>

          <div className="flex gap-[25px] mt-[5px]">
            <Link
              href={`/is-ilanlari?${new URLSearchParams({
                meslek: `${normalize(job.category).toLowerCase()}`,
              })}`}
              className="flex items-center text-[#696969] hover:text-[#202124] text-sm transition-colors duration-300"
            >
              <VscBriefcase className="me-[5px]" size={20} />
              {job.category}
            </Link>
            <Link
              href={`/is-ilanlari?${new URLSearchParams({
                konum: `${routeFormatter(job.location)}`,
              })}`}
              className="flex items-center text-[#696969] hover:text-[#202124] text-sm transition-colors duration-300"
            >
              <SlLocationPin className="me-[5px]" size={18} />
              {job.location}
            </Link>
          </div>

          <div className="mt-3">
            <span
              className="me-[15px] featured-job-list-item bg-[#1967d2] border-none !text-white cursor-pointer"
              onClick={handleJobTypeBadge}
            >
              {job.modeOfWork}
            </span>
            <span
              className="featured-job-list-item bg-[#FEF2D9] border-none !text-[#F9AB00] cursor-pointer"
              onClick={() =>
                handleAction(
                  job.positionLevel,
                  selectCareerLevel([...careerLevel, job.positionLevel]),
                  selectCareerLevel(
                    careerLevel.filter((level) => level !== job.positionLevel)
                  )
                )
              }
            >
              {job.positionLevel}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobItem;
