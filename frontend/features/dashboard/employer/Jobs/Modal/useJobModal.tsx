import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEmployerJobsData } from "../hooks/useEmployerJobsData";
import { setDeleteModal } from "../JobList/JobListMenuSlice";
import { useDeleteEmployerJobMutation } from "../services/employerJobsApi";
import toast from "react-hot-toast";

const useJobModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs } = useEmployerJobsData();
  const { jobId } = useSelector(
    (state: RootState) => state.jobListMenu.deleteModal,
  );
  const job = jobs.find((job) => job._id === jobId);
  const [deleteJob, { isLoading }] = useDeleteEmployerJobMutation();

  const handleClose = () => {
    dispatch(setDeleteModal({ open: false, jobId: null }));
    document.body.style.overflow = "visible";
  };

  const handleDeleteJob = async () => {
    if (!jobId) return;

    try {
      await deleteJob({ jobId }).unwrap();
      toast.success("İş ilanı başarıyla silindi.");

      handleClose();
    } catch {
      toast.error("Silme işlemi başarısız oldu.");
    }
  };

  return {
    job,
    handleClose,
    handleDeleteJob,
    isLoadingDeleteJob: isLoading,
  };
};

export default useJobModal;
