// custom components

import { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "@/features/auth/authContext";
import { Candidate } from "@/shared/types/models/candidate";

// dayjs
import dayjs from "dayjs";
import "dayjs/locale/tr";

// datepicker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from "date-fns/locale/tr";
registerLocale("tr", tr);

// lib
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { setProfileImage } from "@/features/dashboard/slices/userDashboardSlice";
import CustomInput from "@/shared/components/ui/CustomInput";
import CustomSelect from "@/shared/components/ui/CustomSelect";
import { formatTurkishPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import cities from "@/shared/data/cities";
import { useForm } from "react-hook-form";
import FileInput from "@/shared/components/ui/FileInput";
import FormHandler from "./FormHandler";
import CustomButton from "@/shared/components/ui/CustomButton";

const CandidateForm = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user as Candidate;
  const [startDate, setStartDate] = useState<Date | null>(
    currentUser?.dateOfBirth ?? null
  );
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState<File>();

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      fullname: user?.fullname ?? "",
      email: user?.email ?? "",
      gender: currentUser?.gender,
      age: currentUser?.age ?? "",
      phoneNumber: currentUser?.phoneNumber ?? "",
      title: currentUser?.title ?? "",
      city: currentUser?.city,
    },
  });

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    if (file) {
      setImageFile(file);
      const image = URL.createObjectURL(file);
      if (image) dispatch(setProfileImage(image));
    }
  };

  return (
    <form
      className="w-full flex-[85%]"
      onSubmit={handleSubmit(
        FormHandler({ startDate, imageFile, setImageFile })
      )}
    >
      <FileInput
        accept=".png, .jpg, .jpeg"
        id="image"
        onChange={(e) => handleChangeImage(e)}
      />

      <div className="grid sm:grid-cols-2 gap-x-[29px] gap-y-[22px]">
        <CustomInput
          label="Ad Soyad"
          type="text"
          className="!rounded-[15px] !ps-4"
          placeholder={user?.fullname}
          {...register("fullname")}
        />

        <div className="w-full flex flex-col">
          <label className="block mb-1.5" htmlFor="date">
            {"Doğum Tarihi"}
          </label>

          <DatePicker
            selected={startDate}
            placeholderText={dayjs().locale("tr").format("DD MMMM YYYY")}
            locale="tr"
            name="date"
            id="date"
            className="custom__input !px-4 !rounded-[15px] border-[#D3E0FE] w-full"
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <CustomSelect
          label="Cinsiyet"
          defaultValue="Cinsiyet Seçin"
          isSubmitting={isSubmitting}
          className="!px-4 !rounded-[15px]"
          labelClass="!text-black !mb-1.5"
          data={[
            { id: 1, name: "Erkek" },
            { id: 2, name: "Kadın" },
          ]}
          {...register("gender")}
        />

        <CustomInput
          label="Yaş"
          type="number"
          className="!rounded-[15px] !px-4"
          min={18}
          max={65}
          placeholder={currentUser?.age ? currentUser.age : "Örn: 25"}
          {...register("age")}
        />

        <CustomInput
          label="Uzmanlık Alanı"
          type="text"
          className="!rounded-[15px] !px-4"
          placeholder={
            currentUser?.title?.length
              ? currentUser.title
              : "Örnek: Frontend Developer, Veri Analisti, UI/UX Tasarım"
          }
          {...register("title")}
        />

        <CustomInput
          label="Telefon Numarası"
          type="text"
          className="!rounded-[15px] !px-4"
          value={formatTurkishPhoneNumber(watch("phoneNumber") ?? "")}
          placeholder={
            user?.phoneNumber?.length ? user.phoneNumber : "Örn: 0555 555 5555"
          }
          {...register("phoneNumber", {
            pattern: {
              value: /^(?:\+90|0)?\s*5(?:[\s-]?\d){9}$/,
              message: "Geçerli telefon numarası girin",
            },
          })}
          error={errors.phoneNumber?.message}
        />

        <CustomSelect
          label="Şehir"
          defaultValue="Şehir Seçin"
          isSubmitting={isSubmitting}
          className="!px-4 !rounded-[15px]"
          labelClass="!text-black !mb-1.5"
          data={cities.map(({ id, title }) => ({
            id,
            name: title,
          }))}
          {...register("city")}
        />
      </div>

      <CustomButton className="float-right max-sm:w-full mt-[30px] !bg-[#1814F3] w-[190px] h-[50px] !rounded-[15px]">
        {isSubmitting ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          "Kaydet"
        )}
      </CustomButton>
    </form>
  );
};

export default CandidateForm;
