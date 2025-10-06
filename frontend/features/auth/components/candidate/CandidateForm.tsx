import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { GrSecure } from "react-icons/gr";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { RiUserLine } from "react-icons/ri";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import CustomButton from "@/shared/components/ui/CustomButton";
import AuthCheckbox from "@/shared/components/ui/CustomCheckbox";
import GoogleAuth from "../GoogleAuth";
import CustomInput from "@/shared/components/ui/CustomInput";
import { AuthFormProps } from "../../../../shared/types/signup-form.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupSchemaValue } from "../../schema/SignupSchema";
import { useCreateCandidateMutation } from "../../services/auth-service";
import useAuth from "../../hooks/useAuth";
import { CANDIDATE_FORM_FIELDS } from "./formValues";

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap",
});

const CandidateForm = ({ setTermsModal }: AuthFormProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [confirmHidePassword, setConfirmHidePassword] = useState<boolean>(true);
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: CANDIDATE_FORM_FIELDS,
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
  });
  const [createUser] = useCreateCandidateMutation();
  const { manageAuthApi } = useAuth();

  const onSubmit = async (data: SignupSchemaValue) => {
    const { name, surname, email, password } = data;

    if (pathname === "/aday-uye-ol") {
      await manageAuthApi(
        () =>
          createUser({
            fullname: `${name} ${surname}`,
            email: String(email),
            password: String(password),
          }).unwrap(),
        reset,
        {
          case: "This email address is already in use.",
          message: "Girdiğiniz e-posta adresi kullanılmakta.",
        }
      );
    }

    //  else {
    //   const response = await axios.post(
    //     "api/firebase/candidate-login",
    //     JSON.stringify({
    //       email: email,
    //       password: password,
    //     })
    //   );

    //   const data = await response.data;

    //   if (data.user) {
    //     toast.success("Giriş başarılı!");
    //     setTimeout(() => {
    //       router.replace("/");
    //     }, 2000);
    //   }

    //   switch (data.message) {
    //     case "Firebase: Error (auth/invalid-credential).":
    //       return toast.error(
    //         "Giriş bilgileriniz geçersiz. Lütfen e-posta adresinizi ve şifrenizi kontrol edip tekrar deneyin."
    //       );
    //     case "Firebase: Error (auth/too-many-requests).":
    //       return toast.error(
    //         "Çok fazla yanlış giriş yaptınız. Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
    //         { duration: 5000 }
    //       );
    //   }

    //   await signInWithEmailAndPassword(auth, email, password);
    // }
  };

  return (
    <section
      className={`form__wrapper relative overflow-auto self-center ${
        inter.className
      } ${
        pathname === "/aday-uye-ol"
          ? "max-[376px]:max-h-full max-[376px]:h-[550px] max-[321px]:h-[465px] min-[1026px]:py-[35.4px] min-[1026px]:h-screen"
          : ""
      }`}
    >
      <div>
        <h1 className="text-[32px] max-[400px]:text-[24px] text-[#2E3139] font-bold">
          {pathname === "/aday-uye-ol" ? "Şimdi Başlayın" : "Tekrar Hoş Geldin"}
        </h1>
        <p className="text-[#425583] mt-1.5 text-sm max-[400px]:text-xs">
          {pathname === "/aday-uye-ol"
            ? "NextHire ile yeni iş fırsatlarını yakalayın!"
            : "NextHire ile kariyer yolculuğuna devam etmek için giriş yap."}
        </p>
      </div>

      <form
        className="min-lg:pr-40 max-[1026px]:p-0 ps-0 flex flex-col gap-3 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        {pathname === "/aday-uye-ol" && (
          <div className="flex gap-4">
            <CustomInput
              placeholder="Adınızı girin"
              label="Adınız"
              icon={<RiUserLine />}
              readOnly={isSubmitting}
              error={errors.name?.message}
              {...register("name")}
            />

            <CustomInput
              placeholder="Soyadınızı girin"
              label="Soyadınız"
              icon={<RiUserLine />}
              readOnly={isSubmitting}
              error={errors.surname?.message}
              {...register("surname")}
            />
          </div>
        )}

        <CustomInput
          placeholder="E-posta adresinizi girin"
          label="E-posta"
          icon={<MdOutlineEmail />}
          readOnly={isSubmitting}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="flex flex-col">
          <CustomInput
            placeholder={
              pathname === "/aday-uye-ol"
                ? "Şifrenizi oluşturun"
                : "Şifrenizi girin"
            }
            type={hidePassword ? "password" : "text"}
            label="Şifre"
            icon={<GrSecure />}
            extraIcon={hidePassword ? <VscEyeClosed /> : <VscEye />}
            handleClickPasswordDisplay={() => setHidePassword(!hidePassword)}
            readOnly={isSubmitting}
            error={errors.password?.message}
            {...register("password")}
          />
          {pathname === "/aday-giris" && (
            <Link
              href="/sifre-sifirla"
              className="text-[#4045EF] text-sm mt-4 w-max self-end"
            >
              Şifremi unuttum
            </Link>
          )}
        </div>

        {pathname === "/aday-uye-ol" && (
          <>
            <CustomInput
              placeholder="Şifrenizi onaylayın"
              type={confirmHidePassword ? "password" : "text"}
              label="Şifre onayla"
              icon={<GrSecure />}
              extraIcon={confirmHidePassword ? <VscEyeClosed /> : <VscEye />}
              handleClickPasswordDisplay={() =>
                setConfirmHidePassword(!confirmHidePassword)
              }
              readOnly={isSubmitting}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div>
              <div className="flex items-center gap-2">
                <AuthCheckbox
                  handleChange={(e) => {
                    const checked = e.target.checked;
                    setValue("checkbox", checked);
                  }}
                  isSubmitting={isSubmitting}
                  values={watch("checkbox")}
                  {...register("checkbox")}
                />

                <p className="text-sm cursor-default select-none">
                  <span
                    className="text-[#4045EF] cursor-pointer"
                    onClick={() => setTermsModal && setTermsModal(true)}
                  >
                    Kullanım Şartları&lsquo;nı{" "}
                  </span>
                  <label htmlFor="checkbox">kabul ediyorum.</label>
                </p>
              </div>

              {!watch("checkbox") ? (
                <div className="text-[#D91B1B] text-xs mt-1">
                  {errors.checkbox?.message}
                </div>
              ) : null}
            </div>
          </>
        )}

        <CustomButton
          isSubmitting={isSubmitting}
          text={pathname === "/aday-uye-ol" ? "Kayıt ol" : "Giriş yap"}
        />
      </form>

      <div className="min-[1026px]:mr-40 mt-5 relative flex justify-center items-center max-[1026px]:hidden">
        <div className="w-full h-[1px] bg-[#D3E0FE]"></div>
        <span className="absolute bg-white p-3 py-1">veya</span>
      </div>

      <GoogleAuth />

      <div className="min-[1026px]:mr-40">
        <p className="text-[#425583] font-medium text-sm mt-6 text-center">
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
    </section>
  );
};

export default CandidateForm;
