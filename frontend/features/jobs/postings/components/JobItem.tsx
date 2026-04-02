import useScroll from "@/shared/hooks/useScroll";
import { selectFiltersItem } from "@/shared/redux/slices/filtersValues";
import { AppDispatch, RootState } from "@/shared/redux/store";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import { SlLocationPin } from "react-icons/sl";
import { VscBriefcase } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import CompanyLogo from "@/public/assets/company.png";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";
import { setFilters } from "@/shared/redux/slices/filtersData";
import FavoriteItem from "@/features/jobs/postings/components/Favorite/FavoriteItem";
import useMultipleDispatch from "@/shared/hooks/useMultipleDispatch";
import { JobContextProvider } from "../../context/JobContext";
import { updateStep } from "@/features/job-detail/components/applicationModal/slices/modalControlSlice";

interface JobItemProps {
  _id: string;
  jobTitle: string;
  jobLocation: string;
  careerLevel: string;
  category: string;
  workType: string;
  employer: {
    _id: string;
    profilePhoto: string;
  };
}

const JobItem = ({
  job,
  favoriteData,
}: {
  job: JobItemProps;
  favoriteData: string[];
}) => {
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);
  const dispatch = useDispatch<AppDispatch>();
  const dispatchs = useMultipleDispatch();
  const { handleFilter } = useJobFilter();
  const { applyScroll } = useScroll();

  const handleFilterAction = useCallback(
    ({ key, value }: { key: string; value: string | string[] }) => {
      const isArrayValue = Array.isArray(value);
      const realValue = isArrayValue ? value[0] : value;

      if (!filtersItem.includes(realValue)) {
        dispatchs([
          selectFiltersItem([...filtersItem, realValue]),
          setFilters({ [key]: isArrayValue ? value : realValue }),
        ]);
      } else {
        dispatchs([
          selectFiltersItem(filtersItem.filter((fv) => realValue !== fv)),
          setFilters({ [key]: isArrayValue ? [] : "" }),
        ]);
      }

      handleFilter();
      applyScroll(640, 474.57, 386.63);
    },
    [dispatchs, applyScroll, handleFilter, filtersItem],
  );

  return (
    <article
      key={job._id}
      className="p-7.5 max-[1200px]:p-3.75 mb-7.5 border border-[#ECEDF2] rounded-lg hover:shadow-[0_6px_15px_0_rgba(64,79,104,0.05)] transition-shadow duration-300 relative group"
    >
      <JobContextProvider job={job}>
        <FavoriteItem isFavorite={favoriteData.includes(job._id)} />
      </JobContextProvider>

      <div className="flex max-[450px]:flex-col max-[450px]:justify-center max-[450px]:text-center">
        <figure className="h-max max-[450px]:mb-4">
          <Image
            src={job?.employer?.profilePhoto ?? CompanyLogo}
            alt={"asd"}
            width={50}
            height={50}
            className="rounded-lg max-[450px]:mx-auto"
          />
        </figure>

        <div className="px-5">
          <div className="flex items-center max-[450px]:justify-center max-[450px]:flex-col-reverse">
            <Link
              href={`is-ilani/${job._id}`}
              onClick={() => dispatch(updateStep(1))}
            >
              <h2 className="text-[#202124] hover:text-[#1967d2] transition-colors duration-300 text-lg font-medium">
                {job.jobTitle}
              </h2>
            </Link>

            {/* <span className="ms-[5px] text-[#34a853] text-[13px]">
              {job.companyInformations.featured ? "Öne çıkan" : ""}
            </span> */}
          </div>

          <div className="flex flex-wrap gap-6.25 max-[450px]:gap-2 mt-1.25 max-[450px]:mt-2 max-[450px]:justify-center">
            <span
              onClick={(e) => {
                e.preventDefault();
                handleFilterAction({ key: "jobTitle", value: job.category });
              }}
              className="flex items-center text-[#696969] hover:text-[#202124] text-sm transition-colors duration-300 cursor-pointer"
            >
              <VscBriefcase className="me-1.25" size={20} />
              {job.category}
            </span>

            <span
              onClick={(e) => {
                e.preventDefault();
                handleFilterAction({ key: "location", value: job.jobLocation });
              }}
              className="flex items-center text-[#696969] hover:text-[#202124] text-sm transition-colors duration-300 cursor-pointer"
            >
              <SlLocationPin className="me-1.25" size={18} />
              {job.jobLocation}
            </span>
          </div>

          <div className="mt-3 flex max-[430px]:flex-col gap-x-3.75 gap-y-2 max-[450px]:justify-center">
            <span
              className="featured-job-list-item max-[450px]:flex-1 whitespace-nowrap bg-[#1967d2] border-none text-white! cursor-pointer"
              onClick={() =>
                handleFilterAction({ key: "workType", value: job.workType })
              }
            >
              {job.workType}
            </span>
            <span
              className="featured-job-list-item max-[450px]:flex-1 whitespace-nowrap bg-[#FEF2D9] border-none text-[#F9AB00]! cursor-pointer"
              onClick={() =>
                handleFilterAction({
                  key: "careerLevel",
                  value: [job.careerLevel],
                })
              }
            >
              {job.careerLevel}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default JobItem;
