import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Lütfen isim giriniz.")
    .min(3, "Lütfen en az 3 karakter giriniz.")
    .max(30, "İsim en fazla 30 karakter olmalıdır.")
    .matches(
      /^[A-Za-zçöşğüıİÇÖŞĞÜ\s]+$/,
      "İsim yalnızca harf ve boşluklardan oluşmalıdır."
    )
    .trim(),

  surname: Yup.string()
    .required("Lütfen soyadı giriniz.")
    .min(3, "Lütfen en az 3 karakter giriniz.")
    .max(30, "Soyadı en fazla 30 karakter olmalıdır.")
    .matches(
      /^[A-Za-zçöşğüıİÇÖŞĞÜ\s]+$/,
      "Soyadı yalnızca harf ve boşluklardan oluşmalıdır."
    )
    .trim(),

  email: Yup.string()
    .required("Lütfen e-posta adresi giriniz.")
    .email("Geçerli bir e-posta adresi giriniz.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Geçerli bir e-posta adresi giriniz."
    )
    .max(50, "E-posta en fazla 50 karakter olmalıdır.")
    .trim(),

  password: Yup.string()
    .required("Lütfen şifre giriniz.")
    .min(8, "Lütfen en az 8 karakter giriniz.")
    .matches(/[0-9]/, "Şifre bir sayı içermelidir")
    .matches(/[a-z]/, "Şifre bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Şifre bir büyük harf içermelidir")
    .matches(/[^\w]/, "Şifre bir sembol içermelidir")
    .trim(),

  confirmPassword: Yup.string()
    .required("Lütfen şifrenizi onaylayın")
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor")
    .trim(),

  checkbox: Yup.boolean()
    .required("Lütfen kullanım şartlarını kabul ediniz.")
    .oneOf([true], "Lütfen kullanım şartlarını kabul ediniz."),
});
