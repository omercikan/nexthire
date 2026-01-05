"use client";

import { ChangeEvent, useCallback, useState } from "react";
import AutoCompleteList from "../ui/AutoCompleteList";
import CustomInput from "../ui/CustomInput";
import AnimationInputStyles from "./animation-input.module.scss";
import { IoIosSearch } from "react-icons/io";
import jobTitlesList from "@/shared/data/job-titles";
import { AuthCompoleteSearchFields, SearchJobFormFields } from "@/shared/types";
import { SlLocationPin } from "react-icons/sl";
import citiesList from "@/shared/data/cities";
import { useRouter } from "next/navigation";
import { handleSearchData } from "../../utils/searchData";
import { useForm } from "react-hook-form";
import useJobFilter from "@/shared/hooks/job-filter/useJobFilter";
import useFilterJobSearch from "@/shared/hooks/useFilterJobSearch";
import CustomButton from "../ui/CustomButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/store";
import { setTouch as setSearchTouch } from "@/shared/redux/slices/touch";

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
  const [jobs, setJobs] = useState<AuthCompoleteSearchFields[]>([]);
  const [cities, setCities] = useState<AuthCompoleteSearchFields[]>([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { jobTitle: "", location: "" } });
  const dispatch = useDispatch<AppDispatch>();
  const [touch, setTouch] = useState({
    job: false,
    location: false,
  });

  const { filterSearchJob } = useFilterJobSearch();
  const { handleFilter } = useJobFilter();

  const onSubmit = useCallback(
    (values: SearchJobFormFields) => {
      const { jobTitle, location } = values;

      filterSearchJob(jobTitle, location);

      router.push("/is-ilanlari");
      handleFilter();

      reset();
    },
    [reset, router, filterSearchJob, handleFilter]
  );

  const handleTouch = (job: boolean, location: boolean) => {
    setTouch({ job, location });

    return job || location
      ? dispatch(setSearchTouch(true))
      : dispatch(setSearchTouch(false));
  };

  return (
    <form
      className={`hero-section-form ${formClass ?? ""} ${
        touch.job || touch.location ? "!rounded-lg !rounded-bl-none" : ""
      }`}
      onSubmit={handleSubmit(onSubmit)}
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
            placeholder={jobInputPlaceholder}
            icon={<IoIosSearch size={26} color="696969" />}
            iconSpanClass="!left-0 !top-[45%]"
            {...register("jobTitle")}
            onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearchData(e, jobTitlesList, setJobs)
            }
            onFocus={() => handleTouch(true, false)}
            onBlur={() => handleTouch(false, false)}
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
              touched={touch.job}
              field="job"
              setFieldValue={(value) => setValue("jobTitle", value as string)}
            />
          </CustomInput>
        </div>

        <div className="hero-section-form__input-group relative">
          <CustomInput
            className="!border-0 !text-[15px] text-[#696969]"
            type="text"
            aria-label="Şehir veya ilçe ile ara"
            icon={<SlLocationPin size={24} color="696969" />}
            iconSpanClass="!left-0"
            placeholder="Şehir veya ilçe ara"
            onChangeCapture={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearchData(e, citiesList, setCities)
            }
            {...register("location")}
            onFocus={() => handleTouch(false, true)}
            onBlur={() => handleTouch(false, false)}
          >
            <AutoCompleteList
              listText="Lokasyon Ara"
              recommendedKeywords={["Ankara", "İstanbul", "İzmir", "Erzurum"]}
              searchData={cities}
              touched={touch.location}
              field="location"
              setFieldValue={(value) => setValue("location", value as string)}
            />
          </CustomInput>
        </div>

        <div className="w-full flex-[0.5]">
          <CustomButton
            text="İş Bul"
            isSubmitting={isSubmitting}
            className={`hero-section-form__button ${buttonClass ?? ""}`}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchJob;
