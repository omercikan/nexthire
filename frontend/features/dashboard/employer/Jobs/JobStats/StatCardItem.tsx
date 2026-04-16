import { cn } from "@/shared/libs/utils";

interface StatCardItemProps {
  label: string;
  value: string;
  className?: string;
}

const StatCardItem = ({ label, value, className }: StatCardItemProps) => {
  return (
    <div className="py-3 px-4 rounded-lg bg-white border border-border flex-1">
      <p className="text-xs font-medium uppercase text-muted-foreground">
        {label}
      </p>
      <span
        className={cn("text-2xl mt-1 font-semibold text-foreground", className)}
      >
        {value}
      </span>
    </div>
  );
};

export default StatCardItem;
