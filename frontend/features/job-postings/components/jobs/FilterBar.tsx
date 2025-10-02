import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";
import useScroll from "@/shared/hooks/useScroll";
import { clearAllFilters, clearMatchFilter, openFilterMenu } from "@/shared/redux/slices/filters";
import { AppDispatch, RootState } from "@/shared/redux/store";
import React, { useCallback } from "react";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";

const FilterBar = () => {
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);
  const dispatch = useDispatch<AppDispatch>();
  const { filterJob } = useJobFilter();
  const { applyScroll } = useScroll();

  const handleClearFilter = useCallback(
    <T extends { payload?: string; type: string }>(action: T) => {
      dispatch(action);
      filterJob();
      applyScroll(640, 474.57, 386.63);
    },
    [applyScroll, dispatch, filterJob]
  );

  return (
    <>
      {filtersItem.length ? (
        <div className="mb-[30px] max-sm:mb-[15px] max-[1025px]:mt-5 max-sm:fixed max-sm:top-[59px] max-sm:left-0 max-sm:w-full max-sm:p-4 max-sm:bg-white max-sm:z-30">
          <div className="flex justify-between items-center max-[460px]:flex-col-reverse max-[460px]:items-start">
            <h3 className="text-[#202124] font-medium text-xl mb-[15px] max-[460px]:mt-[15px]">
              Seçili Filtreler ({filtersItem.length})
              <span
                className="text-[#4045ef] text-[13px] text-center ms-2 font-normal cursor-pointer"
                onClick={() =>
                  handleClearFilter<{
                    payload: undefined;
                    type: "filterJobs/clearAllFilters";
                  }>(clearAllFilters())
                }
              >
                Filtreleri Temizle
              </span>
            </h3>

            <div
              className="flex gap-2 items-center cursor-pointer group w-max min-[1025px]:hidden"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(openFilterMenu(true));
              }}
            >
              <TbAdjustmentsHorizontal size={20} color="1967d2" />
              <span className="text-[#1967d2] font-bold text-sm group-hover:underline">
                Filtreleri Göster
              </span>
            </div>
          </div>

          <div className="p-2.5 rounded-sm bg-[#F5F7FC] overflow-x-auto scrollbar-thin">
            <ul className="flex w-[500px] gap-2.5">
              {filtersItem.map((item, index) => (
                <li
                  key={index}
                  className="whitespace-nowrap py-1 px-[15px] bg-[#EAEFFA] text-[#696969] text-[13px] rounded-sm cursor-pointer hover:text-[#e44343] transition-colors duration-300 select-none"
                  onClick={() =>
                    handleClearFilter<{
                      payload: string;
                      type: "filterJobs/clearMatchFilter";
                    }>(clearMatchFilter(item))
                  }
                >
                  <span className="me-1.5 text-[#e44343]">x</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterBar;
