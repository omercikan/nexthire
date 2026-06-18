import { ScreeningQuestion } from "../types/applicantTypes";

export const getKnockoutQuestions = (screeningQuestions: ScreeningQuestion[]) =>
  screeningQuestions?.filter((q) => q.knockout === true);

export const getNonKnockoutQuestions = (
  screeningQuestions: ScreeningQuestion[],
) => screeningQuestions.filter((q) => q.knockout === false);

export const getPassedCount = (knockoutQuestions: ScreeningQuestion[]) =>
  knockoutQuestions?.reduce((count, q) => {
    if (typeof q.knockoutAnswer === "object") {
      const knockoutAnswers = q.knockoutAnswer as string[];
      const userAnswers = q.answer as unknown as string[];
      return knockoutAnswers.some((a) => userAnswers.includes(a))
        ? count + 1
        : count;
    }
    return String(q.answer) === String(q.knockoutAnswer) ? count + 1 : count;
  }, 0);

export const isQuestionPassed = (question: ScreeningQuestion): boolean => {
  const { knockoutAnswer, answer } = question;

  if (typeof knockoutAnswer === "object") {
    const knockoutAnswers = knockoutAnswer as string[];
    const userAnswers = answer as unknown as string[];
    return knockoutAnswers.some((a) => userAnswers.includes(a));
  }
  return String(answer) === String(knockoutAnswer);
};

export const getIsPassed = (
  passedCount: number,
  knockoutQuestions: ScreeningQuestion[],
) => passedCount === knockoutQuestions?.length;
