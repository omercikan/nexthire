import * as Yup from "yup";

export const ResumeSchema = Yup.object().shape({
  resume: Yup.mixed()
    .required("Lütfen bir özgeçmiş (CV) dosyası yükleyin")
    .test(
      "fileExtension",
      "Yalnızca PDF formatı yükleyebilirsiniz",
      (value) => {
        if (value instanceof File) {
          return value.type === "application/pdf";
        }
      }
    )
    .test("fileSize", "En fazla 3 mb dosya yükleyebilirsiniz", (value) => {
      return value instanceof File && value.size <= 3 * 1024 * 1024;
    }),
});
