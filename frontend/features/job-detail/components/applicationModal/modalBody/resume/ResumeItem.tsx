import { CVDataFields } from "@/shared/types/resume";
import ResumeContent from "./resumeItem/ResumeContent";
import DownloadButton from "./resumeItem/DownloadButton";
import RadioButton from "./resumeItem/RadioButton";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import useSelectResume from "@/shared/hooks/useSelectResume";
import { useEffect } from "react";
import { getResumeName, useResume } from "./uploadResume/resumeContext";

const ResumeItem = ({
  resume: { fileName, size, createdAt, _id },
  isDisplaySelect = true,
}: {
  resume: CVDataFields;
  isDisplaySelect?: boolean;
}) => {
  const { selectedResume } = useSelector(
    (state: RootState) => state.applicationModalData,
  );
  const isMatchResumeID = selectedResume == _id;
  const [setSelectedResumeData] = useSelectResume();
  const { resumes } = useResume();

  useEffect(() => {
    const { _id, createdAt } = resumes[0];

    if (selectedResume === "") {
      setSelectedResumeData(
        "",
        String(_id),
        getResumeName(resumes[0]),
        createdAt as Date,
      );
    }
  }, [resumes, selectedResume, setSelectedResumeData]);

  const handleSelectResume = () => {
    if (isDisplaySelect) {
      if (!isMatchResumeID) {
        setSelectedResumeData("", _id, fileName, createdAt as Date);
      } else {
        setSelectedResumeData("Lütfen bir özgeçmiş seçin", "", "", null);
      }
    }
  };

  return (
    <li
      className={`flex border ${
        isMatchResumeID ? "border-[#4045ef]" : "border-[#E8E8E8]"
      } rounded-[12.8px] cursor-pointer mb-3`}
      onClick={handleSelectResume}
    >
      <div className="bg-[#cb112d] grid place-content-center w-11 h-auto rounded-s-[12.8px]">
        <span className="text-white text-sm font-medium">PDF</span>
      </div>

      <div
        className={`${
          isDisplaySelect ? "sm:hover:bg-[#f8fafd] py-3 px-2" : "ps-2"
        } flex items-center justify-between w-[calc(100%-44px)] rounded-e-[12.8px] transition-colors`}
      >
        <ResumeContent
          fileName={fileName}
          size={size}
          uploadTime={createdAt as Date}
        />

        {isDisplaySelect ? (
          <div className="flex items-center gap-x-3 max-[425px]:gap-x-0 pe-1.5">
            <DownloadButton fileID={_id} fileName={fileName} isView={false} />

            <span className="w-[0.5px] bg-[#E8E8E8] h-10 inline-block me-1 max-[430px]:me-3 max-[430px]:ms-1"></span>

            <RadioButton isMatchResumeID={isMatchResumeID} />
          </div>
        ) : (
          <DownloadButton
            fileID={_id}
            fileName={fileName}
            isView={true}
            className="h-full py-5 px-5 ms-6 border-s border-s-[#E8E8E8] hover:bg-[#F3F3F3] rounded-e-[12.8px] transition-colors duration-300"
          />
        )}
      </div>
    </li>
  );
};

export default ResumeItem;
