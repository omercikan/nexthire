import { RootState } from "@/shared/redux/store";
import { useSelector } from "react-redux";
import { setOpenCustomList } from "@/shared/redux/slices/touch";
import CustomList from "./CustomList";
import { setFilters } from "@/shared/redux/slices/filtersData";

const ResultNavigator = ({ dataLength }: { dataLength: number }) => {
  const {
    filtersItem,
    filterData: { data },
  } = useSelector((state: RootState) => state.jobFilters);
  const { currentPage } = useSelector(
    (state: RootState) => state.paginationSlice,
  );
  const { sort, perPage } = useSelector(
    (state: RootState) => state.filtersSlice,
  );
  const { touch, touchSortList, openCustomList } = useSelector(
    (state: RootState) => state.touch,
  );

  const hasAnyJobs = filtersItem.length || dataLength;

  return (
    <>
      {hasAnyJobs && (
        <div className="mb-[30px] flex max-md:flex-wrap gap-5 justify-between items-center max-md:w-full">
          <div className="max-md:mt-5">
            <p className="whitespace-nowrap">
              {filtersItem.length
                ? `Seçili ${filtersItem.length} filtreden ${data.length} ilan gösteriliyor`
                : `${dataLength} ilandan ${
                    currentPage === 1
                      ? "1 - 10"
                      : `${currentPage * 10 - 10} - ${currentPage * 10}`
                  } gösteriliyor`}
            </p>
          </div>

          <div className="flex max-sm:flex-col gap-x-5 gap-y-3  max-md:w-full">
            <div className={`${touch ? "-z-[1]" : "z-[1]"} max-md:flex-[1]`}>
              <CustomList
                options={["Sıralama (Varsayılan)", "En Yeni", "En Eski"]}
                setState={(e) => setFilters({ sort: e })}
                state={sort}
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
                setState={(value) => setFilters({ perPage: value })}
                state={perPage}
                defaultValue="Sayfa Başına 10"
                screenClass="!bg-[#f0f5f7] !w-[190.44px] max-md:!w-full"
                listClass="!w-[190.44px] max-md:!w-full"
                openCustomList={openCustomList}
                setOpenCustomList={setOpenCustomList}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultNavigator;
