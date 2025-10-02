import { AuthCompoleteSearchFields } from "@/shared/types";
import { ChangeEvent } from "react";

export const handleSearchData = (
  e: ChangeEvent<HTMLInputElement>,
  data: AuthCompoleteSearchFields[],
  setData: (data: AuthCompoleteSearchFields[]) => void
) => {
  const value: string = e.target.value;

  setTimeout(() => {
    const filteredData = data.filter((keyword) =>
      keyword.title.toLowerCase().trim().includes(value.toLowerCase().trim())
    );

    if (filteredData) setData(filteredData);
    if (value.length == 0) setData([]);
  }, 100);
};
