import React from "react";
import CustomList from "../filterMenu/CustomList";
import {
  selectPageValue,
  selectSortValue,
} from "@/lib/redux/features/filterJobs/filters";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";
import { setOpenCustomList } from "@/lib/redux/features/touch";

const ResultNavigator = ({
  searchedDataLength,
}: {
  searchedDataLength: number;
}) => {
  const {
    sortValue,
    pageValue,
    prevPageValue,
    nextPageValue,
    filtersItem,
    filterData: { countJobs, isFilter },
  } = useSelector((state: RootState) => state.jobFilters);
  const { touch, touchSortList, openCustomList } = useSelector(
    (state: RootState) => state.touch
  );

  return (
    <div className="mb-[30px] flex max-md:flex-wrap gap-5 justify-between items-center max-md:w-full">
      <div className="max-md:mt-5">
        <p className="whitespace-nowrap">
          {pageValue === "Tümü"
            ? countJobs !== 0
              ? `Toplam ${
                  countJobs > 0 ? countJobs : searchedDataLength
                } sonuç gösteriliyor`
              : `Seçili ${filtersItem?.length} filtreden ${countJobs} ilan gösteriliyor`
            : filtersItem.length > 0 && isFilter
            ? `Seçili ${filtersItem.length} filtreden ${countJobs} ilan gösteriliyor`
            : ` ${searchedDataLength} sonuçtan ${
                prevPageValue === 0 ? 1 : prevPageValue
              } - ${
                nextPageValue === 10 ? nextPageValue : countJobs
              } gösteriliyor`}
        </p>
      </div>

      <div className="flex max-sm:flex-col gap-x-5 gap-y-3  max-md:w-full">
        <div className={`${touch ? "-z-[1]" : "z-[1]"} max-md:flex-[1]`}>
          <CustomList
            options={["Sıralama (Varsayılan)", "En yeni", "En eski"]}
            setState={selectSortValue}
            state={sortValue}
            defaultValue="Sıralama (Varsayılan)"
            screenClass="!bg-[#f0f5f7] !w-[222.45px] max-md:!w-full"
            listClass="!w-[222.45px] max-md:!w-full"
            openCustomList={openCustomList}
            setOpenCustomList={setOpenCustomList}
          />
        </div>

        <div
          className={`${touch ? "-z-[1]" : "z-[1]"} max-md:flex-[1] ${
            touchSortList ? "max-[457px]:-z-[1]" : "max-[457px]:z-[1]"
          }`}
        >
          <CustomList
            options={touchSortList ? [] : ["Sayfa Başına 10", "Tümü"]}
            setState={selectPageValue}
            state={pageValue}
            defaultValue="Sayfa Başına 10"
            screenClass="!bg-[#f0f5f7] !w-[190.44px] max-md:!w-full"
            listClass="!w-[190.44px] max-md:!w-full"
            openCustomList={openCustomList}
            setOpenCustomList={setOpenCustomList}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultNavigator;
