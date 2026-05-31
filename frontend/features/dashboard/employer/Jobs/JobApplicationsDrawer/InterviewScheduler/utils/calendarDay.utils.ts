import { cn } from "@/shared/libs/utils";

export const getCalendarDayClass = (
  isPast: boolean,
  isDisabled: boolean,
  isSelected: boolean,
) => {
  return cn(
    "h-9 w-9 mx-auto rounded-lg text-sm font-normal flex flex-col items-center justify-center gap-0.5 text-foreground hover:bg-gray-100 transition-all",
    isPast && "text-muted-foreground opacity-50 pointer-events-none",
    isDisabled && "text-muted-foreground opacity-50",
    isSelected && "bg-[#0073d5]! text-white *:text-white",
  );
};
