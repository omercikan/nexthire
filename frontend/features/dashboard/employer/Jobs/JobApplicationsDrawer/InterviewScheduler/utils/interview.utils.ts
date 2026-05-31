import { TIME_SLOTS } from "../constants/dateConstants";

const isDateDisabled = (
  interviewCountsByDate: { scheduledAt: string; times: string[] }[],
  isCurrentMonth: boolean,
  dateLabel: string,
) => {
  const entry = interviewCountsByDate.find(
    (d) => isCurrentMonth && d.scheduledAt === dateLabel,
  );

  if (!entry) return false;

  return entry.times.length >= TIME_SLOTS.length;
};

const isTimeDisabled = (
  interviewCountsByDate: { scheduledAt: string; times: string[] }[],
  isCurrentMonth: boolean,
  dateLabel: string,
  time: string,
) => {
  const entry = interviewCountsByDate.find(
    (d) => isCurrentMonth && d.scheduledAt === dateLabel,
  );

  if (!entry) return false;

  return entry.times.includes(time);
};

type DateStatus = "green" | "yellow" | "orange" | "red" | null;
const getDateStatus = (times: string[]): DateStatus => {
  const total = TIME_SLOTS.length;
  const booked = times.length;
  const ratio = booked / total;

  if (ratio === 0) return null;
  if (ratio <= 0.35) return "green";
  if (ratio <= 0.7) return "yellow";
  if (ratio < 1) return "orange";
  return "red";
};

export { isDateDisabled, isTimeDisabled, getDateStatus };
