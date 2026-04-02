import CustomInput from "@/shared/components/ui/CustomInput";
import { ShareJobFields } from "./fields.constant";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { formFields, shareJobFormSchemaType } from "./validations/formValidation";

interface InputFieldProps {
  inputFields: ShareJobFields;
  errors: FieldErrors<shareJobFormSchemaType>;
  register: UseFormRegister<shareJobFormSchemaType>;
}

type inputMode =
  | "text"
  | "numeric"
  | "search"
  | "email"
  | "tel"
  | "url"
  | "none"
  | "decimal";

const InputFields = ({ inputFields, errors, register }: InputFieldProps) => {
  return (
    <>
      {inputFields.map(
        (
          {
            label,
            name,
            placeholder,
            field = "text",
            inputMode = "text",
            className = "",
            min,
          },
          i
        ) => (
          <CustomInput
            label={label}
            key={i}
            labelClass="text-sm"
            className={`!ps-4 !rounded-[15px] ${className}`}
            placeholder={placeholder}
            type={field}
            min={min}
            inputMode={inputMode as inputMode}
            error={errors[name as formFields]?.message}
            {...register(name as formFields)}
          />
        )
      )}
    </>
  );
};

export default InputFields;
