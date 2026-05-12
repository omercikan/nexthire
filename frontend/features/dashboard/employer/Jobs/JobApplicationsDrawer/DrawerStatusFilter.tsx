import CustomButton from "@/shared/components/ui/CustomButton";
import { cn } from "@/shared/libs/utils";
import { useRouter, useSearchParams } from "next/navigation";

const statusList = [
  { key: "all", label: "Tümü" },
  { key: "new", label: "Yeni" },
  { key: "reviewed", label: "İncelendi" },
  { key: "shortlisted", label: "Kısa Liste" },
  { key: "interviewed", label: "Mülakat" },
  { key: "scheduled", label: "Planlanmış" },
  { key: "rejected", label: "Reddedildi" },
  { key: "auto_rejected", label: "Otomatik Red" },
];

const DrawerStatusFilter = ({
  statusCounts,
}: {
  statusCounts: { count: number; status: string }[] | undefined;
}) => {
  const searchParams = useSearchParams();
  const statusParams = useSearchParams().get("status") || "all";
  const router = useRouter();

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") params.delete("status");
    else params.set("status", status);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mt-3 text-black flex flex-wrap gap-1.5">
      {statusList.map((status) => {
        const currStatus = statusCounts?.find((s) => status.key === s.status);

        return (
          <CustomButton
            key={status.key}
            className={cn(
              "py-1! px-2.5! text-xs inline-flex justify-center items-center gap-1 font-medium whitespace-nowrap duration-200!",
              statusParams === status.key
                ? "bg-[#0073d5]!"
                : "bg-[#eff2f5]! text-muted-foreground!",
            )}
            handleClick={() => handleFilterChange(status.key)}
          >
            {status.label}
            <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
              {currStatus?.count ?? 0}
            </span>
          </CustomButton>
        );
      })}
    </div>
  );
};

export default DrawerStatusFilter;
