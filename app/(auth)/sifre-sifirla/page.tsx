"use client";

import React, { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import PasswordImage from "@/public/assets/images/reset-password-thumb.png";
import Image from "next/image";
import AuthInput from "../components/AuthInput";
import { HiOutlineArrowLeft, HiOutlineMail } from "react-icons/hi";
import { GrSecure } from "react-icons/gr";
import { ResetPasswordSchema } from "../schema/ResetPasswordSchema";
import { ResetPasswordField } from "@/types";
import CustomButton from "@/components/Button";
import axios from "axios";
import Success from "@/components/Success";
import { HiMiniCheckCircle } from "react-icons/hi2";
import Link from "next/link";
import toast from "react-hot-toast";
import GoBack from "@/components/GoBack";

const ResetPassword = () => {
  const [sendingEmail, setSendingEmail] = useState<boolean>(false);

  const onSubmit = async (
    values: ResetPasswordField,
    actions: FormikHelpers<ResetPasswordField>
  ): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await axios.post(
      "/api/firebase/reset-password",
      JSON.stringify({ email: values.email })
    );

    const data = await response.data;

    if (data.status === 200) {
      setSendingEmail(true);
    }

    switch (data.message) {
      case "Firebase: Error (auth/too-many-requests).":
        toast.error(
          "Çok sık talep gönderildi. Lütfen biraz bekleyip tekrar deneyin."
        );
        break;
    }

    actions.resetForm();
  };

  return (
    <div className="flex max-[1026px]:flex-col gap-x-20 max-[1026px]:bg-[#F1F6FF] max-[1026px]:h-screen">
      <GoBack
        icon={
          <HiOutlineArrowLeft
            className="text-[28px] max-[1026px]:text-[46px]"
            color="899CC9"
          />
        }
        url="/aday-giris"
        position="top-[60px] right-[calc(50%-40px)] max-[1026px]:left-7 go-back-query"
      />

      <div className="flex-[1] max-[1026px]:absolute max-[1026px]:-top-[50%] w-screen h-screen shadow-2xl drop-shadow-2xl">
        <Image
          src={PasswordImage}
          alt="Şifremi Sıfırla"
          quality={100}
          priority
          unoptimized={false}
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

            <Link href="/aday-giris">
              <button className="custom__button w-[calc(100%-80px)] max-[1026px]:w-full mt-12">
                Giriş Yap
              </button>
            </Link>
          </>
        ) : (
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

            <Formik
              initialValues={{
                email: "",
              }}
              onSubmit={onSubmit}
              validationSchema={ResetPasswordSchema}
            >
              {({ isSubmitting, values, handleChange }) => (
                <Form className="px-20 max-[1026px]:p-0 ps-0 flex flex-col gap-3 mt-10">
                  <AuthInput
                    label="E-posta"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="E-posta adresinizi girin"
                    icon={<HiOutlineMail />}
                    readOnly={isSubmitting}
                  />

                  <CustomButton isSubmitting={isSubmitting} text="Gönder" />
                </Form>
              )}
            </Formik>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
