import CustomButton from "@/shared/components/ui/CustomButton";
import CustomInput from "@/shared/components/ui/CustomInput";
import Success from "@/shared/components/ui/Success";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrSecure } from "react-icons/gr";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import {
  resetPasswordSchema,
  ResetPasswordType,
} from "./schema/ResetPasswordSchema";
import { useResetPasswordMutation } from "../../services/auth-service";
import { useRouter, useSearchParams } from "next/navigation";
import useAuth from "../../hooks/useAuth";

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap",
});

const ResetPassword = () => {
  const [hidePassword, setHidePassword] = useState({
    password: true,
    confirmPassword: true,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });
  const [resetPassword] = useResetPasswordMutation();
  const { manageAuthApi } = useAuth();
  const verificationToken = useSearchParams().get("vt");
  const router = useRouter();

  const onSubmit: SubmitHandler<ResetPasswordType> = async (values) => {
    const { confirmPassword } = values;

    const resetPasswordResponse = await manageAuthApi(
      () =>
        resetPassword({
          token: verificationToken ?? "",
          newPassword: confirmPassword,
        }).unwrap(),
      reset,
      { case: "OTP not found", message: "Doğrulama bağlantısı geçersiz." },
      false
    );

    if (resetPasswordResponse?.role === "candidate") {
      router.push("/aday-giris");
    } else {
      router.push("/isveren-giris");
    }
  };

  const handleClickPasswordDisplay = (state: keyof typeof hidePassword) => {
    setHidePassword((prev) => ({
      ...prev,
      [state]: !hidePassword[state],
    }));
  };

  return (
    <div className={`pr-20 ${inter.className}`}>
      <Success
        icon={
          <GrSecure
            className="bg-[#F1F6FF] p-4 rounded-full"
            color="899CC9"
            size={56}
          />
        }
        title="Yeni Şifre Belirleme"
        subtitle="Hesabınızın güvenliği için yeni bir şifre oluşturun"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 flex flex-col gap-4"
      >
        <CustomInput
          {...register("password")}
          error={errors.password?.message}
          placeholder="Şifre"
          icon={<GrSecure />}
          type={hidePassword.password ? "password" : "text"}
          extraIcon={hidePassword.password ? <VscEyeClosed /> : <VscEye />}
          handleClickPasswordDisplay={() =>
            handleClickPasswordDisplay("password")
          }
        />

        <CustomInput
          {...register("confirmPassword", {
            required: "Lütfen şifrenizi tekrar girin",
          })}
          error={errors.confirmPassword?.message}
          placeholder="Şifre Tekrarı"
          icon={<GrSecure />}
          type={hidePassword.confirmPassword ? "password" : "text"}
          extraIcon={
            hidePassword.confirmPassword ? <VscEyeClosed /> : <VscEye />
          }
          handleClickPasswordDisplay={() =>
            handleClickPasswordDisplay("confirmPassword")
          }
        />

        <CustomButton
          text="Şifreyi Güncelle"
          isSubmitting={isSubmitting}
          className="w-full mt-6"
        />
      </form>
    </div>
  );
};

export default ResetPassword;
