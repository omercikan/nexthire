import useJobFilter from "@/hooks/useJobFilter";
import {
  clearAllFilters,
  clearMatchFilter,
} from "@/lib/redux/features/filterJobs/filters";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterBar = () => {
  const { filtersItem } = useSelector((state: RootState) => state.jobFilters);
  const dispatch = useDispatch<AppDispatch>();
  const { filterJob } = useJobFilter();

  const handleClearFilterItem = (item: string) => {
    dispatch(clearMatchFilter(item));
    filterJob();
  };

  return (
    <>
      {filtersItem.length ? (
        <div className="mb-[30px]">
          <h3 className="text-[#202124] font-medium text-xl mb-[15px]">
            Seçili Filtreler ({filtersItem.length})
            <span
              className="text-[#4045ef] text-[13px] text-center ms-2 font-normal cursor-pointer"
              onClick={() => {
                dispatch(clearAllFilters());
                filterJob();
              }}
            >
              Filtreleri Temizle
            </span>
          </h3>

          <div className="flex justify-between items-center p-2.5 rounded-sm bg-[#F5F7FC]">
            <ul className="flex flex-wrap gap-2.5">
              {filtersItem.map((item, index) => (
                <li
                  key={index}
                  className="whitespace-nowrap py-1 px-[15px] bg-[#EAEFFA] text-[#696969] text-[13px] rounded-sm cursor-pointer hover:text-[#e44343] transition-colors duration-300 select-none"
                  onClick={() => handleClearFilterItem(item)}
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
