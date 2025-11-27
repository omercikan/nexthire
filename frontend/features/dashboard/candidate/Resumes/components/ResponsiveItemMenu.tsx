import React, { useCallback, useRef } from "react";
import { RESUME_ITEM } from "../constants/resume-item";
import MenuList from "./MenuList";
import {
  useDeleteResumesMutation,
  useReplaceResumeMutation,
} from "@/features/dashboard/services/candidateResumeApi";
import { CVDataFields } from "@/shared/types/resume";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { setRenameResumeID, setResumeOptionMenuID } from "../resumeSlice";
import { useMediaQuery } from "@mui/material";
import { handleDownloadPdf } from "./Resume/utils/download-pdf";
import toast from "react-hot-toast";
import appendFormData from "@/shared/utils/appendFormData";

const ResponsiveItemMenu = ({
  resume,
  wrapperClass = "",
}: {
  resume: CVDataFields;
  wrapperClass?: string;
}) => {
  const [deleteResumes, { isLoading: isDeleteLoading }] =
    useDeleteResumesMutation();
  const { resumeOptionMenuID } = useSelector(
    (state: RootState) => state.resumeSlice
  );
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:840px)");
  const replaceInputRef = useRef<HTMLInputElement | null>(null);
  const [replaceResume, { isLoading: isReplaceLoading }] =
    useReplaceResumeMutation();

  const handleDeleteResumes = useCallback(async () => {
    await deleteResumes({
      resumeIDs: [resume._id],
      publicId: [resume.fileName],
    });
    dispatch(setResumeOptionMenuID(""));
  }, [deleteResumes, resume, dispatch]);

  const handleRenameResume = useCallback(() => {
    dispatch(setRenameResumeID(resume._id));
    dispatch(setResumeOptionMenuID(""));
  }, [dispatch, resume._id]);

  const handleReplaceResume = useCallback(async () => {
    const file = replaceInputRef.current?.files?.[0];

    if (file) {
      const formData = appendFormData([
        { name: "resume", value: file },
        { name: "fileId", value: resume._id },
        { name: "publicId", value: resume.fileName },
      ]);

      await replaceResume(formData);
      dispatch(setResumeOptionMenuID(""));
    }
  }, [resume._id, resume.fileName, replaceResume, dispatch]);

  if (resume._id === resumeOptionMenuID)
    return (
      <MenuList
        listClass={wrapperClass}
        list={[
          {
            buttonClass: "resume-menu-item",
            buttonContent: (
              <>
                <RESUME_ITEM.trash />
                Sil
              </>
            ),
            handleClick: handleDeleteResumes,
            isLoading: isDeleteLoading,
          },

          {
            buttonClass: "resume-menu-item",
            buttonContent: (
              <>
                <RESUME_ITEM.pencil />
                Yeniden Adlandır
              </>
            ),
            handleClick: handleRenameResume,
          },

          {
            buttonClass: `resume-menu-item !bg-transparent ${
              isReplaceLoading ? "px-2" : "!px-0 !py-0"
            }`,
            isLoading: isReplaceLoading,
            buttonContent: (
              <>
                <label
                  htmlFor="replaceResume"
                  className="resume-menu-item !border-none cursor-pointer"
                >
                  <RESUME_ITEM.replace />
                  Değiştir
                </label>

                <input
                  type="file"
                  id="replaceResume"
                  ref={replaceInputRef}
                  onChange={handleReplaceResume}
                  hidden
                />
              </>
            ),
          },

          {
            buttonClass: "resume-menu-item min-[840px]:!hidden",
            buttonContent: (
              <>
                {isMobile && (
                  <>
                    <RESUME_ITEM.download />
                    İndir
                  </>
                )}
              </>
            ),
            handleClick: (e) =>
              handleDownloadPdf(e, resume.fileUrl, resume.originalName),
          },

          {
            buttonClass: "resume-menu-item",
            buttonContent: (
              <>
                <RESUME_ITEM.code />
                URL&apos;yi Kopyala
              </>
            ),
            handleClick: async () => {
              await navigator.clipboard.writeText(resume.fileUrl);
              toast.success("Özgeçmiş bağlantısı kopyalandı.", {
                id: "resumeLink",
              });
              dispatch(setResumeOptionMenuID(""));
            },
          },
        ]}
      />
    );
};

export default ResponsiveItemMenu;
