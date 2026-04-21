import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setMenuId } from "./JobListMenuSlice";

const useJobActions = (jobId: string) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleViewApplications = () => {
    router.push(`?jobId=${jobId}`, { scroll: false });
    dispatch(setMenuId(""));
  };

  return { handleViewApplications };
};

export default useJobActions;
