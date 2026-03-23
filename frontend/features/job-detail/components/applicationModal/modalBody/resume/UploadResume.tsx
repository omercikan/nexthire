import ResumeInput from "./uploadResume/ResumeInput";
import ResumeLabel from "./uploadResume/ResumeLabel";
import ModalFooter from "../ModalFooter";
import { useResume } from "./uploadResume/resumeContext";

const UploadResume = () => {
  const { isValid } = useResume();

  return (
    <div className="mt-2">
      <div className="px-6 max-sm:px-0">
        <ResumeLabel />

        <span className="text-[#00000099] text-sm block mt-1.5">
          PDF (3 MB)
        </span>

        <ResumeInput />
      </div>

      <ModalFooter isValid={isValid} />
    </div>
  );
};

export default UploadResume;
