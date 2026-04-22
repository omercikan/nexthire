import CustomButton from "@/shared/components/ui/CustomButton";
import { cn } from "@/shared/libs/utils";
import { useRouter, useSearchParams } from "next/navigation";

const statusList = [
  {
    key: "all",
    label: "Tümü",
    value: 2,
  },

  { key: "new", label: "Yeni", value: 0 },
  { key: "reviewed", label: "İncelendi", value: 0 },
  { key: "shortlisted", label: "Kısa Liste", value: 0 },
  { key: "interview", label: "Mülakat", value: 0 },
  { key: "rejected", label: "Reddedildi", value: 0 },
  { key: "auto-rejected", label: "Otomatik Red", value: 0 },
];

const DrawerStatusFilter = () => {
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
      {statusList.map((status) => (
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
            {status.value}
          </span>
        </CustomButton>
      ))}
    </div>
  );
};

export default DrawerStatusFilter;
