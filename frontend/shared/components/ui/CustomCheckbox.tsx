import { AuthCheckboxProps } from "@/shared/types";
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
            id={name}
            onChange={handleChange}
            className={`custom-checkbox ${errors ? "!border-red-400" : ""}`}
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

      {errors && pathname !== "/aday-uye-ol" ? (
        <div className="text-[#D91B1B] text-sm max-[430px]:text-xs">
          {errors}
        </div>
      ) : null}
    </>
  );
};

export default CustomCheckbox;
