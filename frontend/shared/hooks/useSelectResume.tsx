import { AppDispatch } from "@/shared/redux/store";
import { useDispatch } from "react-redux";
import { setSelectResume } from "../redux/slices/applicationModal/modalData";

const useSelectResume = () => {
  const dispatch = useDispatch<AppDispatch>();

  const setSelectedResumeData = (
    message: string,
    resume: string,
    cvID: string,
    fileName: string = "",
    uploadTime: string = ""
  ) => {
    dispatch(
      setSelectResume({
        message: message,
        resume: resume,
        selectedResume: cvID,
        fileName: fileName,
        uploadTime: uploadTime,
      })
    );
  };

  return [setSelectedResumeData];
};

export default useSelectResume;
