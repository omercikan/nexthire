import { Tooltip } from "@mui/material";
import { getCalendarDayClass } from "../utils/calendarDay.utils";
import useCalendarCell from "../hooks/useCalendarCell";
import {
  statusBackgroundColors,
  statusTextColors,
} from "../constants/statusColors";

interface InterviewEntry {
  scheduledAt: string;
  count: number;
  times: string[];
}

interface CalendarCellProps {
  cell: {
    day: number;
    isCurrentMonth: boolean;
  };
  currentYear: number;
  currentMonth: number;
  scheduledDate: string;
  interviewCountsByDate: InterviewEntry[];
  onSelect: (
    day: number,
    isPast: boolean,
    isDateDisabled: boolean,
  ) => string | undefined;
}

const CalendarCell = ({
  cell,
  currentYear,
  currentMonth,
  scheduledDate,
  interviewCountsByDate,
  onSelect,
}: CalendarCellProps) => {
  const { isPast, isSelected, isDisabled, entry, status } = useCalendarCell(
    cell.day,
    cell.isCurrentMonth,
    currentYear,
    currentMonth,
    scheduledDate,
    interviewCountsByDate,
  );

  return (
    <td
      className="p-0 text-center relative aspect-square"
      key={`day-${cell.day}`}
    >
      <Tooltip
        title={isDisabled ? "Bugün tüm saatler dolu" : ""}
        arrow
        slotProps={{
          tooltip: { sx: { backgroundColor: "#000" } },
          arrow: { sx: { color: "#000" } },
        }}
      >
        <button
          type="button"
          className={getCalendarDayClass(isPast, isDisabled, isSelected)}
          disabled={isPast}
          onClick={() => onSelect(cell.day, isPast, isDisabled)}
        >
          {cell.day}

          <span
            className={`text-[10px] leading-none ${
              !entry || entry.count === 0
                ? "text-muted-foreground"
                : statusTextColors[status!]
            }`}
          >
            {entry?.count ?? 0}
          </span>

          <span
            className={`w-1.25 h-1.25 rounded-full transition-colors shrink-0 ${
              status ? statusBackgroundColors[status!] : "invisible"
            }`}
          />
        </button>
      </Tooltip>
    </td>
  );
};

export default CalendarCell;
