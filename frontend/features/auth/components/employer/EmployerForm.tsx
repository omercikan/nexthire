"use client";

import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import {
  DistrictsJsonInterface,
  TaxOfficiesJsonInterface,
} from "@/shared/types";
import { usePathname } from "next/navigation";
import { GrSecure } from "react-icons/gr";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Link from "next/link";
import { Inter } from "next/font/google";
import AuthInput from "@/shared/components/ui/CustomInput";
import { formatTurkishPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { setSelectedData } from "@/shared/utils/selectData";
import CustomButton from "@/shared/components/ui/CustomButton";
import AuthCheckbox from "@/shared/components/ui/CustomCheckbox";
import AuthSelect from "@/shared/components/ui/CustomSelect";
import cities from "@/public/data/cities.json";
import { SubmitHandler, useForm } from "react-hook-form";
import { EMPLOYER_FORM_FIELDS } from "./formValues";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmployerFormType,
  EmployerAuthSchema,
} from "../../schema/EmployerAuthSchema";
import RegisteredMessage from "./RegisteredMessage";
import FormHeader from "./FormHeader";
import useAuth from "../../hooks/useAuth";
import {
  useCreateEmployerMutation,
  useLoginEmployerMutation,
} from "../../services/auth-service";
import { Employer } from "@/shared/types/models/employer";

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap",
});

