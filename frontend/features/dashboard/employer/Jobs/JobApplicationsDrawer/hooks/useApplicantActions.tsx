import { useCallback } from "react";
import { useUpdateApplicantStatusMutation } from "../../services/applicantsApi";
import { Applicant, ApplicantStatus } from "../types/applicantTypes";
import toast from "react-hot-toast";

const useApplicantActions = (
  updateApplicant: (updatedApplicant: Applicant) => void,
) => {
  const [updateStatus, { isLoading: isStatusLoading }] =
    useUpdateApplicantStatusMutation();

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

  return { handleUpdateApplicantStatus, isStatusLoading };
};

export default useApplicantActions;
