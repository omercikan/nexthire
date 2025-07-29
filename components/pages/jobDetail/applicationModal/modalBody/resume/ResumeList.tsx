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
  const [setSelectedResumeData] = useSelectResume();

  const resumeData = useMemo(() => data?.resumeData ?? [], [data?.resumeData]);
  const findMatchUpload = useMemo(() => {
    return resumeData.find(
      (resume) => resume.fileName == placeholderUploadData.fileName
    );
  }, [placeholderUploadData.fileName, resumeData]);

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

  useEffect(() => {
    if (findMatchUpload) {
      const { url, cvID, fileName, uploadTime } = findMatchUpload;
      setSelectedResumeData("", url, cvID, fileName, uploadTime);

      dispatch(
        setPlaceholderUploadData({ fileName: "", size: 0, uploadTime: "" })
      );
    }
  }, [dispatch, findMatchUpload, setSelectedResumeData]);

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
          <ResumeItem
            key={resume.cvID}
            resume={resume}
            isDisplaySelect={true}
          />
        ))}

        {showMoreResumes &&
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

      {resumeData.length > 2 && (
        <ShowMoreResumes resumeDataLength={resumeData.length} />
      )}
    </div>
  );
};

export default ResumeList;
