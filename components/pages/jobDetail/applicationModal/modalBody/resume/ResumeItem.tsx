import React from "react";
import { CVDataFields } from "@/types/resume";
import ResumeContent from "./resumeItem/ResumeContent";
import DownloadButton from "./resumeItem/DownloadButton";
import RadioButton from "./resumeItem/RadioButton";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import useSelectResume from "@/hooks/useSelectResume";

const ResumeItem = ({
  resume: { fileName, size, uploadTime, url, cvID },
}: {
  resume: CVDataFields;
}) => {
  const { selectedResume, placeholderUploadData } = useSelector(
    (state: RootState) => state.applicationModalData
  );
  const isMatchResumeID = selectedResume === cvID;
  const [setSelectedResumeData] = useSelectResume();

  const handleSelectResume = () => {
    if (!isMatchResumeID || placeholderUploadData.fileName.length) {
      setSelectedResumeData("", url, cvID);
    } else {
      setSelectedResumeData("Lütfen bir özgeçmiş seçin", "", "0");
    }
  };

  return (
    <li
      className={`flex border ${
        isMatchResumeID ? "border-[#4045ef]" : "border-[#E8E8E8]"
      } rounded-[12.8px] cursor-pointer mb-3`}
      onClick={handleSelectResume}
    >
      <div className="bg-[#cb112d] grid place-content-center w-[44px] h-auto rounded-s-[12.8px]">
        <span className="text-white text-sm font-medium">PDF</span>
      </div>

      <div className="py-3 px-2 flex items-center justify-between w-[calc(100%-44px)] hover:bg-[#f8fafd] rounded-e-[12.8px] transition-colors">
        <ResumeContent
          fileName={fileName}
          size={size}
          uploadTime={uploadTime}
        />

        <div className="flex items-center gap-3 pe-1.5">
          <DownloadButton fileName={fileName} url={url} />

          <span className="w-[0.5px] bg-[#E8E8E8] h-[40px] inline-block mx-1"></span>

          <RadioButton isMatchResumeID={isMatchResumeID} />
        </div>
      </div>
    </li>
  );
};

export default ResumeItem;
