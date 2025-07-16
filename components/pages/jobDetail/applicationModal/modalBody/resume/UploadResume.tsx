import React, { ChangeEvent, useContext, useRef } from "react";
import InformationMessage from "../../modalUI/InformationMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Form, Formik } from "formik";
import ModalControls from "../../modalControls/ModalControls";
import { ResumeSchema } from "@/app/(auth)/schema/ApplicationModal/ResumeSchema";
import validatePdfFile from "@/lib/utils/validatePdfFile";
import { AuthContext } from "@/context/authContext";
import useUploadResume from "@/hooks/useUploadResume";
import { useDeleteLastResumeMutation } from "@/lib/redux/services/resumeApi";
import { setPdfErrorMessage } from "@/lib/redux/features/applicationModal/modalData";

const UploadResume = () => {
  const {
    applicationData,
    uploadedFileNames,
    placeholderUploadData: { fileName },
    PdfErrorMessage,
  } = useSelector((state: RootState) => state.applicationModalData);
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { uploadResumeToApi } = useUploadResume();
  const [deleteLastResume] = useDeleteLastResumeMutation();
  const dispatch = useDispatch<AppDispatch>();

  const handleUploadResume = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 3 * 1024 * 1024
    ) {
      const isValidFile = await validatePdfFile(file);
      if (!isValidFile) {
        dispatch(
          setPdfErrorMessage(
            "PDF dosyası geçersiz ya da bozuk lütfen başka bir dosya yükleyin"
          )
        );
      } else if (uploadedFileNames.includes(file.name)) {
        dispatch(setPdfErrorMessage("Bu dosyayı zaten yüklediniz"));
      } else if (uploadedFileNames.length > 3) {
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

      if (fileInputRef.current) {
        e.target.value = "";
      }
    }
  };

  return (
    <Formik
      initialValues={{
        resume: applicationData.resume || "",
      }}
      onSubmit={() => {}}
      validationSchema={ResumeSchema}
    >
      {({ errors, values, setFieldValue }) => (
        <Form>
          <div className="mt-2">
            <div className="px-6">
              <label
                htmlFor="resume-upload"
                className="!py-1.5 !px-4 !bg-transparent hover:!bg-[#EBF4FD] shadow-[0_0_0_1px_#4045ef] hover:shadow-[0_0_0_2px_#4045ef] transition-shadow duration-300 !text-[#4045ef] cursor-pointer font-semibold rounded-full inline-block"
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
                onChange={(e) => {
                  setFieldValue("resume", e.target.files?.[0]);
                  handleUploadResume(e);
                }}
                ref={fileInputRef}
                disabled={!!fileName.length}
              />
              <div className="text-[#D91B1B] text-[15px] mt-1">
                {errors.resume ? errors.resume : PdfErrorMessage}
              </div>
            </div>

            <InformationMessage />
            <ModalControls
              isErrors={Object.keys(
                PdfErrorMessage?.length ? { PdfErrorMessage } : errors
              )}
              formValues={values}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UploadResume;
