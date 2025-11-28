import React from "react";
import { RESUME_ITEM } from "../../constants/resume-item";
import MenuList from "../MenuList";
import { CVDataFields } from "@/shared/types/resume";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { useMediaQuery } from "@mui/material";
import { handleDownloadPdf } from "../Resume/utils/download-pdf";
import toast from "react-hot-toast";
import useItemMenuActions from "./useItemMenuActions";
import FileInput from "@/shared/components/ui/FileInput";

const ResponsiveItemMenu = ({
  resume,
  wrapperClass = "",
}: {
  resume: CVDataFields;
  wrapperClass?: string;
}) => {
  const { resumeOptionMenuID } = useSelector(
    (state: RootState) => state.resumeSlice
  );
  const isMobile = useMediaQuery("(max-width:840px)");
  const {
    isDeleteLoading,
    isReplaceLoading,
    replaceInputRef,
    handleDeleteResumes,
    handleRenameResume,
    handleReplaceResume,
    clearResumeOptionMenuID,
  } = useItemMenuActions({
    resumeId: resume._id,
    resumeFilename: resume.fileName,
  });

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

                <FileInput
                  id="replaceResume"
                  accept=".pdf"
                  onChange={handleReplaceResume}
                  ref={replaceInputRef}
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
              clearResumeOptionMenuID();
            },
          },
        ]}
      />
    );
};

export default ResponsiveItemMenu;
