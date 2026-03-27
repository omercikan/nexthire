import ResumeItem from "../../resume/ResumeItem";
import SummaryContent from "../SummaryContent";
import { useResume } from "../../resume/uploadResume/resumeContext";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { calculateCVSize } from "@/shared/utils/calculateCvSize";

const SummaryResume = () => {
  const { selectedResume } = useSelector(
    (state: RootState) => state.applicationModalData,
  );
  const { resumes } = useResume();
  const findSelectedResume = resumes.find(
    (resume) => resume._id === selectedResume,
  );

  return (
    <SummaryContent
      contentTitle="Özgeçmiş"
      subTitle="Başvurunuzun değerlendirilebilmesi için güncel bir CV ekleyin*"
      step={2}
    >
      <div className="w-85.5 max-sm:w-auto mt-4">
        <ResumeItem
          resume={{
            fileName: findSelectedResume?.name as string,
            size: calculateCVSize(Number(findSelectedResume?.size)),
            _id: findSelectedResume?._id as string,
          }}
          isDisplaySelect={false}
        />
      </div>
    </SummaryContent>
  );
};

export default SummaryResume;
