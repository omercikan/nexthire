import { setCvID } from "@/lib/redux/features/applicationModal/cvIdSlice";
import {
  clearPlaceholderUploadData,
  setPdfErrorMessage,
  setPlaceholderUploadData,
  setSelectResume,
} from "@/lib/redux/features/applicationModal/modalData";
import { useUploadResumeMutation } from "@/lib/redux/services/resumeApi";
import { AppDispatch, store } from "@/lib/redux/store";
import appendFormData from "@/lib/utils/appendFormData";
import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const useUploadResume = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [uploadResume] = useUploadResumeMutation();

  const uploadResumeToApi = useCallback(
    async (file: File, docID: string): Promise<void> => {
      try {
        dispatch(setPdfErrorMessage(""));

        dispatch(
          setPlaceholderUploadData({
            fileName: file.name,
            size: file.size,
            uploadTime: dayjs().format("DD.MM.YYYY"),
          })
        );

        dispatch(setCvID(nanoid()));
        const { cvID } = store.getState().cvIdSlice;

        const formData = appendFormData([
          { name: "file", value: file },
          { name: "docID", value: docID },
          { name: "cvID", value: cvID },
        ]);

        await uploadResume(formData).unwrap();
        dispatch(setSelectResume(""));

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(clearPlaceholderUploadData());
        dispatch(setPdfErrorMessage(""));
        toast.error(
          "Özgeçmiş yüklenemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin."
        );
      }
    },
    [dispatch, uploadResume]
  );

  return { uploadResumeToApi };
};

export default useUploadResume;
