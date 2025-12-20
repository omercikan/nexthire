import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { formFields, shareJobFormSchemaType } from "./formValidation";
import { ShareJobFields } from "./fields.constant";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface SelectFieldProps {
  selectFields: ShareJobFields;
  errors: FieldErrors<shareJobFormSchemaType>;
  register: UseFormRegister<shareJobFormSchemaType>;
}

const SelectFields = ({ selectFields, errors, register }: SelectFieldProps) => {
  return (
    <>
      {selectFields.map(({ label, options, name, defaultValue }) => (
        <div key={label}>
          <label htmlFor={name} className="mb-1.5 block text-sm">
            {label}
          </label>

          <div className="relative">
            <select
              {...register(name as formFields)}
              className={`custom__input !ps-4 ${
                errors[name as formFields]?.message
                  ? "!border-[#D91B1B]"
                  : "border-[#D3E0FE]"
              } !rounded-[15px] valid:text-[#101828] appearance-none disabled:text-gray-500 disabled:bg-[#e9ecef]`}
              id={name}
            >
              <option value="" disabled>
                {defaultValue}
              </option>

              {options?.map((option) => (
                <option key={option} id={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <HiOutlineChevronUpDown className="absolute right-3 top-[50%] -translate-y-[50%]" />
          </div>

          {errors[name as formFields]?.message && (
            <div className="text-[#D91B1B] text-sm mt-1">
              {errors[name as formFields]?.message}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default SelectFields;
