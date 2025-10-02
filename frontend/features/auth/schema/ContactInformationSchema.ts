import * as Yup from "yup";

export const ContactInformationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Geçerli bir e-posta adresi girin")
    .required("Geçerli bir E-posta girin"),

  phone: Yup.string()
    .matches(
      /^(?:\+90|0)(5\d{2})\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Geçerli bir telefon numarası girin"
    )
    .required("Geçerli bir telefon numarası girin"),
});
