import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDeleteModal, setMenuId } from "./JobListMenuSlice";

interface DeleteModalValues {
  open: boolean;
  jobId: string | null;
}

const useJobActions = (jobId: string) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleViewApplications = () => {
    router.push(`?jobId=${jobId}`, { scroll: false });
    dispatch(setMenuId(""));
  };

  const handleDeleteModal = (modalValue: DeleteModalValues) => {
    dispatch(setDeleteModal(modalValue));
    dispatch(setMenuId(""));
  };

  return {
    handleViewApplications,
    handleDeleteModal,
  };
};

export default useJobActions;
