import CustomButton from "@/shared/components/ui/CustomButton";
import Success from "@/shared/components/ui/Success";
import useCreateArray from "@/shared/hooks/useCreateArray";
import React, { useRef, useState } from "react";
import { GrSecure } from "react-icons/gr";

const OtpVerification = () => {
  const otpFields = useCreateArray(6);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));

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
        <div className="flex max-sm:flex-wrap min-[1026px]:justify-between max-[1026px]:justify-center max-[1026px]:gap-4 my-10 overflow-auto gap-x-4 modal-scrollbar">
          {otpFields.map((field, index) => (
            <input
              type="text"
              inputMode="numeric"
              maxLength={1}
              key={field}
              ref={(el) => {
                otpRefs.current[index] = el;
              }}
              className="w-[71px] h-[71px] !px-4 rounded-[20px] none-spin-button text-2xl text-[#757575] text-center border-[1.4] border-[#DDDDDD] focus:!border-[var(--primary-color)] focus:!border-2 transition-colors duration-300 outline-none"
              onChange={(e) => handleOtpInputChange(e, index)}
              onKeyDown={(e) => handleOtpInputKeyDown(e, index)}
            />
          ))}
        </div>

        <CustomButton type="button" text="Doğrula" className="w-full" />
      </form>
    </>
  );
};

export default OtpVerification;
