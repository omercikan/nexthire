import React, { useState } from "react";
import InformationMessage from "../../modalUI/InformationMessage";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ModalControls from "../../modalControls/ModalControls";
import ResumeInput from "./uploadResume/ResumeInput";
import ResumeLabel from "./uploadResume/ResumeLabel";

const UploadResume = () => {
  const { uploadedFileNames, resumeErrorMessage, selectedResume } = useSelector(
    (state: RootState) => state.applicationModalData
  );
  const [fileValue, setFileValue] = useState<string>("");
  const isResumeValid = !!uploadedFileNames.length && selectedResume !== "0";

  return (
    <div className="mt-2">
      <div className="px-6">
        <ResumeLabel />

        <span className="text-[#00000099] text-sm block mt-1.5">
          PDF (3 MB)
        </span>

        <ResumeInput setFileValue={setFileValue} />
      </div>

      <InformationMessage />
      <ModalControls
        isErrors={Object.keys(isResumeValid ? {} : { resumeErrorMessage })}
        formValues={fileValue}
        extraControl={{
          state: isResumeValid ? true : false,
          message:
            uploadedFileNames.length && selectedResume === "0"
              ? "Lütfen bir özgeçmiş seçin"
              : "Lütfen bir özgeçmiş (CV) dosyası yükleyin",
        }}
      />
    </div>
  );
};

export default UploadResume;
