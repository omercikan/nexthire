import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import ResumeInput from "./uploadResume/ResumeInput";
import ResumeLabel from "./uploadResume/ResumeLabel";
import ModalFooter from "../ModalFooter";

const UploadResume = () => {
  const { uploadedFileNames, resumeErrorMessage, selectedResume } = useSelector(
    (state: RootState) => state.applicationModalData
  );
  const [fileValue, setFileValue] = useState<string>("");
  const isResumeValid = !!uploadedFileNames.length && selectedResume !== "0";

  return (
    <div className="mt-2">
      <div className="px-6 max-sm:px-0">
        <ResumeLabel />

        <span className="text-[#00000099] text-sm block mt-1.5">
          PDF (3 MB)
        </span>

        <ResumeInput setFileValue={setFileValue} />
      </div>

      <ModalFooter
        errors={isResumeValid ? {} : { resumeErrorMessage }}
        values={fileValue}
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
