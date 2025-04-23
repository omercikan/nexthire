"use client";

import CustomInput from "@/components/ui/CustomInput";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import AnimationInputStyles from "@/scss/animation-input.module.scss";
import HomeStyles from "@/scss/home-bg.module.scss";
import { SearchJobFormFields } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroBg from "@/img/home-bg.avif";

const jobKeywords: string[] = [
  "Yazılım Geliştirici",
  "Veri Analisti",
  "Grafik Tasarımcı",
  "Dijital Pazarlama Uzmanı",
];

const HeroSection = () => {
  const router = useRouter();

  const onSubmit = useCallback(
    (
      values: SearchJobFormFields,
      actions: FormikHelpers<SearchJobFormFields>
    ) => {
      const query = new URLSearchParams({
        meslek: values.job.toLocaleLowerCase("tr"),
        konum: values.location.toLocaleLowerCase("tr"),
      });

      if (!values.job && !values.location) {
        router.push("/is-ilanlari");
      } else if (values.job && !values.location) {
        router.push(`/is-ilanlari/?meslek=${query.get("meslek")}`);
      } else if (!values.job && values.location) {
        router.push(`/is-ilanlari/?konum=${query.get("konum")}`);
      } else {
        router.push(`/is-ilanlari/?${query}`);
      }

      actions.resetForm();
    },
    [router]
  );

  return (
    <section
      className={`pt-[170px] max-lg:py-[30px] max-lg:px-[12px] relative h-screen max-[1024px]:h-[calc(100vh-79.43px)] max-[992px]:h-full`}
    >
      <picture>
        <Image
          src={HeroBg}
          alt="Ana sayfa kahraman görseli"
          className="object-cover bg-left"
          fill
          priority
          sizes="100vw"
        />
      </picture>
      <div className={`${HomeStyles.heroAnimation} text-center`}>
        <div className="mb-5">
          <h2 className="hero-section-title">
            Sizin için en iyi işleri buluyoruz
          </h2>
          <p className="mt-2.5 max-[540px]:text-[15px]">
            12.800 iş arasından kariyer fırsatınızı arayın
          </p>
        </div>

        <Formik
          initialValues={{
            job: "",
            location: "",
          }}
          onSubmit={onSubmit}
        >
          {({ handleChange }) => (
            <Form className="hero-section-form" noValidate>
              <div className="hero-section-form__wrapper">
                <div
                  className={`hero-section-form__input-group ${AnimationInputStyles.animationInputWrapper} min-md:border-e max-md:border-b border-[#ECEDF2]`}
                >
                  <CustomInput
                    className="!border-0 text-[#696969] !text-[15px]"
                    type="text"
                    required
                    aria-label="Meslek adı ile ara"
                    name="job"
                    icon={<IoIosSearch size={26} color="696969" />}
                    iconSpanClass="!left-0 !top-[45%]"
                    onChange={handleChange}
                  >
                    <ul>
                      {jobKeywords.map((keyword, i) => (
                        <li key={i}>
                          <span>{keyword}</span>
                        </li>
                      ))}
                    </ul>
                  </CustomInput>
                </div>

                <div className="hero-section-form__input-group relative">
                  <CustomInput
                    className="!border-0 !text-[15px] text-[#696969]"
                    type="text"
                    aria-label="Şehir veya ilçe ile ara"
                    name="location"
                    icon={<SlLocationPin size={24} color="696969" />}
                    iconSpanClass="!left-0"
                    onChange={handleChange}
                    placeholder="Şehir veya ilçe ara"
                  />
                </div>

                <div className="w-full flex-[0.5]">
                  <button className="hero-section-form__button">İş Bul</button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default HeroSection;
