// React
import React, { useCallback, useEffect } from "react";

// Type
import { CVDataFields } from "@/shared/types/resume";

// Library and Utils
import dayjs from "dayjs";
import { calculateCVSize } from "@/shared/utils/calculateCvSize";

// Redux API and Slice
import { setResumeOptionMenuID, setSelectedResumes } from "../../resumeSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/shared/redux/store";

// Custom Components
import ResumeColumn from "./ResumeColumn";
import CustomButton from "@/shared/components/ui/CustomButton";

// Constants
import { colors } from "../../constants/color";
import { RESUME_ITEM } from "../../constants/resume-item";
import ResponsiveItemMenu from "../ResponsiveItemMenu";
import { useMediaQuery } from "@mui/material";
import { createPortal } from "react-dom";
import { handleDownloadPdf } from "./utils/download-pdf";

const ResumeItem = ({
  resume,
  index,
}: {
  resume: CVDataFields;
  index: number;
}) => {
  const { originalName, size, createdAt, fileUrl } = resume;
  const dispatch = useDispatch<AppDispatch>();
  const { selectedResumes, resumeOptionMenuID } = useSelector(
    (state: RootState) => state.resumeSlice
  );
  const isItemMenuQuery = useMediaQuery("(max-width:840px)");
  const isMobileQuery = useMediaQuery("(max-width:640px)");

  const handleSelectResume = useCallback(() => {
    dispatch(setSelectedResumes(resume));
  }, [resume, dispatch]);

  useEffect(() => {
    document.body.style.overflow =
      resumeOptionMenuID && isItemMenuQuery ? "hidden" : "visible";
  }, [isItemMenuQuery, resumeOptionMenuID]);

  return (
    <>
      <li
        className="bg-white rounded-[20px] p-[15px] flex flex-wrap items-center gap-5"
        onClick={handleSelectResume}
      >
        {!isMobileQuery && (
          <span
            className={`w-[20px] h-[20px] rounded-full transition-colors duration-300 border-2 border-[#1814f3] grid place-content-center ${
              selectedResumes.some((r) => r._id === resume._id)
                ? "bg-[#1814f3]"
                : ""
            }`}
          >
            {selectedResumes.some((r) => r._id === resume._id) && (
              <RESUME_ITEM.check size={12} color="white" />
            )}
          </span>
        )}

        <span
          className="grid place-content-center w-[60px] h-[60px] max-md:w-[45px] max-md:h-[45px] max-md:rounded-[14px] rounded-[20px] text-xl"
          style={{
            backgroundColor: colors[index - 1].background,
            color: colors[index - 1].color,
          }}
        >
          {index}
        </span>

        <ResumeColumn
          items={[
            {
              title: "Dosya Adı",
              text: `${originalName.substring(0, 18)}${
                originalName.length > 18 ? "..." : ""
              }`,
              wrapperClass: "flex-[1]",
              spanClass: "text-ellipsis overflow-hidden whitespace-nowrap",
            },
            {
              title: "Dosya Boyutu",
              text: calculateCVSize(Number(size)),
              wrapperClass: "mx-auto flex-[1] max-sm:hidden",
              spanClass: "whitespace-nowrap",
            },
            {
              title: "Yüklenme Tarihi",
              text: dayjs(createdAt).locale("tr").format("DD MMMM YYYY"),
              wrapperClass: "ms-auto flex-[1] max-sm:hidden",
              spanClass: "whitespace-nowrap",
            },
          ]}
        />

        {!isItemMenuQuery && (
          <CustomButton
            text="İndir"
            className="flex-[0.5] max-sm:flex-initial max-[992px]:flex-[1] max-[992px]:px-8 max-sm:px-0 !py-1.5 sm:border border-[#718EBF] hover:!border-[#1814F3] !text-[#718EBF] font-medium hover:!text-[#1814F3] !bg-transparent ms-auto max-sm:!text-[#1814F3] whitespace-nowrap"
            handleClick={(e) => handleDownloadPdf(e, fileUrl, originalName)}
          />
        )}

        <div className="relative">
          <CustomButton
            className="!bg-transparent !py-0 absolute top-1/2 -translate-y-1/2 -right-1"
            handleClick={() =>
              dispatch(
                setResumeOptionMenuID(
                  resumeOptionMenuID === resume._id ? "" : resume._id
                )
              )
            }
          >
            <RESUME_ITEM.dot color="000" />
          </CustomButton>

          {!isItemMenuQuery && (
            <ResponsiveItemMenu
              resume={resume}
              wrapperClass="right-[calc(100%+16px)] top-0 drop-shadow-2xl whitespace-nowrap z-50"
            />
          )}
        </div>
      </li>

      {isItemMenuQuery &&
        createPortal(
          resume._id === resumeOptionMenuID && (
            <div
              className="bg-black/50 fixed top-0 left-0 w-full h-full z-[999]"
              onClick={() => dispatch(setResumeOptionMenuID(""))}
            >
              <ResponsiveItemMenu
                resume={resume}
                wrapperClass="bottom-0 left-1/2 -translate-x-1/2 w-[95%] drop-shadow-2xl"
              />
            </div>
          ),
          document.body
        )}
    </>
  );
};

export default ResumeItem;
