"use client";

import React, { ChangeEvent, useCallback, useState } from "react";
import AutoCompleteList from "../ui/AutoCompleteList";
import CustomInput from "../ui/CustomInput";
import { Form, Formik, FormikHelpers } from "formik";
import AnimationInputStyles from "./animation-input.module.scss";
import { IoIosSearch } from "react-icons/io";
import jobTitlesList from "@/shared/data/job-titles";
import { AuthCompoleteSearchFields, SearchJobFormFields } from "@/shared/types";
import { SlLocationPin } from "react-icons/sl";
import citiesList from "@/shared/data/cities";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import useJobFilter from "../../hooks/job-filter/useJobFilter";
import useFilterJobSearch from "../../hooks/useFilterJobSearch";
import { handleSearchData } from "../../utils/searchData";
import { setTouch } from "../../redux/slices/touch";

const SearchJob = ({
  formClass,
  buttonClass,
  jobKeywords,
  jobInputPlaceholder,
}: {
  formClass?: string;
  buttonClass?: string;
  jobKeywords?: string[];
  jobInputPlaceholder?: string;
}) => {
  //! Search job input results data !//
  const [jobs, setJobs] = useState<AuthCompoleteSearchFields[]>([]);
  //! Search city input results data !//
  const [cities, setCities] = useState<AuthCompoleteSearchFields[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedJob, setSelectedJob] = useState<string | null>(""); //! Selected job data when clicked
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedCity, setSelectedCity] = useState<string | null>(""); //! Selected city data when clicked
  const router = useRouter();
  const dispatch = useDispatch();
  const { filterJob } = useJobFilter();
  const { filterSearchJob } = useFilterJobSearch();

  const onSubmit = useCallback(
    (
      values: SearchJobFormFields,
      actions: FormikHelpers<SearchJobFormFields>
    ) => {
      filterSearchJob(values.location, values.job);

      router.push("/is-ilanlari");
      filterJob();

      actions.resetForm();
    },
    [router, filterJob, filterSearchJob]
  );

  return (
    <Formik
      initialValues={{
        job: "",
        location: "",
      }}
      onSubmit={onSubmit}
    >
      {({ handleChange, setTouched, touched, setFieldValue }) => (
        <Form
          className={`hero-section-form ${formClass ?? ""} ${
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
                placeholder={jobInputPlaceholder}
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
                  {jobKeywords &&
                    jobKeywords.map((keyword, i) => (
                      <li key={i}>
                        <span>{keyword}</span>
                      </li>
                    ))}
                </ul>

                <AutoCompleteList
                  listText="Pozisyon Ara"
                  recommendedKeywords={[
                    "Yazılım Geliştirici",
                    "Veri Analisti",
                    "Grafik Tasarımcı",
                    "Dijital Pazarlama Uzmanı",
                  ]}
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
                onFocus={() => {
                  setTouched({ location: true, job: false });
                  dispatch(setTouch(true));
                }}
                onBlur={() => {
                  setTouched({ ...touched, location: false });
                  dispatch(setTouch(false));
                }}
              >
                <AutoCompleteList
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
              <button
                className={`hero-section-form__button ${buttonClass ?? ""}`}
              >
                İş Bul
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchJob;
