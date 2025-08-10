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
  isDisplaySelect = true,
}: {
  resume: CVDataFields;
  isDisplaySelect?: boolean;
}) => {
  const { selectedResume, placeholderUploadData } = useSelector(
    (state: RootState) => state.applicationModalData
  );
  const isMatchResumeID = selectedResume === cvID;
  const [setSelectedResumeData] = useSelectResume();

  const handleSelectResume = () => {
    if (isDisplaySelect) {
      if (!isMatchResumeID || placeholderUploadData.fileName.length) {
        setSelectedResumeData("", url, cvID, fileName, uploadTime);
      } else {
        setSelectedResumeData("Lütfen bir özgeçmiş seçin", "", "0");
      }
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

      <div
        className={`${
          isDisplaySelect ? "sm:hover:bg-[#f8fafd] py-3 px-2" : "ps-2"
        } flex items-center justify-between w-[calc(100%-44px)] rounded-e-[12.8px] transition-colors`}
      >
        <ResumeContent
          fileName={fileName}
          size={size}
          uploadTime={uploadTime}
        />

        {isDisplaySelect ? (
          <div className="flex items-center gap-x-3 max-[425px]:gap-x-0 pe-1.5">
            <DownloadButton fileName={fileName} url={url} isView={false} />

            <span className="w-[0.5px] bg-[#E8E8E8] h-[40px] inline-block me-1 max-[430px]:me-3 max-[430px]:ms-1"></span>

            <RadioButton isMatchResumeID={isMatchResumeID} />
          </div>
        ) : (
          <DownloadButton
            fileName={fileName}
            url={url}
            isView={true}
            className="h-full py-5 px-5 ms-6 border-s border-s-[#E8E8E8] hover:bg-[#F3F3F3] rounded-e-[12.8px] transition-colors duration-300"
          />
        )}
      </div>
    </li>
  );
};

export default ResumeItem;
