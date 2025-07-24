import { setSelectResume } from "@/lib/redux/features/applicationModal/modalData";
import { AppDispatch } from "@/lib/redux/store";
import { useDispatch } from "react-redux";

const useSelectResume = () => {
  const dispatch = useDispatch<AppDispatch>();

  const setSelectedResumeData = (
    message: string,
    resume: string,
    cvID: string
  ) => {
    dispatch(
      setSelectResume({
        message: message,
        resume: resume,
        selectedResume: cvID,
      })
    );
  };

  return [setSelectedResumeData];
};

export default useSelectResume;
