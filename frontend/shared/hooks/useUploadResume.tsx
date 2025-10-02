import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useSelectResume from "./useSelectResume";
import { AppDispatch, store } from "../redux/store";
import { useUploadResumeMutation } from "../redux/services/resumeApi";
import { clearPlaceholderUploadData, setPlaceholderUploadData, setResumeErrorMessage } from "../redux/slices/applicationModal/modalData";
import appendFormData from "../utils/appendFormData";
import { setCvID } from "../redux/slices/applicationModal/cvIdSlice";

const useUploadResume = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [uploadResume] = useUploadResumeMutation();
  const [setSelectedResumeData] = useSelectResume();

  const uploadResumeToApi = useCallback(
    async (file: File, docID: string): Promise<void> => {
      try {
        dispatch(setResumeErrorMessage(""));

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
        setSelectedResumeData("", "", "");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        dispatch(clearPlaceholderUploadData());
        dispatch(setResumeErrorMessage(""));
        toast.error(
          "Özgeçmiş yüklenemedi. Lütfen bağlantınızı kontrol edip tekrar deneyin."
        );
      }
    },
    [dispatch, uploadResume, setSelectedResumeData]
  );

  return { uploadResumeToApi };
};

export default useUploadResume;
