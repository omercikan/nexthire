import { formatTurkishPhoneNumber } from "@/shared/utils/formatPhoneNumber";

export const FORMDATA_VALUES = (
  imageFile: File | undefined,
  userId: string,
  date: string,
  profilePhotoId: string,
  fullname: string,
  age: string,
  city: string,
  gender: string,
  phoneNumber: string,
  title: string
) => [
  { name: "photo", value: imageFile as File },
  { name: "_id", value: userId },
  { name: "dateOfBirth", value: date },
  {
    name: "oldProfilePhotoId",
    value: imageFile ? profilePhotoId : "",
  },
  { name: "fullname", value: fullname },
  { name: "age", value: age },
  { name: "city", value: city === "Şehir Seçin" ? "" : city },
  {
    name: "gender",
    value: gender === "Cinsiyet Seçin" ? "" : gender,
  },
  {
    name: "phoneNumber",
    value: formatTurkishPhoneNumber(phoneNumber),
  },
  { name: "title", value: title },
];
