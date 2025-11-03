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
import { useSendResetEmailMutation } from "../../services/auth-service";
import { HiMiniCheckCircle } from "react-icons/hi2";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(emailSchema),
  });
  const [sendResetEmail, { isSuccess, reset, error }] =
    useSendResetEmailMutation();

  const onSubmit: SubmitHandler<ResetPasswordField> = async (values) => {
    try {
      await sendResetEmail({ email: values.email }).unwrap();
    } catch (err) {
      const error = err as { data: { message: string } } & { data: string };

      if (!error.data?.message) {
        toast.error(error.data, { id: "resetEmailToast" });
      }
    }
  };

  return (
    <>
      {!isSuccess && (error as { status: number })?.status !== 404 ? (
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
          </form>{" "}
        </>
      ) : (
        <div className="lg:mr-20">
          <Success
            icon={
              <HiMiniCheckCircle
                className="rounded-full w-full"
                color="17A31A"
                size={66}
              />
            }
            title="Şifre Sıfırlama Talebi Alındı!"
            subtitle={`Şifre sıfırlama bağlantısı ${watch(
              "email"
            )} adresine başarıyla gönderildi. Lütfen e-postanızı kontrol edin.`}
          />

          <CustomButton
            text="Geri Dön"
            className="custom__button w-full mt-4"
            handleClick={() => reset()}
          />
        </div>
      )}
    </>
  );
};

export default EmailVerification;
