import { useCallback } from "react";
import { useUpdateApplicantStatusMutation } from "../../services/applicantsApi";
import { Applicant, ApplicantStatus } from "../types/applicantTypes";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const useApplicantActions = (
  updateApplicant: (updatedApplicant: Applicant) => void,
) => {
  const [updateStatus, { isLoading: isStatusLoading }] =
    useUpdateApplicantStatusMutation();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleUpdateApplicantStatus = useCallback(
    async (
      jobId: string,
      candidateId: string,
      status: ApplicantStatus["value"],
      errorMessage?: string,
    ) => {
      if (isStatusLoading) return;

      try {
        const updated = await updateStatus({
          jobId,
          candidateId,
          status,
        }).unwrap();
        updateApplicant(updated);
      } catch (error) {
        if (errorMessage) {
          return toast.error(errorMessage);
        }

        console.error("Failed to update applicant status", error);
      }
    },
    [updateStatus, updateApplicant, isStatusLoading],
  );

  const handleOpenSubDrawer = (
    applicationId: string,
    action: "questions" | "interview",
    mode: string = "",
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("applicationId", applicationId);
    params.set("action", action);

    if (mode !== "") params.set("mode", mode);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return {
    handleUpdateApplicantStatus,
    handleOpenSubDrawer,
    isStatusLoading,
  };
};

export default useApplicantActions;
