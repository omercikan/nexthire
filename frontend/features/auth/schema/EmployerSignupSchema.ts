import * as Yup from "yup";

export const EmployerSignupSchema = Yup.object().shape({
  nameAndSurname: Yup.string()
    .required("Ad ve soyad gereklidir.")
    .min(4, "Ad soyad en az 4 karakter olmalıdır.")
    .test(
      "contains-space",
      "Lütfen hem adınızı hem soyadınızı giriniz.",
      (value) => value?.trim().includes(" ")
    )
    .matches(
      /^[a-zA-ZğüşöçıİĞÜŞÖÇ ]+$/,
      "Ad ve soyad sadece harf ve boşluk içerebilir."
    ),

  phone: Yup.string()
    .matches(
      /^(?:\+90|0)(5\d{2})\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Geçerli bir telefon numarası girin. Örnek: (0555) 555 55 55"
    )
    .required("Telefon numarası gereklidir."),

  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin.")
    .required("E-posta gereklidir."),

  companyName: Yup.string()
    .min(2, "Şirket adı en az 2 karakter olmalı.")
    .required("Şirket adı gereklidir."),

  city: Yup.string()
    .notOneOf(["İl Seçiniz"], "Bir şehir seçmelisiniz.")
    .required("Şehir seçimi gereklidir."),

  district: Yup.string()
    .notOneOf(["İlçe Seçiniz"], "Bir ilçe seçmelisiniz.")
    .required("İlçe seçimi gereklidir."),

  taxCity: Yup.string()
    .notOneOf(["Vergi Dairesi İli Seçiniz"], "Vergi dairesi ili seçmelisiniz.")
    .required("Vergi dairesi ili gereklidir."),

  taxOffice: Yup.string()
    .notOneOf(["Vergi Dairesi Seçiniz"], "Vergi dairesi seçmelisiniz.")
    .required("Vergi dairesi gereklidir."),

  taxNumber: Yup.string()
    .matches(
      /^\d{10}$/,
      "Vergi numarası 10 haneli olmalı ve sadece rakamlardan oluşmalıdır."
    )
    .required("Vergi numarası gereklidir."),

  checkboxSecond: Yup.bool()
    .oneOf([true], "Kişisel verilerimin işlenmesine onay vermelisiniz.")
    .required("Bu alan gereklidir."),
});
