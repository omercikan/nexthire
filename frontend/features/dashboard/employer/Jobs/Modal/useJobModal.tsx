import { AppDispatch, RootState } from "@/shared/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEmployerJobsData } from "../hooks/useEmployerJobsData";
import { setDeleteModal } from "../JobList/JobListMenuSlice";

const useJobModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs } = useEmployerJobsData();
  const { jobId } = useSelector(
    (state: RootState) => state.jobListMenu.deleteModal,
  );
  const job = jobs.find((job) => job._id === jobId);

  const handleClose = () => {
    dispatch(setDeleteModal({ open: false, jobId: null }));
    document.body.style.overflow = "visible";
  };

  return {
    job,
    handleClose,
  };
};

export default useJobModal;
