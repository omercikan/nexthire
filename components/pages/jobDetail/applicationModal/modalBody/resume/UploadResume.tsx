import React, { ChangeEvent, useContext, useRef, useState } from "react";
import InformationMessage from "../../modalUI/InformationMessage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "@/lib/redux/store";
import { Form, Formik } from "formik";
import ModalControls from "../../modalControls/ModalControls";
import {
  setApplicationData,
  setPlaceholderUploadData,
} from "@/lib/redux/features/applicationModal/modalData";
import { ResumeSchema } from "@/app/(auth)/schema/ApplicationModal/ResumeSchema";
import validatePdfFile from "@/lib/utils/validatePdfFile";
import { useUploadResumeMutation } from "@/lib/redux/services/resumeApi";
import { AuthContext } from "@/context/authContext";
import { nanoid } from "@reduxjs/toolkit";
import { setCvID } from "@/lib/redux/features/applicationModal/cvIdSlice";
import dayjs from "dayjs";

const UploadResume = () => {
  const { applicationData, uploadedFileNames } = useSelector(
    (state: RootState) => state.applicationModalData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [pdfMessage, setPdfMessage] = useState<string>("");
  const [uploadResume] = useUploadResumeMutation();
  const { user } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadResume = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (
      file &&
      file.type === "application/pdf" &&
      file.size <= 3 * 1024 * 1024
    ) {
      const isValidFile = await validatePdfFile(file);
      if (!isValidFile) {
        setPdfMessage(
          "PDF dosyası geçersiz ya da bozuk lütfen başka bir dosya yükleyin"
        );
      } else if (uploadedFileNames.includes(file.name)) {
        setPdfMessage("Bu dosyayı zaten yüklediniz");
      } else if (uploadedFileNames.length > 3) {
        setPdfMessage("En fazla 4 tane yükleyebilirsiniz");
      } else {
        dispatch(
          setPlaceholderUploadData({
            fileName: file.name,
            size: file.size,
            uploadTime: dayjs().format("DD.MM.YYYY"),
          })
        );

        setPdfMessage("");
        dispatch(setCvID(nanoid()));
        const { cvID } = store.getState().cvIdSlice;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("docID", user?.id ?? "");
        formData.append("cvID", cvID);
        const { data } = await uploadResume(formData);

        dispatch(
          setApplicationData({
            ...applicationData,
            resume: data?.resumeData?.secure_url,
          })
        );
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
              />
              <div className="text-[#D91B1B] text-[15px] mt-1">
                {errors.resume ? errors.resume : pdfMessage}
              </div>
            </div>

            <InformationMessage />
            <ModalControls
              isErrors={Object.keys(
                pdfMessage?.length ? { pdfMessage } : errors
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
