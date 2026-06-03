import CustomButton from "@/shared/components/ui/CustomButton";
import { AppDispatch, RootState } from "@/shared/redux/store";
import { BsCameraVideo } from "react-icons/bs";
import { LuBuilding2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { clearError, setType } from "../interviewSchedulerSlice";
import { cn } from "@/shared/libs/utils";

type PickerType = "online" | "in_person";

const getButtonClassName = (
  buttonType: PickerType,
  selectedType: PickerType | null,
) => {
  return cn(
    "flex justify-center items-center gap-2 border rounded-lg! py-2.5! px-3 text-sm font-medium bg-transparent! border-border",
    selectedType === buttonType
      ? "text-[#0073d5]! border-[#0073d5]! bg-primary/5!"
      : "text-muted-foreground! hover:border-foreground/20! hover:text-foreground!",
  );
};

const InterviewTypePicker = () => {
  const dispatch = useDispatch<AppDispatch>();
  const type = useSelector((state: RootState) => state.interviewScheduler.type);

  const handleClick = (type: PickerType) => {
    dispatch(setType(type));
    dispatch(clearError("meetingLink"));
    dispatch(clearError("location"));
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <CustomButton
        className={getButtonClassName("online", type)}
        handleClick={() => handleClick("online")}
      >
        <BsCameraVideo size={16} strokeWidth={0.5} />
        Online
      </CustomButton>

      <CustomButton
        className={getButtonClassName("in_person", type)}
        handleClick={() => handleClick("in_person")}
      >
        <LuBuilding2 size={16} />
        Yüz Yüze
      </CustomButton>
    </div>
  );
};

export default InterviewTypePicker;
