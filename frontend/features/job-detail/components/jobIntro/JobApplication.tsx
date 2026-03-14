import CustomButton from "@/shared/components/ui/CustomButton";
import { AuthContext } from "@/features/auth/authContext";
import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { setApplicationModal } from "@/shared/redux/slices/touch";

const JobApplication = ({
  applicationDeadlineDate,
}: {
  applicationDeadlineDate: Dayjs;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const deadlineDate = dayjs(applicationDeadlineDate);
  const isExpired = dayjs().isAfter(deadlineDate, "day");

  const handleClick = () => {
    if (isExpired) {
      return toast("Bu ilana başvuru süresi dolmuştur.", {
        id: "deadline-expired",
        icon: "⏰",
      });
    }

    if (user?.role === "candidate") {
      dispatch(setApplicationModal(true));
      document.body.style.overflow = "hidden";
    } else {
      router.push("/aday-giris");
    }
  };

  return (
    <>
      <CustomButton
        text={isExpired ? "Başvuru Süresi Doldu" : "Şimdi Başvur"}
        isSubmitting={false}
        className={`w-full rounded-lg! px-16 whitespace-nowrap disabled:text-[#4045ef]! ${
          isExpired ? "bg-gray-500! px-8!" : ""
        }`}
        handleClick={handleClick}
      />
    </>
  );
};

export default JobApplication;
