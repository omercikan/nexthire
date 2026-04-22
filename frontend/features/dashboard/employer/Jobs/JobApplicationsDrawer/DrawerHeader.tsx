import CustomButton from "@/shared/components/ui/CustomButton";
import { IoCloseOutline } from "react-icons/io5";

const DrawerHeader = ({
  handleCloseDrawer,
}: {
  handleCloseDrawer: () => void;
}) => {
  return (
    <div className="px-5 py-4 border-b border-b-border">
      <div className="flex items-center justify-between">
        <h2 className="text-foreground font-semibold">
          İnsan Kaynakları Uzmanı
        </h2>
        <CustomButton
          className="bg-transparent! p-0! text-foreground!"
          handleClick={handleCloseDrawer}
        >
          <IoCloseOutline size={18} />
        </CustomButton>
      </div>

      <p className="text-muted-foreground text-sm mt-1.5">2 Başvuru</p>
    </div>
  );
};

export default DrawerHeader;
