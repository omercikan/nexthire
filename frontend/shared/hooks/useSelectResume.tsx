import { AppDispatch } from "@/shared/redux/store";
import { useDispatch } from "react-redux";
import { setSelectResume } from "../redux/slices/applicationModal/modalData";

const useSelectResume = () => {
  const dispatch = useDispatch<AppDispatch>();

  const setSelectedResumeData = (
    message: string,
    cvID: string,
    fileName: string = "",
    uploadTime: Date | null,
  ) => {
    dispatch(
      setSelectResume({
        message: message,
        selectedResume: cvID,
        fileName: fileName,
        uploadTime: uploadTime,
      })
    );
  };

  return [setSelectedResumeData];
};

export default useSelectResume;
