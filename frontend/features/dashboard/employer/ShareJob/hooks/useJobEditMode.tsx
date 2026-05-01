import { useSearchParams } from "next/navigation";
import useJobEditData from "./useJobEditData";

const useJobEditMode = () => {
  const params = useSearchParams();
  const action = params.get("action");
  const jobId = params.get("jobId");

  const currentEditedData = useJobEditData();
  if (!currentEditedData) return false;

  if (action === "edit" && jobId) return true;
  else return false;
};

export default useJobEditMode;
