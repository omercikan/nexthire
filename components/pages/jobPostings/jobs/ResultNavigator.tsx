import React from "react";
import CustomList from "../filterMenu/CustomList";
import {
  selectPageValue,
  selectSortValue,
} from "@/lib/redux/features/filterJobs/filters";
import { RootState } from "@/lib/redux/store";
import { useSelector } from "react-redux";

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
  const { touch } = useSelector((state: RootState) => state.touch);

  return (
    <div className="mb-[30px] flex gap-5 justify-between items-center">
      <div>
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

      <div className="flex gap-5">
        <div className={touch ? "-z-[1]" : "z-[1]"}>
          <CustomList
            options={["Sıralama (Varsayılan)", "En yeni", "En eski"]}
            setState={selectSortValue}
            state={sortValue}
            defaultValue="Sıralama (Varsayılan)"
            screenClass="!bg-[#f0f5f7] !w-[222.45px]"
            listClass="!w-[222.45px]"
          />
        </div>

        <div className={touch ? "-z-[1]" : "z-[1]"}>
          <CustomList
            options={["Sayfa Başına 10", "Tümü"]}
            setState={selectPageValue}
            state={pageValue}
            defaultValue="Sayfa Başına 10"
            screenClass="!bg-[#f0f5f7] !w-[190.44px]"
            listClass="!w-[190.44px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultNavigator;
