import { AuthContext } from "@/features/auth/authContext";
import { useJob } from "@/features/jobs/context/JobContext";
import { useContext } from "react";

const useJobStatus = () => {
  const { user } = useContext(AuthContext);
  const { job } = useJob();

  const isEmployer = user?.role === "employer";
  const isOwner = job?.employer?._id === user?._id;

  if (!isEmployer || !isOwner) return;

  return job.status;
};

export default useJobStatus;
