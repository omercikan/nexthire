import React, { ChangeEvent, useContext, useState } from "react";
import InformationMessage from "../../modalUI/InformationMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import ModalControls from "../../modalControls/ModalControls";
import validatePdfFile from "@/lib/utils/validatePdfFile";
import { AuthContext } from "@/context/authContext";
import useUploadResume from "@/hooks/useUploadResume";
import { useDeleteLastResumeMutation } from "@/lib/redux/services/resumeApi";
import { setPdfErrorMessage } from "@/lib/redux/features/applicationModal/modalData";

const UploadResume = () => {
  const {
    uploadedFileNames,
    PdfErrorMessage,
    selectedResume,
    placeholderUploadData: { fileName },
  } = useSelector((state: RootState) => state.applicationModalData);
  const { user } = useContext(AuthContext);
  const { uploadResumeToApi } = useUploadResume();
  const [deleteLastResume] = useDeleteLastResumeMutation();
  const dispatch = useDispatch<AppDispatch>();
  const [fileValue, setFileValue] = useState<string>("");

  const handleUploadResume = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const isValidFile = await validatePdfFile(file);
      setFileValue(file?.name);

      if (file.type !== "application/pdf") {
        return dispatch(
          setPdfErrorMessage("Yalnızca PDF formatı yükleyebilirsiniz")
        );
      }

      if (!isValidFile) {
        dispatch(
          setPdfErrorMessage(
            "PDF dosyası geçersiz ya da bozuk lütfen başka bir dosya yükleyin"
          )
        );
      } else if (uploadedFileNames.includes(file.name)) {
        dispatch(setPdfErrorMessage("Bu dosyayı zaten yüklediniz"));
      } else if (file.size >= 3 * 1024 * 1024) {
        dispatch(
          setPdfErrorMessage("En fazla 3 MB boyutunda dosya yükleyebilirsiniz")
        );
      } else if (uploadedFileNames.length >= 4) {
        await Promise.all([
          deleteLastResume({
            lastResumeName: uploadedFileNames[0],
            userID: user?.id ?? "",
          }),

          uploadResumeToApi(file, user?.id ?? ""),
        ]);
      } else {
        await uploadResumeToApi(file, user?.id ?? "");
      }

      e.target.value = "";
    }
  };

  return (
    <div className="mt-2">
      <div className="px-6">
        <label
          htmlFor="resume-upload"
          className={`!py-1.5 !px-4 !bg-transparent hover:!bg-[#EBF4FD] shadow-[0_0_0_1px_#4045ef] hover:shadow-[0_0_0_2px_#4045ef] transition-shadow duration-300 !text-[#4045ef] font-semibold rounded-full inline-block ${
            fileName.length ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          Özgeçmiş yükle
        </label>

        <span className="text-[#00000099] text-sm block mt-1.5">
          PDF (3 MB)
        </span>

        <input
          type="file"
          accept=".pdf"
          id="resume-upload"
          name="resume"
          hidden
          onChange={(e) => handleUploadResume(e)}
          disabled={!!fileName.length}
        />
        <div className="text-[#D91B1B] text-[15px] mt-1">{PdfErrorMessage}</div>
      </div>

      <InformationMessage />
      <ModalControls
        isErrors={Object.keys(
          selectedResume !== "0" && uploadedFileNames.length
            ? {}
            : { PdfErrorMessage }
        )}
        formValues={fileValue}
        extraControl={{
          state:
            uploadedFileNames.length && selectedResume !== "0" ? true : false,
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
