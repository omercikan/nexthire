import CustomButton from "@/shared/components/ui/CustomButton";
import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { LuBriefcase, LuPlus, LuSearchX, LuFilterX } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { clearFilters } from "../JobFilters/jobListFiltersSlice";

const NoneJobContent = ({ isFiltered }: { isFiltered: boolean }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleEmptyAction = () => {
    if (isFiltered) {
      return dispatch(clearFilters());
    }

    router.push("/hesabim/is-paylas");
  };

  return (
    <div className="text-center flex flex-col items-center gap-2 py-12">
      {isFiltered ? (
        <LuSearchX className="text-foreground" size={24} />
      ) : (
        <LuBriefcase className="text-foreground" size={24} />
      )}

      <h3 className="text-foreground font-medium text-lg mt-2">
        {isFiltered ? "Sonuç bulunamadı" : "Henüz iş ilanı yok"}
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed w-56">
        {isFiltered
          ? "Arama kriterlerinizle eşleşen herhangi bir ilan bulunamadı."
          : "İlk ilanınızı oluşturarak yetenekli adaylara ulaşmaya başlayın."}
      </p>

      <CustomButton
        className="py-2! px-3 flex items-center gap-2 whitespace-nowrap rounded-lg! text-sm font-medium mt-6"
        handleClick={handleEmptyAction}
      >
        {isFiltered ? (
          <>
            <LuFilterX />
            Filtreleri Temizle
          </>
        ) : (
          <>
            <LuPlus />
            İlk İlanı Oluştur
          </>
        )}
      </CustomButton>
    </div>
  );
};

export default NoneJobContent;
