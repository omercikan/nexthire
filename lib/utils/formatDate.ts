type day = "2-digit" | "numeric";
type month = "2-digit" | "long" | "narrow" | "numeric" | "short";
type year = "2-digit" | "numeric";

export function formateDate(
  date: Date | string,
  formatType?: {
    day: day;
    month: month;
    year: year;
  }
): string {
  const {
    day = "numeric",
    month = "numeric",
    year = "numeric",
  } = formatType || {};

  return new Date(date).toLocaleDateString("tr-TR", {
    day: day,
    month: month,
    year: year,
  });
}
