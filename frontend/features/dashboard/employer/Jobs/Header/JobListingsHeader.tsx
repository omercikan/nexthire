import CustomButton from "@/shared/components/ui/CustomButton";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";

const JobListingsHeader = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">İş İlanları</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          8 ilan, 226 toplam başvuru
        </p>
      </div>

      <CustomButton
        className="inline-flex items-center gap-2 px-4! rounded-lg! font-medium text-sm"
        handleClick={() => router.push("/hesabim/is-paylas")}
      >
        <LuPlus />
        Yeni İlan Oluştur
      </CustomButton>
    </div>
  );
};

export default JobListingsHeader;
