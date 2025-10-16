import { AuthCheckboxProps } from "@/shared/types";
import { usePathname } from "next/navigation";
import React from "react";
import { BsCheck } from "react-icons/bs";

const CustomCheckbox = ({
  error,
  values,
  handleChange,
  isSubmitting,
  text,
  name,
  ...rest
}: AuthCheckboxProps) => {
  const pathname = usePathname();

  return (
    <>
      <div className="flex items-center gap-2">
        <div className="relative flex justify-center items-center w-3.5 h-3.5">
          {values && (
            <BsCheck className="absolute pointer-events-none" color="fff" />
          )}
          <input
            {...rest}
            type="checkbox"
            id={name}
            onChange={handleChange}
            className={`custom-checkbox ${error ? "!border-red-400" : ""}`}
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

      {error && pathname !== "/aday-uye-ol" ? (
        <div className="text-[#D91B1B] text-sm max-[430px]:text-xs">
          {error}
        </div>
      ) : null}
    </>
  );
};

export default CustomCheckbox;
