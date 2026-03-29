import React from "react";
import DownloadButton from "../../applicationModal/modalBody/resume/resumeItem/DownloadButton";
import { FaRegFileAlt } from "react-icons/fa";

const SubmittedResume = ({
  fileUrl,
  fileName,
}: {
  fileUrl: string;
  fileName: string;
}) => {
  return (
    <DownloadButton
      isView={true}
      fileName={fileName}
      url={fileUrl}
      className="h-max w-max mt-2.5 max-lg:mt-6"
      isViewClassName="flex items-center gap-x-1 text-[#4045ef] sm:hover:underline text-sm font-medium"
      isViewContent={
        <>
          <FaRegFileAlt size={16} strokeWidth={5} />
          <span className="whitespace-nowrap">Gönderilen özgeçmiş</span>
        </>
      }
    />
  );
};

export default SubmittedResume;
