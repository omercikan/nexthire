import Link from "next/link";
import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";
import AuthInput from "./AuthInput";
import { MdOutlineEmail } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { RiUserLine } from "react-icons/ri";
import { Form, Formik, FormikHelpers } from "formik";
import { Inter } from "next/font/google";
import { SignupSchema } from "../schema/SignupSchema";
import axios from "axios";
import toast from "react-hot-toast";
import GoogleAuth from "./GoogleAuth";
import { usePathname, useRouter } from "next/navigation";
import { FormFields, AuthFormProps } from "@/types";
import { LoginSchema } from "../schema/LoginSchema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/api/firebase/firebaseConfig";
import CustomButton from "@/components/Button";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const AuthForm = ({ setTermsModal }: AuthFormProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [confirmHidePassword, setConfirmHidePassword] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = async (
    values: FormFields,
    actions: FormikHelpers<FormFields>
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { name, surname, email, password } = values;

    if (pathname === "/aday-uye-ol") {
      const response = await axios.post(
        "api/firebase/candidate-signup",
        JSON.stringify({
          name: name,
          surname: surname,
          acceptedTerms: `${name} ${surname} adlı Kullanıcı, kullanım şartlarını kabul ettiğini ve bu şartlara uygun hareket edeceğini beyan eder.`,
          email: email,
          password: password,
        })
      );

      const data = await response.data;

      if (data.user) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Kayıt başarılı!");
        setTimeout(() => {
          router.replace("/aday-giris");
        }, 2000);
      }

      switch (data.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          return toast.error("Bu e-posta adresi zaten kullanımda.");
      }

      actions.resetForm();
    } else {
      const response = await axios.post(
        "api/firebase/candidate-login",
        JSON.stringify({
          email: email,
          password: password,
        })
      );

      const data = await response.data;

      if (data.user) {
        toast.success("Giriş başarılı!");
        setTimeout(() => {
          router.replace("/");
        }, 2000);
      }

      switch (data.message) {
        case "Firebase: Error (auth/invalid-credential).":
          return toast.error(
            "Giriş bilgileriniz geçersiz. Lütfen e-posta adresinizi ve şifrenizi kontrol edip tekrar deneyin."
          );
        case "Firebase: Error (auth/too-many-requests).":
          return toast.error(
            "Çok fazla yanlış giriş yaptınız. Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
            {
              duration: 5000,
            }
          );
      }

      await signInWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <div
      className={`form__wrapper relative ${
        pathname === "/aday-uye-ol"
          ? "max-[376px]:max-h-full max-[376px]:h-[550px] max-[321px]:h-[465px]"
          : ""
      } modal-scrollbar self-center`}
    >
      <div className={`${inter.className}`}>
        <h1 className="text-[32px] max-[400px]:text-[24px] text-[#2E3139] font-bold">
          {pathname === "/aday-uye-ol" ? "Şimdi Başlayın" : "Tekrar Hoş Geldin"}
        </h1>
        <p className="text-[#425583] mt-1.5 text-sm max-[400px]:text-xs">
          {pathname === "/aday-uye-ol"
            ? "NextHire ile yeni iş fırsatlarını yakalayın!"
            : "NextHire ile kariyer yolculuğuna devam etmek için giriş yap."}
        </p>
      </div>

      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          confirmPassword: "",
          checkbox: false,
        }}
        onSubmit={onSubmit}
        validationSchema={
          pathname === "/aday-uye-ol" ? SignupSchema : LoginSchema
        }
      >
        {({ isSubmitting, values, touched, errors, handleChange }) => (
          <Form className="pe-40 max-[1026px]:p-0 ps-0 flex flex-col gap-3 mt-10">
            {pathname === "/aday-uye-ol" && (
              <div className="flex gap-3">
                <AuthInput
                  placeholder="Adınızı girin"
                  name="name"
                  label="Adınız"
                  icon={<RiUserLine />}
                  value={values.name}
                  onChange={handleChange}
                  readOnly={isSubmitting}
                />

                <AuthInput
                  placeholder="Soyadınızı girin"
                  name="surname"
                  label="Soyadınız"
                  icon={<RiUserLine />}
                  value={values.surname}
                  onChange={handleChange}
                  readOnly={isSubmitting}
                />
              </div>
            )}

            <AuthInput
              placeholder="E-posta adresinizi girin"
              name="email"
              label="E-posta"
              icon={<MdOutlineEmail />}
              value={values.email}
              onChange={handleChange}
              readOnly={isSubmitting}
            />

            <AuthInput
              placeholder={
                pathname === "/aday-uye-ol"
                  ? "Şifrenizi oluşturun"
                  : "Şifrenizi girin"
              }
              type={hidePassword ? "password" : "text"}
              name="password"
              label="Şifre"
              icon={<GrSecure />}
              extraIcon={hidePassword ? <VscEyeClosed /> : <VscEye />}
              handleClickPasswordDisplay={() => setHidePassword(!hidePassword)}
              value={values.password}
              onChange={handleChange}
              readOnly={isSubmitting}
            />
            {pathname === "/aday-giris" && (
              <Link
                href="/sifre-sifirla"
                className="text-[#4045EF] text-sm text-end"
              >
                Şifremi unuttum
              </Link>
            )}

            {pathname === "/aday-uye-ol" && (
              <>
                <AuthInput
                  placeholder="Şifrenizi onaylayın"
                  type={confirmHidePassword ? "password" : "text"}
                  name="confirmPassword"
                  label="Şifre onayla"
                  icon={<GrSecure />}
                  extraIcon={
                    confirmHidePassword ? <VscEyeClosed /> : <VscEye />
                  }
                  handleClickPasswordDisplay={() =>
                    setConfirmHidePassword(!confirmHidePassword)
                  }
                  value={values.confirmPassword}
                  onChange={handleChange}
                  readOnly={isSubmitting}
                />

                <div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex justify-center items-center w-3.5 h-3.5">
                      <BsCheck
                        className="absolute pointer-events-none"
                        color="fff"
                      />
                      <input
                        type="checkbox"
                        name="checkbox"
                        id="acceptText"
                        className={`custom-checkbox ${
                          errors.checkbox ? "!border-red-400" : ""
                        }`}
                        checked={values.checkbox}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <p className="text-sm cursor-default select-none">
                      <span
                        className="text-[#4045EF] cursor-pointer"
                        onClick={() => setTermsModal && setTermsModal(true)}
                      >
                        Kullanım Şartları&lsquo;nı{" "}
                      </span>
                      <label htmlFor="acceptText">kabul ediyorum.</label>
                    </p>
                  </div>

                  {touched.checkbox && errors.checkbox ? (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.checkbox}
                    </div>
                  ) : null}
                </div>
              </>
            )}

            <CustomButton
              isSubmitting={isSubmitting}
              text={pathname === "/aday-uye-ol" ? "Kayıt ol" : "Giriş yap"}
            />
          </Form>
        )}
      </Formik>

      <div className="min-[1026px]:me-40 mt-5 relative flex justify-center items-center max-[1026px]:hidden">
        <div className="w-full h-[1px] bg-[#D3E0FE]"></div>
        <span className="absolute bg-white p-3 py-1">veya</span>
      </div>

      <GoogleAuth />

      <div className="min-[1026px]:me-40">
        <p className="text-[#425583] font-medium text-sm mt-8 text-center">
          {pathname === "/aday-uye-ol"
            ? "Zaten hesabınız var mı? "
            : "Hesabın yok mu? "}
          <Link
            href={pathname === "/aday-uye-ol" ? "/aday-giris" : "/aday-uye-ol"}
            className="text-[#4045EF]"
          >
            {pathname === "/aday-uye-ol" ? "Giriş Yap" : "Kaydol"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
