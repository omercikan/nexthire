import { AuthCheckboxProps } from "@/shared/types";
import { useField } from "formik";
import { usePathname } from "next/navigation";
import React from "react";
import { BsCheck } from "react-icons/bs";

const CustomCheckbox = ({
  errors,
  values,
  handleChange,
  isSubmitting,
  text,
  name,
}: AuthCheckboxProps) => {
  const { ...props } = { text, name, isSubmitting, values, errors };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_fields, meta] = useField(props);
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative flex justify-center items-center w-3.5 h-3.5">
          {values && (
            <BsCheck className="absolute pointer-events-none" color="fff" />
          )}
          <input
            type="checkbox"
            name={name}
            id={name}
            className={`custom-checkbox ${errors ? "!border-red-400" : ""}`}
            checked={values}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>

        {text && (
          <label
            htmlFor={name}
            className="text-sm max-[430px]:text-xs select-none"
          >
            {text}
          </label>
        )}
      </div>

      {meta.error && pathname !== "/aday-uye-ol" ? (
        <div className="text-[#D91B1B] text-sm max-[430px]:text-xs">{meta.error}</div>
      ) : null}
    </>
  );
};

export default CustomCheckbox;
