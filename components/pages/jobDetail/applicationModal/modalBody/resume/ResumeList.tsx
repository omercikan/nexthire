import { AuthContext } from "@/context/authContext";
import { useFetchResumeQuery } from "@/lib/redux/services/resumeApi";
import { AppDispatch, RootState, store } from "@/lib/redux/store";
import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResumeItem from "./ResumeItem";
import {
  setPlaceholderUploadData,
  setUploadedFileNames,
} from "@/lib/redux/features/applicationModal/modalData";
import ShowMoreResumes from "./ShowMoreResumes";
import PdfLoadingOverlay from "./resumeItem/PdfLoadingOverlay";
import useSelectResume from "@/hooks/useSelectResume";

const ResumeList = () => {
  //* Get the current authenticated user from AuthContext *//
  const { user } = useContext(AuthContext);

  //* Access Redux state slices and dispatch function *//
  const {
    touch: { showMoreResumes },
    applyModalScreen: { isSmallScreen },
    applicationModalData: { placeholderUploadData },
    cvIdSlice: { cvID },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  //* Custom hook to dispatch and set the selected resume data *//
  const [setSelectedResumeData] = useSelectResume();

  //* Fetch uploaded resumes for the user *//
  const { data } = useFetchResumeQuery({
    docID: user?.id ?? "",
    cvID: cvID,
  });

  //* Memoized data for uploaded resumes and the most recently uploaded resume *//
  const resumeData = useMemo(() => data?.resumeData ?? [], [data?.resumeData]);
  const findMatchUpload = useMemo(() => {
    return resumeData.find(
      (resume) => resume.fileName == placeholderUploadData.fileName
    );
  }, [placeholderUploadData.fileName, resumeData]);

  // On first load, automatically select the most recently uploaded resume
  useEffect(() => {
    const resume = store.getState().applicationModalData.selectedResume;
    const [lastResume] = resumeData;

    if (lastResume) {
      const { cvID, url, fileName, uploadTime } = lastResume;

      if (resume !== "0" && !resume?.length && cvID) {
        setSelectedResumeData("", url, cvID, fileName, uploadTime);
      }
    }
  }, [resumeData, setSelectedResumeData]);

  // If a user-uploaded resume is found, set the selected resume data from it
  useEffect(() => {
    if (findMatchUpload) {
      const { url, cvID, fileName, uploadTime } = findMatchUpload;
      setSelectedResumeData("", url, cvID, fileName, uploadTime);

      dispatch(
        setPlaceholderUploadData({ fileName: "", size: 0, uploadTime: "" })
      );
    }
  }, [dispatch, findMatchUpload, setSelectedResumeData]);

  // Extract all file names from resumeData and store them in the uploadedFileNames Redux state
  useEffect(() => {
    const fileName = resumeData.map((resume) => resume.fileName);
    dispatch(setUploadedFileNames(fileName));
  }, [resumeData, dispatch]);

  return (
    <div className="mb-4 mt-2 px-6 max-sm:px-0">
      <ul>
        {!findMatchUpload && !!placeholderUploadData.fileName.length && (
          <PdfLoadingOverlay />
        )}

        {resumeData
          .slice(0, isSmallScreen ? resumeData?.length : 2)
          .map((resume) => (
            <ResumeItem
              key={resume.cvID}
              resume={resume}
              isDisplaySelect={true}
            />
          ))}

        {showMoreResumes &&
          !isSmallScreen &&
          resumeData
            .slice(2, resumeData.length)
            .map((resume) => (
              <ResumeItem
                key={resume.cvID}
                resume={resume}
                isDisplaySelect={true}
              />
            ))}
      </ul>

      {resumeData.length > 2 && !isSmallScreen && (
        <ShowMoreResumes resumeDataLength={resumeData.length} />
      )}
    </div>
  );
};

export default ResumeList;
