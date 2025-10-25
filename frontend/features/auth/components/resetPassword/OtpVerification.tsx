import CustomButton from "@/shared/components/ui/CustomButton";
import Success from "@/shared/components/ui/Success";
import useCreateArray from "@/shared/hooks/useCreateArray";
import React, { useRef, useState } from "react";
import { GrSecure } from "react-icons/gr";
import {
  useRefreshOtpMutation,
  useVerifyOtpMutation,
} from "../../services/auth-service";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const OtpVerification = ({
  setIsSuccessOtp,
}: {
  setIsSuccessOtp: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const otpFields = useCreateArray(6);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const verifyToken = useSearchParams().get("vt");
  const [isExpiredOtp, setIsExpiredOtp] = useState(false);
  const [emptyIndex, setEmptyIndex] = useState(Array(6).fill("0"));
  const [refreshOtp] = useRefreshOtpMutation();
  const { manageAuthApi } = useAuth();

  const handleOtpInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return (otpRefs.current[index]!.value = "");
    }

    if (value) {
      otpRefs.current[index]!.value = value;
      otpRefs.current[index + 1]?.focus();
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
    }
  };

  const handleOtpInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otpValues[index]) {
        const newOtp = [...otpValues];
        newOtp[index] = "";
        setOtpValues(newOtp);
      } else if (index > 0) {
        otpRefs.current[index - 1]?.focus();

        const newOtp = [...otpValues];
        newOtp[index - 1] = "";
        setOtpValues(newOtp);
      }
    }
  };

  const handleOtpVerification = async () => {
    const otpCode = otpValues.join("");

    try {
      setEmptyIndex(otpValues);
      if (otpCode.length === 6 && verifyToken!.length === 20) {
        const verifyOtpRes = await verifyOtp({
          token: String(verifyToken),
          code: otpCode,
        }).unwrap();

        if (verifyOtpRes) {
          setIsSuccessOtp(true);
          toast.dismiss();
        }
      }
    } catch (err) {
      const error = err as { data: { message: string } };

      switch (error.data.message) {
        case "OTP not found":
          return toast.error("Geçersiz doğrulama bağlantısı.", {
            id: "otpError",
          });
        case "OTP expired":
          setIsExpiredOtp(true);
          return toast.error(
            "Doğrulama kodunun süresi doldu. Yeni bir kod isteyebilirsiniz.",
            { id: "otpError" }
          );
        default:
          return toast.error("Geçersiz doğrulama kodu.", { id: "otpError" });
      }
    }
  };

  const handleRefreshOtp = async () => {
    const refreshOtpRes = await manageAuthApi(
      () => refreshOtp({ token: String(verifyToken) }).unwrap(),
      () => false,
      { case: "OTP not found", message: "Geçersiz doğrulama bağlantısı." },
      false
    );

    if (refreshOtpRes) {
      const email = refreshOtpRes.email.split("@");
      const [name, domain] = email;

      const maskedEmail = `${name.slice(0, 2)}${"*".repeat(
        name.length - 2
      )}${name.slice(length - 2)}@${domain}`;

      toast.success(
        `Yeni Doğrulama bağlantısı ${maskedEmail} adresine başarıyla gönderildi.`,
        { duration: 3000 }
      );
      toast.dismiss("otpError");
      setIsExpiredOtp(false);
    }
  };

  return (
    <>
      <Success
        icon={
          <GrSecure
            className="bg-[#F1F6FF] p-4 rounded-full"
            color="899CC9"
            size={56}
          />
        }
        title="Doğrulama Kodunu Gir"
        subtitle="E-postana gönderdiğimiz 6 haneli kodu aşağıya yaz."
      />

      <form className="min-[1026px]:pr-20">
        <div
          className={`flex max-sm:flex-wrap min-[1026px]:justify-between max-[1026px]:justify-center max-[1026px]:gap-4 overflow-auto gap-x-4 modal-scrollbar ${
            isExpiredOtp ? "mt-10" : "my-10"
          }`}
        >
          {otpFields.map((field, index) => (
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              key={field}
              ref={(el) => {
                otpRefs.current[index] = el;
              }}
              className={`w-[71px] h-[71px] !px-4 rounded-[20px] none-spin-button text-2xl text-[#757575] text-center border-[1.4] border-[#DDDDDD] focus:border-[var(--primary-color)] focus:border-2 transition-colors duration-300 outline-none ${
                emptyIndex[index] === "" ? "!border-red-500 !border-2" : ""
              }`}
              onChange={(e) => handleOtpInputChange(e, index)}
              onKeyDown={(e) => handleOtpInputKeyDown(e, index)}
            />
          ))}
        </div>

        {isExpiredOtp && (
          <button
            className="my-5 float-end text-[var(--primary-color)] text-sm"
            type="button"
            onClick={handleRefreshOtp}
          >
            ↻ Tekrar kod gönder
          </button>
        )}

        <CustomButton
          type="button"
          text="Doğrula"
          className="w-full"
          handleClick={handleOtpVerification}
          isSubmitting={isLoading}
        />
      </form>
    </>
  );
};

export default OtpVerification;
