import { ChangeEvent } from "react";
import { fetchData } from "./fetchData";

type matchedDataType<T> = {
  city_id: T;
  plate_code: T;
};

type handleSelectFuncReturnType<T> = Promise<{ matchedData: T }>;

export const handleSelect = async (
  e: ChangeEvent<HTMLSelectElement>,
  url: string
): handleSelectFuncReturnType<object[]> => {
  const selectedIndex = e.target.selectedIndex;
  const { data }: { data: [] } = await fetchData(url);

  const matchedData = data.filter(
    (data: matchedDataType<string>) =>
      Number(data.city_id || data.plate_code) === selectedIndex
  );

  return { matchedData };
};

export const setSelectedData = async (
  e: ChangeEvent<HTMLSelectElement>,
  url: string,
  setData: (data: []) => void
) => {
  const { matchedData } = await handleSelect(e, url);
  setData(matchedData as []);
};