const EmployerForm = () => {
  const [districts, setDistricts] = useState<DistrictsJsonInterface[]>([]);
  const [taxOfficies, setTaxOfficies] = useState<TaxOfficiesJsonInterface[]>(
    []
  );
  const [registered, setRegistered] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const pathname = usePathname();
  const isRegisteredRoute = pathname === "/isveren-kayit";
  const { manageAuthApi } = useAuth();
  const [createEmployer] = useCreateEmployerMutation();
  const [loginEmployer] = useLoginEmployerMutation();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<EmployerFormType>({
    mode: "onChange",
    defaultValues: EMPLOYER_FORM_FIELDS,
    resolver: zodResolver(
      isRegisteredRoute
        ? EmployerAuthSchema.omit({ password: true })
        : EmployerAuthSchema.pick({
            password: true,
            email: true,
          })
    ),
  });

  const onSubmit: SubmitHandler<EmployerFormType> = async (values) => {
    const {
      fullname,
      phone,
      email,
      password,
      companyName,
      city,
      district,
      taxCity,
      taxOffice,
      taxNumber,
      checkboxFirst,
      checkboxSecond,
    } = values;

    if (isRegisteredRoute) {
      const registeredData = {
        fullname,
        phoneNumber: phone,
        email,
        companyName,
        city,
        district,
        taxCity,
        taxOffice,
        taxNumber,
        emailConsent: checkboxFirst,
        personalDataConsent: checkboxSecond,
      };

      const res = await manageAuthApi(
        () => createEmployer(registeredData as Employer).unwrap(),
        reset,
        {
          case: "This email address is already in use.",
          message: "Girdiğiniz e-posta adresi kullanılmakta.",
        },
        false
      );

      if (res) {
        setRegistered(true);
      }
    } else {
      await manageAuthApi(
        () => loginEmployer({ email, password: String(password) }).unwrap(),
        reset,
        {
          case: "Email or Password invalid",
          message: "E-posta veya Şifre hatalı.",
        },
        true,
        "/"
      );
    }
  };

  const handleChangeCheckbox = (
    name: keyof typeof EMPLOYER_FORM_FIELDS,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue(name, e.target.checked);
  };

  return (
    <section
      className={`py-6 px-12 max-sm:px-4 h-[100vh] overflow-auto ${
        inter.className
      } ${registered ? "relative" : ""} ${
        !isRegisteredRoute ? "flex flex-col justify-center" : ""
      } `}
    >
      {registered ? (
        <RegisteredMessage />
      ) : (
        <>
          <FormHeader pathname={pathname} />

          <form
            className="mt-6 flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
          >
            {isRegisteredRoute && (
              <>
                <AuthInput
                  error={errors.fullname?.message}
                  placeholder="Ömer Çıkan"
                  label="Ad Soyad"
                  icon={<MdOutlineEmail />}
                  readOnly={isSubmitting}
                  {...register("fullname")}
                />

                <div className="my-4">
                  <AuthInput
                    placeholder="(0555) 555 55 55"
                    label="Telefon"
                    type="tel"
                    icon={<MdOutlineEmail />}
                    {...register("phone")}
                    value={formatTurkishPhoneNumber(watch("phone") as string)}
                    error={errors.phone?.message}
                    readOnly={isSubmitting}
                  />
                </div>
              </>
            )}

            <AuthInput
              error={errors.email?.message}
              placeholder={
                isRegisteredRoute ? "ornek@gmail.com" : "E-posta adresiniz"
              }
              label="E-posta"
              icon={<MdOutlineEmail />}
              readOnly={isSubmitting}
              {...register("email")}
            />

            {!isRegisteredRoute && (
              <div className="mt-4 flex flex-col">
                <AuthInput
                  error={errors.password?.message}
                  placeholder="Şifreniz"
                  icon={<GrSecure />}
                  type={hidePassword ? "password" : "text"}
                  label="Şifre"
                  readOnly={isSubmitting}
                  extraIcon={hidePassword ? <VscEyeClosed /> : <VscEye />}
                  handleClickPasswordDisplay={() =>
                    setHidePassword(!hidePassword)
                  }
                  {...register("password")}
                />

                <Link
                  href="/sifre-sifirla"
                  className="text-[#4045EF] text-sm mt-4 self-end w-max"
                >
                  Şifremi unuttum
                </Link>
              </div>
            )}

            {isRegisteredRoute && (
              <>
                <div className="my-4">
                  <AuthInput
                    error={errors.companyName?.message}
                    placeholder="NextHire"
                    label="Şirket Adı"
                    icon={<MdOutlineEmail />}
                    readOnly={isSubmitting}
                    {...register("companyName")}
                  />
                </div>

                <div className="flex gap-4">
                  <AuthSelect
                    data={cities}
                    defaultValue="İl Seçiniz"
                    isSubmitting={isSubmitting}
                    className="!px-[11px] !pr-9"
                    {...register("city")}
                    error={errors.city?.message}
                    handleChangeCapture={(e) =>
                      setSelectedData(e, "/data/districts.json", setDistricts)
                    }
                  />

                  <AuthSelect
                    error={errors.district?.message}
                    data={districts}
                    defaultValue="İlçe Seçiniz"
                    isSubmitting={isSubmitting}
                    className="!px-[11px] !pr-9"
                    {...register("district")}
                  />
                </div>

                <div className="flex gap-4 my-4">
                  <AuthSelect
                    error={errors.taxCity?.message}
                    handleChangeCapture={(e) =>
                      setSelectedData(
                        e,
                        "/data/tax_officies.json",
                        setTaxOfficies
                      )
                    }
                    data={cities}
                    defaultValue="Vergi Dairesi İli Seçiniz"
                    isSubmitting={isSubmitting}
                    className="!px-[11px] !pr-9"
                    {...register("taxCity")}
                  />

                  <AuthSelect
                    error={errors.taxOffice?.message}
                    data={taxOfficies}
                    defaultValue="Vergi Dairesi Seçiniz"
                    isSubmitting={isSubmitting}
                    className="!px-[11px] !pr-9"
                    {...register("taxOffice")}
                  />
                </div>

                <AuthInput
                  type="text"
                  label="Vergi Numarası"
                  placeholder="1111111111"
                  value={watch("taxNumber")}
                  {...register("taxNumber")}
                  error={errors.taxNumber?.message}
                  readOnly={isSubmitting}
                  className="none-spin-button !px-[11px]"
                  min={0}
                  maxLength={10}
                />

                <div className="mt-4">
                  <AuthCheckbox
                    isSubmitting={isSubmitting}
                    text="E-posta yoluyla bilgilendirme almayı kabul ediyorum."
                    handleChange={(e) =>
                      handleChangeCheckbox("checkboxFirst", e)
                    }
                    values={watch("checkboxFirst")}
                    {...register("checkboxFirst")}
                  />
                </div>

                <div className="my-4">
                  <AuthCheckbox
                    isSubmitting={isSubmitting}
                    handleChange={(e) =>
                      handleChangeCheckbox("checkboxSecond", e)
                    }
                    values={watch("checkboxSecond")}
                    {...register("checkboxSecond")}
                    error={
                      watch("checkboxSecond")
                        ? ""
                        : errors.checkboxSecond?.message
                    }
                    text="Kişisel verilerimin işlenmesine onay veriyorum."
                  />
                </div>
              </>
            )}

            <CustomButton
              isSubmitting={isSubmitting}
              text={isRegisteredRoute ? "Kayıt Ol" : "Giriş Yap"}
              className="mt-4"
            />
          </form>
        </>
      )}
    </section>
  );
};

export default EmployerForm;
