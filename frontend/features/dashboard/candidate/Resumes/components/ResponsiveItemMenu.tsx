import React, { useCallback } from "react";
import { RESUME_ITEM } from "../constants/resume-item";
import MenuList from "./MenuList";
import { useDeleteResumesMutation } from "@/features/dashboard/services/candidateResumeApi";
import { CVDataFields } from "@/shared/types/resume";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { setResumeOptionMenuID } from "../resumeSlice";
import { useMediaQuery } from "@mui/material";
import { handleDownloadPdf } from "./Resume/utils/download-pdf";
import toast from "react-hot-toast";

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

  const handleDeleteResumes = useCallback(async () => {
    await deleteResumes({
      resumeIDs: [resume._id],
      publicId: [resume.fileName],
    });
    dispatch(setResumeOptionMenuID(""));
  }, [deleteResumes, resume, dispatch]);

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
          },

          {
            buttonClass: "resume-menu-item",
            buttonContent: (
              <>
                <RESUME_ITEM.replace />
                Değiştir
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
