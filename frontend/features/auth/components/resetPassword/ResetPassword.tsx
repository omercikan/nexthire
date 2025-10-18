import CustomButton from "@/shared/components/ui/CustomButton";
import CustomInput from "@/shared/components/ui/CustomInput";
import Success from "@/shared/components/ui/Success";
import { zodResolver } from "@hookform/resolvers/zod";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GrSecure } from "react-icons/gr";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { resetPasswordSchema } from "./schema/ResetPasswordSchema";

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
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = () => {};

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

        <CustomButton text="Şifreyi Güncelle" className="w-full mt-6" />
      </form>
    </div>
  );
};

export default ResetPassword;
