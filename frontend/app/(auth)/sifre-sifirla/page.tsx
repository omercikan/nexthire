/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";
import GoBack from "@/shared/components/ui/GoBack";
import Success from "@/shared/components/ui/Success";
import OtpVerification from "@/features/auth/components/resetPassword/OtpVerification";
import EmailVerification from "@/features/auth/components/resetPassword/EmailVerification";
import ResetPassword from "@/features/auth/components/resetPassword/ResetPassword";

const ResetPasswordAuth = () => {
  const [sendingEmail, _setSendingEmail] = useState<boolean>(false);
  const [isSuccessOtp, _setIsSuccessOtp] = useState(false);
  const token = useSearchParams().get("vt");
  const router = useRouter();

  return (
    <div className="flex max-[1026px]:flex-col gap-x-20 max-[1026px]:bg-[#F1F6FF] max-[1026px]:h-screen">
      <GoBack position="top-[60px] right-[calc(50%-40px)] max-[1026px]:left-7 go-back-query" />

      <div className="flex-[1] max-[1026px]:absolute max-[1026px]:-top-[50%] w-screen h-screen shadow-2xl drop-shadow-2xl">
        <Image
          src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1745237987/reset-password-thumb_w1hg9o.png"
          alt="Şifremi Sıfırla"
          quality={100}
          priority
          unoptimized={false}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="form__wrapper modal-scrollbar self-center">
        {sendingEmail ? (
          <>
            <Success
              icon={
                <HiMiniCheckCircle
                  className="rounded-full"
                  color="17A31A"
                  size={66}
                />
              }
              title="Şifre sıfırlama bağlantısı gönderildi."
              subtitle="E-posta gelmediyse lütfen spam klasörünüzü kontrol edin."
            />

            <button
              className="custom__button w-[calc(100%-80px)] max-[1026px]:w-full mt-12"
              onClick={() => router.back()}
            >
              Giriş Yap
            </button>
          </>
        ) : (
          <>
            {!token && !isSuccessOtp && <EmailVerification />}
            {token && !isSuccessOtp && <OtpVerification />}
            {isSuccessOtp && <ResetPassword />}
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordAuth;
