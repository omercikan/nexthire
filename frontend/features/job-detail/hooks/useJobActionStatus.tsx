import { useJob } from "@/features/jobs/context/JobContext";
import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setJobData } from "../slices/jobDataSlice";
import { JobData } from "@/shared/types/jobDetail";
import { usePublishJobMutation } from "@/features/dashboard/employer/services/jobApi";
import toast from "react-hot-toast";

const useJobActionStatus = () => {
  const { job } = useJob();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [publishJobMutation, { isLoading }] = usePublishJobMutation();

  const editJob = () => {
    if (!job) return;

    dispatch(setJobData(job as JobData));
    router.replace(`/hesabim/is-paylas?action=edit&jobId=${job._id}`);
  };

  const publishJob = async () => {
    if (!job) return;

    if (job.status !== "draft") {
      return toast.error("Bu ilan zaten yayımlanmış.");
    }

    try {
      await publishJobMutation({
        data: { status: "published" },
        jobId: job._id,
      }).unwrap();

      toast.success("İlanınız başarıyla yayımlandı.");
      router.refresh();
    } catch {
      toast.error("İlan yayımlanırken bir hata oluştu.");
    }
  };

  return { editJob, publishJob, isPublishLoading: isLoading };
};

export default useJobActionStatus;
