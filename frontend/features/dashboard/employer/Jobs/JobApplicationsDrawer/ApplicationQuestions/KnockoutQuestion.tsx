import { LuCircleCheck, LuCircleX } from "react-icons/lu";
import { ScreeningQuestion } from "../types/applicantTypes";
import { isQuestionPassed } from "../utils/screeningUtils";

const KnockoutQuestion = ({ question }: { question: ScreeningQuestion }) => {
  const isPassed = isQuestionPassed(question);

  return (
    <div
      className={`rounded-xl border transition-all ${isPassed ? "border-emerald-200" : "border-red-200"}`}
    >
      <div
        className={`py-3 px-4 flex items-center justify-between rounded-t-xl ${isPassed ? "bg-emerald-50/60" : "bg-red-50/60"}`}
      >
        <p className="text-sm font-medium text-foreground">
          {question.question}
        </p>

        <span
          className={`${isPassed ? "text-emerald-700 bg-emerald-100 border-emerald-300" : "text-red-700 bg-red-100 border-red-300"} border px-1.5 text-[10px] font-semibold rounded-full overflow-hidden whitespace-nowrap inline-flex items-center gap-1`}
        >
          {isPassed ? <LuCircleCheck /> : <LuCircleX />} Eleme
        </span>
      </div>

      <div className="px-4 py-3 grid grid-cols-2 gap-3">
        <div
          className={`rounded-lg border p-3 ${isPassed ? "bg-emerald-50/40 border-emerald-200" : "bg-red-50/40 border-red-200"}`}
        >
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            aday
          </p>
          <p
            className={`text-sm font-medium ${isPassed ? "text-emerald-800" : "text-red-800"}`}
          >
            {typeof question.answer === "object"
              ? (question.answer as string[]).join(", ")
              : question.answer}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-[#F3F5F7] p-3">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            beklenen
          </p>
          <p className="text-sm font-medium text-foreground">
            {typeof question.knockoutAnswer === "object"
              ? (question.knockoutAnswer as string[]).join(", ")
              : question.knockoutAnswer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KnockoutQuestion;
