import { RootState } from "@/shared/redux/store";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const useJobEditMode = () => {
  const params = useSearchParams();
  const action = params.get("action");
  const jobId = params.get("jobId");
  const { editedJobData } = useSelector(
    (state: RootState) => state.jobDataSlice,
  );

  if (!editedJobData) return false;

  if (action === "edit" && jobId) return true;
  else return false;
};

export default useJobEditMode;
