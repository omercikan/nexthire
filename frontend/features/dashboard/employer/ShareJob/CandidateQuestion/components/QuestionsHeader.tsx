import { CandidateQuestionIcons } from "../icon/icon";

interface CandidateQuestionsHeaderProps {
  questionCount: number;
  description?: string;
}

const CandidateQuestionsHeader: React.FC<CandidateQuestionsHeaderProps> = ({
  questionCount,
  description = "Adayları değerlendirmek için ön eleme soruları ekleyin. Otomatik olarak başvuruları filtrelemek için eleme (knockout) sorularını etkinleştirin.",
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <CandidateQuestionIcons.QuestionMark
            color="lab(47.0007% -3.24479 -50.2754)"
            size={18}
          />

          <h1 className="text-lg text-[#080C0F] font-medium">Aday Soruları</h1>
        </div>

        <span className="inline-block text-xs py-0.5 px-2.5 rounded-full font-medium text-[#080C0F] bg-[#EFF2F5]">
          {questionCount} Soru
        </span>
      </div>

      <p className="text-[#5e6468] text-sm mt-2">{description}</p>
    </>
  );
};

export default CandidateQuestionsHeader;
