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
  const { sortValue, pageValue } = useSelector(
    (state: RootState) => state.jobFilters
  );
  const { touch } = useSelector((state: RootState) => state.touch);

  return (
    <div className="mb-[30px] flex gap-5 justify-between items-center">
      <div>
        <p className="whitespace-nowrap">
          {pageValue === "Tümü"
            ? `Toplam ${searchedDataLength} sonuç gösteriliyor`
            : `${searchedDataLength} sonuçtan 1 - 10 gösteriliyor`}
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
