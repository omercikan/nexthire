import CustomButton from "@/shared/components/ui/CustomButton";
import { cn } from "@/shared/libs/utils";
import Tooltip from "@mui/material/Tooltip";
import { IconType } from "react-icons/lib";

function ApplicationActionButton({
  icon: Icon,
  isActive = false,
  activeIconColor = "",
  activeTooltip = "",
  inActiveTooltip,
  className,
  onClick,
}: {
  icon: IconType;
  isActive?: boolean;
  activeIconColor?: string;
  activeTooltip?: string;
  inActiveTooltip: string;
  className: string;
  onClick?: () => void;
}) {
  return (
    <div>
      <Tooltip
        title={isActive ? activeTooltip : inActiveTooltip}
        arrow
        slotProps={{
          tooltip: {
            sx: {
              backgroundColor: "#000",
              borderRadius: "8px",
              padding: "6px 10px",
              fontWeight: "normal",
            },
          },
          arrow: { sx: { color: "#000" } },
        }}
      >
        <span className="inline-flex">
          <CustomButton
            className={cn(
              "bg-transparent! p-0! text-muted-foreground!",
              className,
            )}
            handleClick={onClick}
          >
            <Icon
              style={{ fill: isActive ? "currentColor" : "" }}
              size={14}
              color={isActive ? activeIconColor : ""}
            />
          </CustomButton>
        </span>
      </Tooltip>
    </div>
  );
}

export default ApplicationActionButton;
