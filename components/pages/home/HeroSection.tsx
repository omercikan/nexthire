"use client";

import CustomInput from "@/components/ui/CustomInput";
import { Form, Formik, FormikHelpers } from "formik";
import React, { ChangeEvent, useCallback, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";
import AnimationInputStyles from "@/scss/animation-input.module.scss";
import HomeStyles from "@/scss/home-bg.module.scss";
import { AuthCompoleteSearchFields, SearchJobFormFields } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroBg from "@/img/hero-bg.jpg";
import jobTitlesList from "@/data/job-titles";
import AutoCompleteInput from "@/components/ui/AutoCompleteList"; 
import citiesList from "@/data/cities";
import { jobKeywords } from "@/data/job-keywords";
import { handleSearchData } from "@/lib/searchData";

const HeroSection = () => {
  const router = useRouter();

  //! Search job input results data !//
  const [jobs, setJobs] = useState<AuthCompoleteSearchFields[]>([]);
  //! Search city input results data !//
  const [cities, setCities] = useState<AuthCompoleteSearchFields[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedJob, setSelectedJob] = useState<string | null>(""); //! Selected job data when clicked
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedCity, setSelectedCity] = useState<string | null>(""); //! Selected city data when clicked

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
    <section className="hero-section">
      <picture>
        <Image
          src={HeroBg}
          alt="Ana sayfa kahraman görseli"
          className="object-cover bg-left pointer-events-none"
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
          {({ handleChange, setTouched, touched, setFieldValue }) => (
            <Form
              className={`hero-section-form ${
                touched.job || touched.location
                  ? "!rounded-lg !rounded-bl-none"
                  : ""
              }`}
              noValidate
            >
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
                    onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSearchData(e, jobTitlesList, setJobs)
                    }
                    onFocus={() => setTouched({ job: true, location: false })}
                    onBlur={() => setTouched({ ...touched, job: false })}
                  >
                    <ul className={AnimationInputStyles.animationListGroup}>
                      {jobKeywords.map((keyword, i) => (
                        <li key={i}>
                          <span>{keyword}</span>
                        </li>
                      ))}
                    </ul>

                    <AutoCompleteInput
                      listText="Pozisyon Ara"
                      recommendedKeywords={jobKeywords}
                      searchData={jobs}
                      setSelectedKeyword={setSelectedJob}
                      touched={touched.job}
                      field="job"
                      setFieldValue={setFieldValue}
                    />
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
                    onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
                      handleSearchData(e, citiesList, setCities)
                    }
                    onFocus={() => setTouched({ location: true, job: false })}
                    onBlur={() => setTouched({ ...touched, location: false })}
                  >
                    <AutoCompleteInput
                      listText="Lokasyon Ara"
                      recommendedKeywords={[
                        "Ankara",
                        "İstanbul",
                        "İzmir",
                        "Erzurum",
                      ]}
                      searchData={cities}
                      setSelectedKeyword={setSelectedCity}
                      touched={touched.location}
                      field="location"
                      setFieldValue={setFieldValue}
                    />
                  </CustomInput>
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
