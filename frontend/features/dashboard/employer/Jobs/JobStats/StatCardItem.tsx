import { cn } from "@/shared/libs/utils";

interface StatCardItemProps {
  label: string;
  value: number;
  className?: string;
  isLoading: boolean;
}

const StatCardItem = ({
  label,
  value,
  className,
  isLoading,
}: StatCardItemProps) => {
  return (
    <div className="py-3 px-4 rounded-lg bg-white border border-border flex-1 max-sm:text-center">
      <p className="text-xs font-medium uppercase text-muted-foreground">
        {label}
      </p>

      {!isLoading ? (
        <span
          className={cn(
            "text-2xl mt-1 font-semibold text-foreground",
            className,
          )}
        >
          {typeof value === "undefined" ? 0 : value}
        </span>
      ) : (
        <span className="animate-pulse bg-gray-300 w-5 h-[22.5px] inline-block mt-[2.9px] rounded-xs" />
      )}
    </div>
  );
};

export default StatCardItem;
