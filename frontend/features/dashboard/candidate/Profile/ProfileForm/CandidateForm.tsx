// custom components

import React, { ChangeEvent, useContext, useState } from "react";
import { AuthContext } from "@/features/auth/authContext";
import { Candidate } from "@/shared/types/models/candidate";

// formik and schema
import { Form, Formik } from "formik";
import { candidateFormSchema } from "./schema/CandidateFormSchema";

// dayjs
import dayjs from "dayjs";
import "dayjs/locale/tr";

// datepicker
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { tr } from "date-fns/locale/tr";
registerLocale("tr", tr);

import { CandidateForm as CandidateFormInterface } from "./types";

// lib
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useUpdateProfileMutation } from "@/features/dashboard/services/candidateProfileApi";
import { setProfileImage } from "@/features/dashboard/slices/userDashboardSlice";
import CustomInput from "@/shared/components/ui/CustomInput";
import CustomSelect from "@/shared/components/ui/CustomSelect";
import { formatTurkishPhoneNumber } from "@/shared/utils/formatPhoneNumber";
import cities from "@/shared/data/cities";

const CandidateForm = () => {
  const { user } = useContext(AuthContext);
  const currentUser = user as Candidate;
  const [startDate, setStartDate] = useState<Date | null>(
    currentUser?.dateOfBirth
  );
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageFile, setImageFile] = useState<File>();
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (values: CandidateFormInterface) => {
    try {
      const filledFields = Object.fromEntries(
        Object.entries(values).filter(([, v]) => v)
      ) as CandidateFormInterface;

      if (user) {
        const { dateOfBirth } = currentUser;

        const isChange = [
          "name",
          "email",
          "gender",
          "age",
          "phoneNumber",
          "title",
          "city",
        ].some((val) => {
          const value = val as keyof typeof isChange;

          return currentUser[value] !== filledFields[value];
        });

        if (isChange || dateOfBirth !== startDate) {
          await updateProfile({
            userId: String(user?.id),
            data: { ...filledFields, dateOfBirth: startDate as Date },
          }).unwrap();
        }
      }
    } catch {
      toast.error("Profiliniz güncellenemedi tekrar deneyin", {
        position: "bottom-right",
      });
    }
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    if (file) {
      setImageFile(file);
      const image = URL.createObjectURL(file);
      if (image) dispatch(setProfileImage(image));
    }
  };

  return (
    <Formik
      initialValues={{
        name: user?.name ?? "",
        email: user?.email ?? "",
        gender: currentUser?.gender ?? "",
        age: currentUser?.age ?? "",
        phoneNumber: currentUser?.phoneNumber ?? "",
        title: currentUser?.title ?? "",
        city: currentUser?.city ?? "",
      }}
      onSubmit={onSubmit}
      validationSchema={candidateFormSchema}
    >
      {({ isSubmitting, values, handleChange }) => (
        <Form className="w-full flex-[85%]" noValidate>
          <input
            type="file"
            name="image"
            id="image"
            hidden
            accept=".png, .jpg, .jpeg"
            onChange={(e) => handleChangeImage(e)}
          />

          <div className="grid sm:grid-cols-2 gap-x-[29px] gap-y-[22px]">
            <CustomInput
              label="Ad Soyad"
              name="name"
              type="text"
              className="!rounded-[15px] !ps-4"
              placeholder={user?.name ?? user?.displayName}
            />

            {/* <CustomInput
              label="E-posta"
              name="email"
              type="email"
              className="!rounded-[15px] !ps-4"
              placeholder={user?.email}
            /> */}

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
              name="gender"
              defaultValue={"Cinsiyet Seçin"}
              isSubmitting={isSubmitting}
              value={values.gender}
              handleChange={handleChange}
              className="!px-4 !rounded-[15px]"
              labelClass="!text-black !mb-1.5"
              data={[
                { id: 1, name: "Erkek" },
                { id: 2, name: "Kadın" },
              ]}
            />

            <CustomInput
              label="Yaş"
              name="age"
              type="number"
              className="!rounded-[15px] !px-4"
              min={18}
              max={65}
              placeholder={currentUser?.age ?? "18"}
            />

            <CustomInput
              label="Uzmanlık Alanı"
              name="title"
              type="text"
              className="!rounded-[15px] !px-4"
              placeholder={
                currentUser?.title ??
                "Örnek: Frontend Developer, Veri Analisti, UI/UX Tasarım"
              }
            />

            <CustomInput
              label="Telefon Numarası"
              name="phoneNumber"
              type="text"
              className="!rounded-[15px] !px-4"
              value={formatTurkishPhoneNumber(values.phoneNumber ?? "")}
              placeholder={user?.phoneNumber ?? "0555 555 5555"}
            />

            <CustomSelect
              label="Şehir"
              name="city"
              defaultValue={currentUser?.city ?? "Şehir Seçin"}
              isSubmitting={isSubmitting}
              value={values.city}
              handleChange={handleChange}
              className="!px-4 !rounded-[15px]"
              labelClass="!text-black !mb-1.5"
              data={cities.map(({ id, title }) => ({
                id,
                name: title,
              }))}
            />
          </div>

          <button className="custom__button float-right max-sm:w-full mt-[30px] !bg-[#1814F3] w-[190px] h-[50px] !rounded-[15px]">
            {isSubmitting ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Kaydet"
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CandidateForm;
