import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Lütfen e-posta adresi giriniz.")
    .email("Geçerli bir e-posta adresi giriniz.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Geçerli bir e-posta adresi giriniz."
    )
    .max(50, "E-posta en fazla 50 karakter olmalıdır.")
    .trim(),

  password: Yup.string().required("Lütfen şifre giriniz.").trim(),
});
