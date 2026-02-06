import FileInput from "@/shared/components/ui/FileInput";
import Profile from "../../components/Profile";
import useProfileImage from "../../hooks/useProfileImage";
import CustomInput from "@/shared/components/ui/CustomInput";
import { FormProvider } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "@/features/auth/authContext";
import { Employer } from "@/shared/types/models/employer";
import CategoryInput from "./Category/CategoryInput";
import MarkdownEditor from "@/shared/components/MarkdownEditor";
import useProfileForm from "./useProfileForm";
import CustomButton from "@/shared/components/ui/CustomButton";

const EmployerProfile = () => {
  const { user } = useContext(AuthContext);
  const employerUser = user as Employer;

  const { handleChangeImage } = useProfileImage();
  const { register, methods, errors, isSubmitted, isSubmitting } =
    useProfileForm({
      user: employerUser,
    });

  return (
    <>
      <Profile>
        <FormProvider {...methods}>
          <form>
            <FileInput
              accept=".png, .jpg, .jpeg"
              id="image"
              onChange={(e) => handleChangeImage(e)}
            />

            <div className="sm:grid sm:grid-cols-2 max-sm:flex max-sm:flex-col gap-x-[29px] gap-y-[22px]">
              <CustomInput
                label="Şirket Adı"
                type="text"
                className="!rounded-[15px] !ps-4"
                placeholder={employerUser.companyName ?? "Şirket adını girin"}
                {...register("companyName")}
                error={errors.companyName?.message}
              />

              <CustomInput
                label="E-posta"
                type="email"
                className="!rounded-[15px] !ps-4"
                placeholder={employerUser.email ?? "Kurumsal e-posta adresi"}
                {...register("email")}
                error={errors.email?.message}
              />

              <CustomInput
                label="Şirket Numarası"
                type="text"
                inputMode="numeric"
                className="!rounded-[15px] !ps-4"
                placeholder={
                  employerUser.phoneNumber ?? "Şirket telefon numarası"
                }
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />

              <CustomInput
                label="Website"
                type="text"
                className="!rounded-[15px] !ps-4"
                placeholder={
                  employerUser.website ?? "Web sitesi adresi (opsiyonel)"
                }
                {...register("website")}
                error={errors.website?.message}
              />

              <CustomInput
                label="Kuruluş Tarihi"
                type="number"
                className="!rounded-[15px] !ps-4 none-spin-button"
                min={1}
                placeholder={employerUser.foundedDate ?? "Kuruluş yılı"}
                {...register("foundedDate")}
                error={errors.foundedDate?.message}
              />

              <CustomInput
                label="Şirket Büyüklüğü"
                type="text"
                className="!rounded-[15px] !ps-4 none-spin-button"
                placeholder={
                  employerUser.companySize ?? "Çalışan sayısı aralığı"
                }
                {...register("companySize")}
                error={errors.companySize?.message}
              />

              <CategoryInput isSubmitted={isSubmitted} />

              <CustomInput
                label="Tanıtım Video URL"
                type="text"
                className="!rounded-[15px] !ps-4 none-spin-button"
                placeholder={
                  employerUser.IntroductionVideoURL ??
                  "Tanıtım videosu bağlantısı (opsiyonel)"
                }
                {...register("IntroductionVideoURL")}
              />

              <MarkdownEditor
                className="col-span-2 [&>label]:!mb-4 [&>label]:!text-[16px]"
                lengthErrorMessage="Şirketiniz hakkında bilgiler giriniz."
                error={errors.companyAbout?.message}
                field="companyAbout"
                label="Şirket Hakkında"
                placeholder="Şirketinizin faaliyet alanı, geçmişi ve sunduğu hizmetler hakkında bilgi verin"
              />
            </div>
          </form>
        </FormProvider>
      </Profile>

      <CustomButton
        type="submit"
        text="Kaydet"
        className="px-[30px] my-5 float-right !bg-[#1814F3] !rounded-md"
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default EmployerProfile;
