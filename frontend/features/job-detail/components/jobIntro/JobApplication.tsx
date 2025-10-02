import CustomButton from "@/shared/components/ui/CustomButton";
import { AuthContext } from "@/features/auth/authContext";
import { AppDispatch } from "@/shared/redux/store";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { setApplicationModal } from "@/shared/redux/slices/touch";
import LoaderSkeleton from "@/shared/components/ui/LoaderSkeleton";

const JobApplication = ({
  isLoading,
  applicationDeadlineDate,
}: {
  isLoading: boolean;
  applicationDeadlineDate: string;
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
      {isLoading ? (
        <Typography variant="button">
          <LoaderSkeleton
            animationType="wave"
            length={1}
            variant="rectangular"
            sxClass={{
              borderRadius: "8px",
              height: "50px",
              width: "215.5px",
            }}
          />
        </Typography>
      ) : (
        <CustomButton
          text={isExpired ? "Başvuru Süresi Doldu" : "Şimdi Başvur"}
          isSubmitting={false}
          className={`w-full !rounded-lg px-16 whitespace-nowrap disabled:!text-[#4045ef] ${
            isExpired ? "!bg-gray-500 !px-8" : ""
          }`}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default JobApplication;
