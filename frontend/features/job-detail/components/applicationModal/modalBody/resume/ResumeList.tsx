import { useSelector } from "react-redux";
import ResumeItem from "./ResumeItem";
import ShowMoreResumes from "./ShowMoreResumes";
import { RootState } from "@/shared/redux/store";
import { getResumeName, useResume } from "./uploadResume/resumeContext";
import { calculateCVSize } from "@/shared/utils/calculateCvSize";

const ResumeList = () => {
  const {
    touch: { showMoreResumes },
    applyModalScreen: { isSmallScreen },
  } = useSelector((state: RootState) => state);
  const { resumes } = useResume();

  return (
    <div className="mb-4 mt-2 px-6 max-sm:px-0">
      <ul>
        {resumes
          .slice(0, isSmallScreen ? resumes.length : 2)
          .map((resume, i) => (
            <ResumeItem
              key={i}
              resume={{
                fileName: getResumeName(resume),
                _id: String(resume._id),
                size: calculateCVSize(Number(resume.size)),
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
              }}
              isDisplaySelect={true}
            />
          ))}

        {showMoreResumes &&
          !isSmallScreen &&
          resumes.slice(2, resumes.length).map((resume) => (
            <ResumeItem
              key={resume._id}
              resume={{
                fileName: getResumeName(resume),
                _id: String(resume._id),
                size: calculateCVSize(Number(resume.size)),
                createdAt: resume.createdAt,
                updatedAt: resume.updatedAt,
              }}
              isDisplaySelect={true}
            />
          ))}
      </ul>

      {resumes.length > 2 && !isSmallScreen && (
        <ShowMoreResumes resumeDataLength={resumes.length} />
      )}
    </div>
  );
};

export default ResumeList;
