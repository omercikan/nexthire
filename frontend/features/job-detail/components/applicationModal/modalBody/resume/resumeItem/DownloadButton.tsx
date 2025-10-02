import React, { MouseEvent, ReactNode } from "react";
import fileDownload from "js-file-download";
import { HiMiniArrowDownTray } from "react-icons/hi2";
import { fetchData } from "@/shared/utils/fetchData";

const DownloadButton = ({
  url,
  fileName,
  isView,
  className,
  isViewContent,
  isViewClassName,
}: {
  url: string;
  fileName: string;
  isView: boolean;
  className?: string;
  isViewContent?: ReactNode;
  isViewClassName?: string;
}) => {
  const handleDownloadPdf = async (
    e: MouseEvent<HTMLButtonElement>,
    url: string,
    fileName: string
  ) => {
    e.stopPropagation();
    const { data } = await fetchData<string>(url, { responseType: "blob" });
    fileDownload(data, fileName);
  };

  return (
    <button
      onClick={(e) => handleDownloadPdf(e, url, fileName)}
      rel="noopener noreferrer"
      className={className ?? ""}
    >
      {isView ? (
        <span
          className={
            isViewClassName ?? "text-[#000000BF] text-sm font-semibold"
          }
        >
          {isViewContent ?? "Görüntüle"}
        </span>
      ) : (
        <HiMiniArrowDownTray
          size={40}
          color="#000000BF"
          cursor="pointer"
          className="hover:bg-[#8c8c8c1a] rounded-full p-2 transition-colors duration-300"
        />
      )}
    </button>
  );
};

export default DownloadButton;
