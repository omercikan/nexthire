import * as Yup from "yup";

export const candidateFormSchema = Yup.object().shape({
  name: Yup.string().required("isim girin"),
  email: Yup.string().required("e-posta girin").email("geçerli e-posta girin"),
});
