import { setJobData } from "@/features/job-detail/slices/jobDataSlice";
import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Job } from "../../types/employerJobsTypes";

const useApplicationAction = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleEditJob = (job: Job) => {
    dispatch(setJobData(job));
    document.body.style.overflow = "visible";
    router.replace(`/hesabim/is-paylas?action=edit&jobId=${job?._id}`);
  };

  return { handleEditJob };
};

export default useApplicationAction;
