import FavoriteCompany from "@/components/FavoriteCompany";
import useJobFilter from "@/hooks/useJobFilter";
import useScroll from "@/hooks/useScroll";
import {
  selectCareerLevel,
  selectFiltersItem,
  selectJobKeyword,
  selectJobType,
  selectLocationKeyword,
} from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { routeFormatter } from "@/lib/routeFormat";
import { EmployerOpenJobs } from "@/types";
import { FavoriteField } from "@/types/favorite";
import { JobCompanyInformations } from "@/types/filtersJob";
import { UnknownAction } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback } from "react";
import { SlLocationPin } from "react-icons/sl";
import { VscBriefcase } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";

const JobItem = ({
  job,
}: {
  job: JobCompanyInformations & EmployerOpenJobs;
}) => {
  const { careerLevel, filtersItem, jobKeywords, locationKeywords } =
    useSelector((state: RootState) => state.jobFilters);
  const dispatch = useDispatch<AppDispatch>();
  const { filterJob } = useJobFilter();
  const { applyScroll } = useScroll();

  const handleAction = useCallback(
    (text: string, addState: UnknownAction, removeState?: UnknownAction) => {
      const isIncludesText = filtersItem.includes(text);
      const updatedFilters = isIncludesText
        ? filtersItem.filter((item) => item !== text)
        : [...filtersItem, text];

      dispatch(selectFiltersItem(updatedFilters));
      if (isIncludesText && removeState) {
        dispatch(removeState);
      } else {
        dispatch(addState);
      }

      filterJob();
      applyScroll(640, 474.57, 386.63);
    },
    [applyScroll, dispatch, filterJob, filtersItem]
  );

  return (
    <article
      key={job.postId}
      className="p-[30px] max-[1200px]:p-[15px] mb-[30px] border border-[#ECEDF2] rounded-lg hover:shadow-[0_6px_15px_0_rgba(64,79,104,0.05)] transition-shadow duration-300 relative group"
    >
      <FavoriteCompany
        data={{
          dataField: {
            companyEID: job?.postId,
            companyLocation: job?.companyInformations?.location,
            numberOfEmployees: job?.companyInformations?.numberOfEmployees,
            companyLogo: job?.companyInformations?.companyLogo,
            companyName: job?.companyInformations?.companyName,
          },
          eid: job?.postId,
        }}
        fieldName={FavoriteField.Jobs}
        extraField={job.jobTitle}
      />

      <div className="flex max-[450px]:flex-col max-[450px]:justify-center max-[450px]:text-center">
        <figure className="h-max max-[450px]:mb-4">
          <Image
            src={job.companyInformations.companyLogo}
            alt={job.companyInformations.companyName}
            width={50}
            height={50}
            className="rounded-lg max-[450px]:mx-auto"
          />
        </figure>

        <div className="px-5">
          <div className="flex items-center max-[450px]:justify-center max-[450px]:flex-col-reverse">
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

          <div className="flex flex-wrap gap-[25px] max-[450px]:gap-2 mt-[5px] max-[450px]:mt-2 max-[450px]:justify-center">
            <span
              onClick={(e) => {
                e.preventDefault();
                handleAction(
                  job.category,
                  selectJobKeyword([...jobKeywords, job.category]),
                  selectJobKeyword(
                    jobKeywords.filter((jk) => jk !== job.category)
                  )
                );
              }}
              className="flex items-center text-[#696969] hover:text-[#202124] text-sm transition-colors duration-300 cursor-pointer"
            >
              <VscBriefcase className="me-[5px]" size={20} />
              {job.category}
            </span>
            <span
              onClick={(e) => {
                e.preventDefault();
                handleAction(
                  job.location,
                  selectLocationKeyword([...locationKeywords, job.location]),
                  selectLocationKeyword(
                    locationKeywords.filter((lk) => lk !== job.location)
                  )
                );
              }}
              className="flex items-center text-[#696969] hover:text-[#202124] text-sm transition-colors duration-300 cursor-pointer"
            >
              <SlLocationPin className="me-[5px]" size={18} />
              {job.location}
            </span>
          </div>

          <div className="mt-3 flex max-[430px]:flex-col gap-x-[15px] gap-y-2 max-[450px]:justify-center">
            <span
              className="featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#1967d2] border-none !text-white cursor-pointer"
              onClick={() =>
                handleAction(
                  job.modeOfWork,
                  selectJobType(job.modeOfWork),
                  selectJobType("")
                )
              }
            >
              {job.modeOfWork}
            </span>
            <span
              className="featured-job-list-item max-[450px]:flex-[1] whitespace-nowrap bg-[#FEF2D9] border-none !text-[#F9AB00] cursor-pointer"
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
