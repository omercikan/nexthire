import { useMemo } from "react";

const useCalendar = (currentYear: number, currentMonth: number) => {
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const blanksCount = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const daysInMonth = useMemo(() => {
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    return Array.from({ length: totalDays }, (_, i) => i + 1);
  }, [currentYear, currentMonth]);

  const calendarCells = useMemo(() => {
    const cells = [];

    for (let i = 0; i < blanksCount; i++) {
      const prevDay = prevMonthDays - (blanksCount - (i + 1));
      cells.push({ day: prevDay, isCurrentMonth: false });
    }

    daysInMonth.forEach((day) => {
      cells.push({ day, isCurrentMonth: true });
    });

    const nextDayBlanksCount =
      (blanksCount > 4 ? 42 : 35) - (daysInMonth.length + blanksCount);

    for (let i = 0; i < nextDayBlanksCount; i++) {
      cells.push({ day: i + 1, isCurrentMonth: false });
    }

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }

    return rows;
  }, [daysInMonth, blanksCount, prevMonthDays]);

  return calendarCells;
};

export default useCalendar;
