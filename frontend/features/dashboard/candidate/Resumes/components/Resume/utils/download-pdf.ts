import { fetchData } from "@/shared/utils/fetchData";
import fileDownload from "js-file-download";
import { MouseEvent } from "react";

export const handleDownloadPdf = async (
  e: MouseEvent,
  url: string,
  fileName: string
) => {
  e.stopPropagation();
  const { data } = await fetchData<string>(url, { responseType: "blob" });
  fileDownload(data, `${fileName}${!fileName.includes(".pdf") ? ".pdf" : ""}`);
};
