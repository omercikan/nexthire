import CustomButton from "@/shared/components/ui/CustomButton";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
import { useEmployerJobsData } from "../hooks/useEmployerJobsData";

const JobListingsHeader = () => {
  const router = useRouter();
  const { stats, isLoading } = useEmployerJobsData();

  return (
    <div className="flex max-sm:flex-col max-sm:gap-5 sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">İş İlanları</h1>

        {!isLoading ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {stats?.total ?? 0} ilan, {stats?.totalApplications ?? 0} toplam
            başvuru
          </p>
        ) : (
          <p className="animate-pulse bg-gray-300 w-38.75 h-4 mt-2 rounded-xs" />
        )}
      </div>

      <CustomButton
        className="inline-flex items-center gap-2 px-4! rounded-lg! font-medium text-sm max-sm:justify-center"
        handleClick={() => router.push("/hesabim/is-paylas")}
      >
        <LuPlus />
        Yeni İlan Oluştur
      </CustomButton>
    </div>
  );
};

export default JobListingsHeader;
