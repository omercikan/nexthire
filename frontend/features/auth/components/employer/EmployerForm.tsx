"use client";

import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import {
  CitiesJsonInterface,
  DistrictsJsonInterface,
  TaxOfficiesJsonInterface,
} from "@/shared/types";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { GrSecure } from "react-icons/gr";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/api/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { EmployerSignupFormFields } from "@/shared/types/employer/signup-form.types";
import { EmployerSignupSchema } from "@/features/auth/schema/EmployerSignupSchema";
import { LoginSchema } from "@/features/auth/schema/LoginSchema";
import { fetchData } from "@/shared/utils/fetchData";
import Success from "@/shared/components/ui/Success";
import AuthInput from "@/shared/components/ui/CustomInput";
import { formatTurkishPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import { setSelectedData } from "@/shared/utils/selectData";
import CustomButton from "@/shared/components/ui/CustomButton";
import AuthCheckbox from "@/shared/components/ui/CustomCheckbox";
import AuthSelect from "@/shared/components/ui/CustomSelect";

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap",
});

const EmployerForm = () => {
  const [cities, setCities] = useState<CitiesJsonInterface[]>([]);
  const [districts, setDistricts] = useState<DistrictsJsonInterface[]>([]);
  const [taxOfficies, setTaxOfficies] = useState<TaxOfficiesJsonInterface[]>(
    []
  );
  const [registered, setRegistered] = useState<boolean>(false);
  const pathname: string = usePathname();
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const router = useRouter();

  const onSubmit = async (
    values: EmployerSignupFormFields,
    actions: FormikHelpers<EmployerSignupFormFields>
  ) => {
    const {
      nameAndSurname,
      email,
      password,
      phone,
      companyName,
      city,
      district,
      taxCity,
      taxOffice,
      taxNumber,
    } = values;

    if (pathname === "/isveren-kayit") {
      const response = await axios.post("/api/firebase/employer-signup", {
        nameAndSurname: nameAndSurname,
        email: email,
        phoneNumber: phone,
        companyName: companyName,
        city: city,
        district: district,
        taxCity: taxCity,
        taxOffice: taxOffice,
        taxNumber: taxNumber,
      });

      const data = await response.data;

      switch (data.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          return toast.error("Girdiğiniz e-posta adresi zaten kullanımda.");
      }

      if (data.user) {
        setDistricts([]);
        setTaxOfficies([]);
        setRegistered(true);
        actions.resetForm();
      }
    } else {
      const response = await axios.post(
        "/api/firebase/employer-login",
        JSON.stringify({
          email: email,
          password: password,
        })
      );
      const data = response.data;

      if (data.user) {
        await signInWithEmailAndPassword(auth, email, password);
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
            { duration: 5000 }
          );
        case "Giriş Başarılı":
          return toast.success(data.message);
      }
    }
  };

  useEffect(() => {
    const fetchCitiesData = async () => {
      const { data } = await fetchData<CitiesJsonInterface[]>(
        "/data/cities.json"
      );
      setCities(data);
    };

    fetchCitiesData();
  }, []);

  return (
    <section
      className={`flex-[1] py-6 px-12 max-sm:px-4 h-[100vh] overflow-auto ${
        inter.className
      } ${registered ? "relative" : ""} ${
        pathname === "/isveren-giris" ? "flex flex-col justify-center" : ""
      } `}
    >
      {registered ? (
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-full px-8">
          <Success
            icon={
              <HiMiniCheckCircle
                className="rounded-full"
                color="17A31A"
                size={66}
              />
            }
            title="Başvurunuz başarıyla alındı!"
            subtitle="Kayıt işlemini tamamlamak için e-posta adresinize gönderdiğimiz bağlantıya tıklayarak şifrenizi belirleyin."
            message="E-postayı gelen kutunuzda göremiyorsanız, spam veya gereksiz klasörünü kontrol etmeyi unutmayın."
          />

          <Link href="/isveren-giris">
            <button className="custom__button w-full mt-4">Giriş Yap</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center">
            <Image
              src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png"
              alt="Next Hire"
              className="mx-auto"
              quality={100}
              width={153}
              height={60}
            />

            <h2 className="text-2xl text-[#101828] font-semibold mt-6 mb-2">
              {pathname === "/isveren-kayit" ? "Kayıt Ol" : "İşveren Girişi"}
            </h2>

            <p className="text-[#475467]">
              {pathname === "/isveren-kayit"
                ? "İşveren hesabınızı oluşturmak için bilgilerinizi girin"
                : "Hesabınıza erişmek için giriş bilgilerinizi girin"}
            </p>
          </div>

          <Formik
            initialValues={{
              nameAndSurname: "",
              phone: "",
              email: "",
              password: "",
              companyName: "",
              taxNumber: "",
              checkboxFirst: false,
              checkboxSecond: false,
              city: "",
              district: "",
              taxCity: "",
              taxOffice: "",
            }}
            onSubmit={onSubmit}
            validationSchema={
              pathname === "/isveren-kayit" ? EmployerSignupSchema : LoginSchema
            }
          >
            {({
              values,
              errors,
              isSubmitting,
              handleChange,
              setFieldValue,
            }) => (
              <Form className="mt-6 flex flex-col">
                {pathname === "/isveren-kayit" && (
                  <>
                    <AuthInput
                      placeholder="Ömer Çıkan"
                      name="nameAndSurname"
                      label="Ad Soyad"
                      icon={<MdOutlineEmail />}
                      value={values.nameAndSurname}
                      onChange={handleChange}
                      readOnly={isSubmitting}
                    />

                    <div className="my-4">
                      <AuthInput
                        placeholder="(0555) 555 55 55"
                        name="phone"
                        label="Telefon"
                        type="tel"
                        icon={<MdOutlineEmail />}
                        value={formatTurkishPhoneNumber(values.phone)}
                        onChange={(e) => {
                          const number = e.target.value.replace(/\D/g, "");
                          setFieldValue("phone", number);
                        }}
                        readOnly={isSubmitting}
                      />
                    </div>
                  </>
                )}

                <AuthInput
                  placeholder={
                    pathname === "/isveren-kayit"
                      ? "ornek@gmail.com"
                      : "E-posta adresiniz"
                  }
                  name="email"
                  label="E-posta"
                  icon={<MdOutlineEmail />}
                  value={values.email}
                  onChange={handleChange}
                  readOnly={isSubmitting}
                />

                {pathname === "/isveren-giris" && (
                  <div className="mt-4 flex flex-col">
                    <AuthInput
                      placeholder="Şifreniz"
                      name="password"
                      icon={<GrSecure />}
                      type={hidePassword ? "password" : "text"}
                      label="Şifre"
                      value={values.password}
                      onChange={handleChange}
                      readOnly={isSubmitting}
                      extraIcon={hidePassword ? <VscEyeClosed /> : <VscEye />}
                      handleClickPasswordDisplay={() =>
                        setHidePassword(!hidePassword)
                      }
                    />

                    <Link
                      href="/sifre-sifirla"
                      className="text-[#4045EF] text-sm mt-4 self-end w-max"
                    >
                      Şifremi unuttum
                    </Link>
                  </div>
                )}

                {pathname === "/isveren-kayit" && (
                  <>
                    <div className="my-4">
                      <AuthInput
                        placeholder="NextHire"
                        name="companyName"
                        label="Şirket Adı"
                        icon={<MdOutlineEmail />}
                        value={values.companyName}
                        onChange={handleChange}
                        readOnly={isSubmitting}
                      />
                    </div>

                    <div className="flex gap-4">
                      <AuthSelect
                        value={values.city}
                        handleChange={handleChange}
                        handleChangeCapture={(e) =>
                          setSelectedData(
                            e,
                            "/data/districts.json",
                            setDistricts
                          )
                        }
                        data={cities}
                        defaultValue="İl Seçiniz"
                        name="city"
                        isSubmitting={isSubmitting}
                      />

                      <AuthSelect
                        value={values.district}
                        handleChange={handleChange}
                        data={districts}
                        defaultValue="İlçe Seçiniz"
                        name="district"
                        isSubmitting={isSubmitting}
                      />
                    </div>

                    <div className="flex gap-4 my-4">
                      <AuthSelect
                        value={values.taxCity}
                        handleChange={handleChange}
                        handleChangeCapture={(e) =>
                          setSelectedData(
                            e,
                            "/data/tax_officies.json",
                            setTaxOfficies
                          )
                        }
                        data={cities}
                        defaultValue="Vergi Dairesi İli Seçiniz"
                        name="taxCity"
                        isSubmitting={isSubmitting}
                      />

                      <AuthSelect
                        value={values.taxOffice}
                        handleChange={handleChange}
                        data={taxOfficies}
                        defaultValue="Vergi Dairesi Seçiniz"
                        name="taxOffice"
                        isSubmitting={isSubmitting}
                      />
                    </div>

                    <AuthInput
                      type="number"
                      name="taxNumber"
                      label="Vergi Numarası"
                      placeholder="1111111111"
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.length > 10) return false;
                        setFieldValue("taxNumber", val);
                      }}
                      value={values.taxNumber}
                      readOnly={isSubmitting}
                      className="none-spin-button"
                      min={0}
                    />

                    <div className="mt-4">
                      <AuthCheckbox
                        name="checkboxFirst"
                        errors={errors.checkboxFirst}
                        values={values.checkboxFirst}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        text="E-posta yoluyla bilgilendirme almayı kabul ediyorum."
                      />
                    </div>

                    <div className="my-4">
                      <AuthCheckbox
                        name="checkboxSecond"
                        values={values.checkboxSecond}
                        handleChange={handleChange}
                        isSubmitting={isSubmitting}
                        text="Kişisel verilerimin işlenmesine onay veriyorum."
                      />
                    </div>
                  </>
                )}

                <CustomButton
                  isSubmitting={isSubmitting}
                  text={
                    pathname === "/isveren-kayit" ? "Kayıt Ol" : "Giriş Yap"
                  }
                  className="mt-4"
                />
              </Form>
            )}
          </Formik>
        </>
      )}
    </section>
  );
};

export default EmployerForm;
