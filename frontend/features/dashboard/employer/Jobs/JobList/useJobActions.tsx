import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDeleteModal, setMenuId } from "./JobListMenuSlice";
import { useUpdateJobStatusMutation } from "../services/employerJobsApi";
import toast from "react-hot-toast";

interface DeleteModalValues {
  open: boolean;
  jobId: string | null;
}

const useJobActions = (jobId: string) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [updateStatus] = useUpdateJobStatusMutation();

  const handleViewApplications = () => {
    router.push(`?jobId=${jobId}`, { scroll: false });
    dispatch(setMenuId(""));
  };

  const handleDeleteModal = (modalValue: DeleteModalValues) => {
    dispatch(setDeleteModal(modalValue));
    dispatch(setMenuId(""));
  };

  const handleUpdateStatus = async () => {
    try {
      const { data } = await updateStatus({ jobId }).unwrap();
      const isPublished = data.status === "published";
      toast.success(
        isPublished ? "İlan yayına alındı." : "İlan pasife alındı.",
      );
      dispatch(setMenuId(""));
      document.body.style.overflow = "visible";
    } catch {
      toast.error("Durum güncellenirken bir hata oluştu.");
    }
  };
  return {
    handleViewApplications,
    handleDeleteModal,
    handleUpdateStatus,
  };
};

export default useJobActions;
