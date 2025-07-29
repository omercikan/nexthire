import React from "react";
import ResumeItem from "../../resume/ResumeItem";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import SummaryContent from "../SummaryContent";

const SummaryResume = () => {
  const { selectedResumeFileName, applicationData, selectedResumeUploadTime } =
    useSelector((state: RootState) => state.applicationModalData);

  return (
    <SummaryContent
      contentTitle="Özgeçmiş"
      subTitle="Başvurunuzun değerlendirilebilmesi için güncel bir CV ekleyin*"
    >
      <div className="w-[342px] max-sm:w-auto mt-4">
        <ResumeItem
          resume={{
            fileName: selectedResumeFileName,
            uploadTime: selectedResumeUploadTime,
            url: applicationData.resume,
            createdAt: "",
            cvID: "",
            size: "",
          }}
          isDisplaySelect={false}
        />
      </div>
    </SummaryContent>
  );
};

export default SummaryResume;
