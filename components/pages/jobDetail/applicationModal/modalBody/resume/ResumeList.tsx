import { AuthContext } from "@/context/authContext";
import { useFetchResumeQuery } from "@/lib/redux/services/resumeApi";
import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ResumeItem from "./ResumeItem";
import {
  setPlaceholderUploadData,
  setUploadedFileNames,
} from "@/lib/redux/features/applicationModal/modalData";
import ShowMoreResumes from "./ShowMoreResumes";
import PdfLoadingOverlay from "./resumeItem/PdfLoadingOverlay";

const ResumeList = () => {
  const { user } = useContext(AuthContext);
  const { cvID } = useSelector((state: RootState) => state.cvIdSlice);
  const { placeholderUploadData } = useSelector(
    (state: RootState) => state.applicationModalData
  );
  const { showMoreResumes } = useSelector((state: RootState) => state.touch);
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useFetchResumeQuery({
    docID: user?.id ?? "",
    cvID: cvID,
  });

  const resumeData = useMemo(() => data?.resumeData ?? [], [data?.resumeData]);
  const findMatchUpload = useMemo(() => {
    return resumeData.find(
      (resume) => resume.fileName == placeholderUploadData.fileName
    );
  }, [placeholderUploadData.fileName, resumeData]);

  useEffect(() => {
    if (findMatchUpload) {
      dispatch(
        setPlaceholderUploadData({ fileName: "", size: 0, uploadTime: "" })
      );
    }
  }, [dispatch, findMatchUpload]);

  useEffect(() => {
    const fileName = resumeData.map((resume) => resume.fileName);

    dispatch(setUploadedFileNames(fileName));
  }, [resumeData, dispatch]);

  return (
    <div className="px-6 mb-4 mt-2">
      <ul>
        {!findMatchUpload && !!placeholderUploadData.fileName.length && (
          <PdfLoadingOverlay />
        )}

        {resumeData.slice(0, 2).map((resume) => (
          <ResumeItem key={resume.cvID} resume={resume} />
        ))}

        {showMoreResumes &&
          resumeData
            .slice(2, resumeData.length)
            .map((resume) => <ResumeItem key={resume.cvID} resume={resume} />)}
      </ul>

      {resumeData.length > 2 && (
        <ShowMoreResumes resumeDataLength={resumeData.length} />
      )}
    </div>
  );
};

export default ResumeList;
