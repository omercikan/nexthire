import CustomButton from "@/shared/components/ui/CustomButton";

import InputFields from "./InputFields";
import SelectFields from "./SelectFields";
import useFormHandler from "./useFormHandler";

import CustomInput from "@/shared/components/ui/CustomInput";
import CustomSelect from "@/shared/components/ui/CustomSelect";
import MarkdownEditor from "./MarkdownEditor";
import { FormProvider } from "react-hook-form";
import CandidateQuestion from "./CandidateQuestion/components/CandidateQuestion";

const ShareJob = () => {
  const {
    onSubmit,
    handleSubmit,
    register,
    watch,
    errors,
    inputFields,
    selectFields,
    isSubmitting,
    methods,
  } = useFormHandler();

  return (
    <>
      <FormProvider {...methods}>
        <form className="bg-white p-6 rounded-[25px]">
          <MarkdownEditor />

          <div className="max-sm:flex max-sm:flex-col sm:grid grid-cols-2 gap-4">
            <InputFields
              inputFields={inputFields}
              errors={errors}
              register={register}
            />

            <SelectFields
              selectFields={selectFields}
              errors={errors}
              register={register}
            />

            <CustomSelect
              label="İş Başvuru Şekli"
              defaultValue="Başvuru yöntemini seçiniz"
              isDefaultValueOption={true}
              className="ps-4! rounded-[15px]!"
              labelClass="mb-1.5 text-sm !text-black"
              data={[
                { id: 1, name: "NextHire üzerinden" },
                { id: 2, name: "Kendi sitemiz üzerinden" },
                { id: 3, name: "E-posta ile" },
              ]}
              isSubmitting={false}
              error={errors.applicationMethod?.message}
              isFormatText={false}
              {...register("applicationMethod")}
            />

            {watch("applicationMethod") &&
              watch("applicationMethod") !== "NextHire üzerinden" && (
                <CustomInput
                  label="Başvuru Adresi"
                  labelClass="text-sm"
                  className="ps-4! rounded-[15px]!"
                  placeholder="Başvuru adresinizi giriniz"
                  error={errors.applicationAddress?.message}
                  {...register("applicationAddress")}
                />
              )}
          </div>
        </form>

        <CandidateQuestion />

        <CustomButton
          text="Kaydet & Önizle"
          isSubmitting={isSubmitting}
          handleClick={handleSubmit(onSubmit)}
          className="rounded-lg! px-8 mt-5 max-[460px]:w-full"
        />
      </FormProvider>
    </>
  );
};

export default ShareJob;
