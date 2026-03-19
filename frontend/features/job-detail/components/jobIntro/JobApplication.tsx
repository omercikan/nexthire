import CustomButton from "@/shared/components/ui/CustomButton";
import { AuthContext } from "@/features/auth/authContext";
import { AppDispatch } from "@/shared/redux/store";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { setApplicationModal } from "@/shared/redux/slices/touch";
import { ApplicationMethod } from "@/shared/types/jobDetail";
import Image from "next/image";
import { IoMailOutline } from "react-icons/io5";
import { LuExternalLink } from "react-icons/lu";
import NextHire from "@/public/assets/logo.png";

const ApplicationMethods = {
  NextHire: <Image src={NextHire} alt="NextHire" width={18} height={18} />,
  email: <IoMailOutline />,
  external_link: <LuExternalLink />,
};

const JobApplication = ({
  applicationDeadlineDate,
  applicationMethod,
  applicationAddress,
}: {
  applicationDeadlineDate: Dayjs;
  applicationMethod: ApplicationMethod;
  applicationAddress: string;
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

    switch (applicationMethod) {
      case "email":
        window.location.href = `mailto:${applicationAddress}`;
        break;
      case "external_link":
        window.open(applicationAddress, "_blank");
        break;
      case "NextHire":
        if (user?.role === "candidate") {
          dispatch(setApplicationModal(true));
          document.body.style.overflow = "hidden";
        } else {
          router.push("/aday-giris");
        }
        break;
      default:
        toast.error("Geçersiz başvuru yöntemi");
    }
  };

  return (
    <>
      <CustomButton
        isSubmitting={false}
        className={`w-full rounded-lg! px-16 whitespace-nowrap disabled:text-[#4045ef]! ${
          isExpired ? "bg-gray-500! px-8!" : ""
        }`}
        handleClick={handleClick}
      >
        {isExpired ? (
          "Başvuru Süresi Doldu"
        ) : (
          <div className="flex items-center gap-2">
            {ApplicationMethods[applicationMethod]} Şimdi Başvur
          </div>
        )}
      </CustomButton>
    </>
  );
};

export default JobApplication;
