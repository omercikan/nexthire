import dayjs from "dayjs";
import { getDateStatus, isDateDisabled } from "../utils/interview.utils";

interface InterviewEntry {
  scheduledAt: string;
  count: number;
  times: string[];
}

const useCalendarCell = (
  day: number,
  isCurrentMonth: boolean,
  currentYear: number,
  currentMonth: number,
  scheduledDate: string,
  interviewCountsByDate: InterviewEntry[],
) => {
  const today = dayjs();

  const cellDate = dayjs(new Date(currentYear, currentMonth, day));

  const formattedDate = dayjs(
    `${currentYear}-${currentMonth + 1}-${day}`,
  ).format("D MMMM YYYY, dddd");

  const isPast = !isCurrentMonth || cellDate.isBefore(today, "day");

  const isSelected = isCurrentMonth && scheduledDate === formattedDate;

  const isDisabled = isDateDisabled(
    interviewCountsByDate,
    isCurrentMonth,
    formattedDate,
  );

  const entry = interviewCountsByDate.find(
    (i) => isCurrentMonth && i.scheduledAt === formattedDate,
  );
  const status = entry ? getDateStatus(entry.times) : null;

  return {
    cellDate,
    formattedDate,
    isPast,
    isSelected,
    isDisabled,
    entry,
    status,
  };
};

export default useCalendarCell;
