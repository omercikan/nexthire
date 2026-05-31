import { AppDispatch, RootState } from "@/shared/redux/store";
import { WEEK_DAYS, WEEK_DAYS_FULL } from "../constants/dateConstants";
import useCalendar from "../hooks/useCalendar";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useDispatch, useSelector } from "react-redux";
import { setScheduledDate } from "../interviewSchedulerSlice";
import toast from "react-hot-toast";
import CalendarCell from "./CalendarCell";

dayjs.extend(customParseFormat);
dayjs.locale("tr");

interface CalendarTableProps {
  currentYear: number;
  currentMonth: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const response = {
  success: true,
  interviewCountsByDate: [
    {
      scheduledAt: "11 Nisan 2025, Cuma",
      count: 17,
      times: [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
      ],
    },
    { scheduledAt: "18 Nisan 2025, Cuma", count: 1, times: ["11:30"] },
    { scheduledAt: "25 Nisan 2025, Cuma", count: 1, times: ["14:00"] },
    { scheduledAt: "2 Mayıs 2025, Cuma", count: 1, times: ["16:30"] },
    { scheduledAt: "9 Mayıs 2025, Cuma", count: 1, times: ["10:00"] },
    { scheduledAt: "16 Mayıs 2025, Cuma", count: 1, times: ["13:30"] },
    { scheduledAt: "23 Mayıs 2025, Cuma", count: 1, times: ["15:00"] },
    { scheduledAt: "30 Mayıs 2025, Cuma", count: 1, times: ["09:30"] },
    { scheduledAt: "6 Haziran 2025, Cuma", count: 1, times: ["17:00"] },
    { scheduledAt: "13 Haziran 2025, Cuma", count: 1, times: ["18:00"] },
    {
      scheduledAt: "31 Mayıs 2026, Pazar",
      count: 17,
      times: [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
      ],
    },
  ],
};

const CalendarTable = ({
  currentMonth,
  currentYear,
  setIsOpen,
}: CalendarTableProps) => {
  const calendar = useCalendar(currentYear, currentMonth);
  const dispatch = useDispatch<AppDispatch>();
  const scheduledDate = useSelector(
    (state: RootState) => state.interviewScheduler.scheduledAt,
  );

  const handleSelectDate = (
    day: number,
    isPast: boolean,
    isDateDisabled: boolean,
  ) => {
    if (isPast) return;

    if (isDateDisabled) {
      return toast.error(
        "Bu gün tüm saatler dolu, lütfen başka bir gün seçin.",
        { id: "dateDisabled" },
      );
    }

    dispatch(
      setScheduledDate(
        dayjs(`${currentYear}-${currentMonth + 1}-${day}`).format(
          "D MMMM YYYY, dddd",
        ),
      ),
    );
    setIsOpen((prev) => !prev);
  };

  return (
    <table>
      <thead>
        <tr className="text-muted-foreground text-[0.8rem] flex gap-2 select-none">
          {WEEK_DAYS.map((day, i) => (
            <th
              key={day}
              aria-label={WEEK_DAYS_FULL[i]}
              className="font-normal flex-1"
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {calendar.map((week, weekIndex) => (
          <tr key={`week-${weekIndex}`} className="mt-2 flex w-full">
            {week.map((cell) => (
              <CalendarCell
                key={`day-${cell.day}`}
                cell={cell}
                currentYear={currentYear}
                currentMonth={currentMonth}
                scheduledDate={scheduledDate ?? ""}
                interviewCountsByDate={response.interviewCountsByDate}
                onSelect={handleSelectDate}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarTable;
