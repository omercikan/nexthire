import { ScreeningQuestion } from "../types/applicantTypes";

const NonKnockoutQuestion = ({ question }: { question: ScreeningQuestion }) => {
  return (
    <div className="rounded-xl border transition-all border-border">
      <div className="rounded-t-xl bg-muted/40 px-4 py-3">
        <p className="text-sm font-medium text-foreground">
          {question.question}
        </p>
      </div>

      <div className="px-4 py-3">
        <div className="rounded-lg border border-border bg-[#F2F4F7] p-3">
          <p className="text-sm text-foreground">{question.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default NonKnockoutQuestion;
