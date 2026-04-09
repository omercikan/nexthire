import { useGetJobQuery } from "@/features/jobs/postings/services/jobsApi";
import { RootState } from "@/shared/redux/store";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

const useJobEditData = () => {
  const { editedJobData } = useSelector(
    (state: RootState) => state.jobDataSlice,
  );
  const params = useSearchParams();
  const editJobId = params.get("jobId");
  const { data: savedEditedData } = useGetJobQuery(editJobId as string, {
    skip: !editJobId || !!editedJobData,
  });
  const currentEditedData = editedJobData || savedEditedData?.job;

  return currentEditedData;
};

export default useJobEditData;
