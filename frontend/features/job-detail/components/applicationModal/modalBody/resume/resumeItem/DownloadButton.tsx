import React, { MouseEvent, ReactNode } from "react";
import fileDownload from "js-file-download";
import { HiMiniArrowDownTray } from "react-icons/hi2";
import { fetchData } from "@/shared/utils/fetchData";
import { useResume } from "../uploadResume/resumeContext";

interface DownloadButtonProps {
  fileID: string;
  isView: boolean;
  className?: string;
  isViewContent?: ReactNode;
  isViewClassName?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  fileID,
  isView,
  className,
  isViewContent,
  isViewClassName,
}) => {
  const { resumes } = useResume();

  const handleDownloadPdf = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const findDownloadResume = resumes.find((resume) => resume._id === fileID);

    if (!findDownloadResume) return;

    const fileUrl =
      findDownloadResume?.fileUrl ??
      URL.createObjectURL(findDownloadResume as File);

    const { data } = await fetchData<string>(fileUrl, {
      responseType: "blob",
    });
    fileDownload(data, String(findDownloadResume.name));
  };

  return (
    <button
      onClick={(e) => handleDownloadPdf(e)}
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
