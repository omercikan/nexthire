import { AuthContext } from "@/context/authContext";
import useUploadResume from "@/hooks/useUploadResume";
import { useDeleteLastResumeMutation } from "@/lib/redux/services/resumeApi";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { ChangeEvent, Dispatch, Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResumeErrorMessage } from "@/lib/redux/features/applicationModal/modalData";
import { validateResume } from "@/lib/utils/validateResume";

const ResumeInput = ({
  setFileValue,
}: {
  setFileValue: Dispatch<React.SetStateAction<string>>;
}) => {
  const { user } = useContext(AuthContext);
  const [deleteLastResume] = useDeleteLastResumeMutation();
  const { uploadResumeToApi } = useUploadResume();
  const dispatch = useDispatch<AppDispatch>();
  const {
    uploadedFileNames,
    placeholderUploadData: { fileName },
    resumeErrorMessage,
  } = useSelector((state: RootState) => state.applicationModalData);

  const handleUploadResume = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const userID = user?.id ?? "";

    if (!file) return;

    try {
      const errorMessage = await validateResume(file, uploadedFileNames);
      if (errorMessage) return dispatch(setResumeErrorMessage(errorMessage));

      if (uploadedFileNames.length >= 4) {
        await Promise.all([
          deleteLastResume({ lastResumeName: uploadedFileNames[0], userID }),
          uploadResumeToApi(file, userID),
        ]);
      } else {
        await uploadResumeToApi(file, userID);
      }

      setFileValue(file.name);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        id="resume-upload"
        name="resume"
        hidden
        onChange={handleUploadResume}
        disabled={Boolean(fileName)}
      />
      <div className="text-[#D91B1B] text-[15px] mt-1">{resumeErrorMessage}</div>
    </>
  );
};

export default ResumeInput;
