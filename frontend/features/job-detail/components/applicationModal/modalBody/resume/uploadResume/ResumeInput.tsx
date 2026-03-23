import { useResume } from "./resumeContext";

const ResumeInput = () => {
  const { errorMessage, handleResume } = useResume();

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        id="resume-upload"
        name="resume"
        hidden
        onChange={(e) => handleResume(e.target.files?.[0])}
        data-testid="resume-upload-input"
      />

      {errorMessage && (
        <div className="text-[#D91B1B] text-[15px] mt-1">{errorMessage}</div>
      )}
    </>
  );
};

export default ResumeInput;
