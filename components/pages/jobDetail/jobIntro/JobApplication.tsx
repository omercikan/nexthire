import CustomButton from "@/components/ui/CustomButton";
import LoaderSkeleton from "@/components/ui/LoaderSkeleton";
import { AuthContext } from "@/context/authContext";
import { setApplicationModal } from "@/lib/redux/features/touch";
import { AppDispatch } from "@/lib/redux/store";
import { formateDate } from "@/lib/utils/formatDate";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

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
  const applicationDeadline = formateDate(applicationDeadlineDate);
  const [day, month, year] = applicationDeadline.split(".");
  const deadlineDate = new Date(`${year}-${month}-${day}`);
  const today = new Date();
  const isExpired = today > deadlineDate;

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
            isExpired ? "!bg-gray-400 !px-8" : ""
          }`}
          handleClick={handleClick}
        />
      )}
    </>
  );
};

export default JobApplication;
