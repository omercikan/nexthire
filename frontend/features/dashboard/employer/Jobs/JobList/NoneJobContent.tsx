import CustomButton from "@/shared/components/ui/CustomButton";
import { useRouter } from "next/navigation";
import { LuBriefcase, LuPlus } from "react-icons/lu";

const NoneJobContent = () => {
  const router = useRouter();

  return (
    <div className="text-center flex flex-col items-center gap-2 py-12">
      <LuBriefcase className="text-foreground" size={24} />

      <h3 className="text-foreground font-medium text-lg mt-2">
        Henüz iş ilanı yok
      </h3>

      <p className="text-muted-foreground text-sm leading-relaxed w-56">
        İlk ilanınızı oluşturarak yetenekli adaylara ulaşmaya başlayın.
      </p>

      <CustomButton
        className="py-2! px-3 flex items-center gap-2 whitespace-nowrap rounded-lg! text-sm font-medium mt-6"
        handleClick={() => router.push("/hesabim/is-paylas")}
      >
        <LuPlus />
        İlk İlanı Oluştur
      </CustomButton>
    </div>
  );
};

export default NoneJobContent;
