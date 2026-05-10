import CustomButton from "@/shared/components/ui/CustomButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TbFileSearch } from "react-icons/tb";
import { TbFilterOff } from "react-icons/tb";

const EmptyFilterResult = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("status");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="bg-[#e7e7f1] border border-gray-300 rounded-full w-17.5 h-17.5 grid place-content-center mb-3">
        <TbFileSearch color="434653" size={26} />
      </div>

      <h3 className="text-[#191b22] text-[22px] font-semibold">
        Sonuç bulunamadı
      </h3>
      <p className="text-[#434653] text-center text-sm max-w-[20rem] mt-1">
        Arama kriterlerinizle eşleşen başvuru bulunamadı. Filtreleri
        temizleyerek tüm başvuruları görüntüleyebilirsiniz.
      </p>

      <CustomButton
        className="bg-[#003c90]! py-2! px-8! rounded-lg! mt-6 flex items-center gap-2"
        handleClick={handleClearFilters}
      >
        <TbFilterOff />
        Filtreleri Temizle
      </CustomButton>
    </div>
  );
};

export default EmptyFilterResult;
