import React from "react";
import fileDownload from "js-file-download";
import { HiMiniArrowDownTray } from "react-icons/hi2";
import { fetchData } from "@/lib/fetchData";

const DownloadButton = ({
  url,
  fileName,
}: {
  url: string;
  fileName: string;
}) => {
  const handleDownloadPdf = async (url: string, fileName: string) => {
    const { data } = await fetchData<string>(url, { responseType: "blob" });
    fileDownload(data, fileName);
  };

  return (
    <button
      onClick={() => handleDownloadPdf(url, fileName)}
      rel="noopener noreferrer"
    >
      <HiMiniArrowDownTray
        size={40}
        color="#000000BF"
        cursor="pointer"
        className="hover:bg-[#8c8c8c1a] rounded-full p-2 transition-colors duration-300"
      />
    </button>
  );
};

export default DownloadButton;
