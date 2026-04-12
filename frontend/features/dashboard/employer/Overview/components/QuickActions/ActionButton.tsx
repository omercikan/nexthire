import CustomButton from "@/shared/components/ui/CustomButton";
import { quickActionIcons } from "../../icons/quickActions";
import { IconType } from "react-icons/lib";
import { useRouter } from "next/navigation";

interface ActionButtonProps {
  title: string;
  description: string;
  icon: IconType;
  route: string;
}

const ActionButton = ({
  title,
  description,
  icon: Icon,
  route,
}: ActionButtonProps) => {
  const router = useRouter();

  const handleNavigate = (route: string) => router.push(route);

  return (
    <CustomButton
      className="group bg-[#f7f8fa]! hover:bg-[#0073d5]! border border-[#e2e5e8] rounded-[10px]! py-4! px-3! flex items-center justify-between text-start"
      handleClick={() => handleNavigate(route)}
    >
      <div className="flex items-center gap-4">
        <div className="bg-[#E6F1FB] text-[#0073d5] group-hover:text-[#f8f8f8] group-hover:bg-[#f8f8f8]/20 p-2 rounded-lg w-max">
          <Icon />
        </div>

        <div>
          <span className="font-medium text-[#0f171f] group-hover:text-[#f8f8f8] text-sm">
            {title}
          </span>

          <p className="text-[#5b646f] group-hover:text-[#AED9FA] text-xs font-medium">
            {description}
          </p>
        </div>
      </div>

      <quickActionIcons.ArrowRight className="text-[#5b646f] group-hover:text-[#D9EBF9]" />
    </CustomButton>
  );
};

export default ActionButton;
