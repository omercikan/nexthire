import {
  useDeleteResumesMutation,
  useReplaceResumeMutation,
} from "@/features/dashboard/services/candidateResumeApi";
import { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { setRenameResumeID, setResumeOptionMenuID } from "../../resumeSlice";
import appendFormData from "@/shared/utils/appendFormData";
import toast from "react-hot-toast";
import { validateResume } from "@/shared/utils/validateResume";
import { requestHandler } from "@/shared/utils/requestHandler";

const useItemMenuActions = ({
  resumeId,
  resumeFilename,
}: {
  resumeId: string;
  resumeFilename: string;
}) => {
  const dispatch = useDispatch();
  const replaceInputRef = useRef<HTMLInputElement | null>(null);

  const clearResumeOptionMenuID = useCallback(() => {
    dispatch(setResumeOptionMenuID(""));
  }, [dispatch]);

  // delete resume action
  const [deleteResumes, { isLoading: isDeleteLoading }] =
    useDeleteResumesMutation();

  const handleDeleteResumes = useCallback(async () => {
    await requestHandler(
      () =>
        deleteResumes({
          resumeIDs: [resumeId],
          publicId: [resumeFilename],
        }).unwrap(),
      "Özgeçmiş silinemedi, lütfen tekrar deneyin."
    );
    clearResumeOptionMenuID();
  }, [deleteResumes, resumeFilename, resumeId, clearResumeOptionMenuID]);

  // rename resume action
  const handleRenameResume = useCallback(() => {
    dispatch(setRenameResumeID(resumeId));
    clearResumeOptionMenuID();
  }, [dispatch, resumeId, clearResumeOptionMenuID]);

  // replace resume action
  const [replaceResume, { isLoading: isReplaceLoading }] =
    useReplaceResumeMutation();

  const handleReplaceResume = useCallback(async () => {
    const file = replaceInputRef.current?.files?.[0];

    if (file) {
      const message = await validateResume(file);
      if (message) return toast.error(message);

      const formData = appendFormData([
        { name: "resume", value: file },
        { name: "fileId", value: resumeId },
        { name: "publicId", value: resumeFilename },
      ]);

      await requestHandler(
        () => replaceResume(formData).unwrap(),
        "Özgeçmiş değiştirilemedi, lütfen tekrar deneyin."
      );

      clearResumeOptionMenuID();
    }
  }, [resumeId, resumeFilename, replaceResume, clearResumeOptionMenuID]);

  return {
    isDeleteLoading,
    isReplaceLoading,
    replaceInputRef,
    handleDeleteResumes,
    handleRenameResume,
    handleReplaceResume,
    clearResumeOptionMenuID,
  };
};

export default useItemMenuActions;
