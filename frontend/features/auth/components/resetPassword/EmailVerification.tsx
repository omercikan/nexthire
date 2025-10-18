import CustomButton from "@/shared/components/ui/CustomButton";
import CustomInput from "@/shared/components/ui/CustomInput";
import Success from "@/shared/components/ui/Success";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GrSecure } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { emailSchema } from "./schema/EmailSchema";
import { ResetPasswordField } from "@/shared/types";

const EmailVerification = () => {
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordField> = () => {};

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
        title="Şifrenizi mi unuttunuz?"
        subtitle="Şifrenizi sıfırlamak için e-posta adresinizi girin."
      />

      <form
        className="px-20 max-[1026px]:p-0 ps-0 flex flex-col gap-3 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CustomInput
          label="E-posta"
          placeholder="E-posta adresinizi girin"
          icon={<HiOutlineMail />}
          readOnly={isSubmitting}
          error={errors.email?.message}
          {...register("email")}
        />

        <CustomButton isSubmitting={isSubmitting} text="Gönder" />
      </form>
    </>
  );
};

export default EmailVerification;
