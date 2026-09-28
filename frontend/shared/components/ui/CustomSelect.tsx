import { FormatText } from "@/shared/utils/formatText";
import { AuthSelectProps } from "@/shared/types";
import React, { FC } from "react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

const CustomSelect: FC<AuthSelectProps> = ({
  handleChangeCapture,
  data,
  defaultValue,
  name,
  isSubmitting,
  isDefaultValueOption = true,
  isFormatText = true,
  className,
  label,
  labelClass,
  error,
  ...rest
}) => {
  return (
    <div className="flex-[1]">
      <label
        htmlFor={name}
        className={`${labelClass ?? ""} text-[#00000099] block`}
      >
        {label}
      </label>
      <div className="relative">
        <select
          {...rest}
          defaultValue={defaultValue}
          name={name}
          id={name}
          className={`custom__input ${className ?? ""} ${
            error ? "!border-[#D91B1B]" : "border-[#D3E0FE]"
          } valid:text-[#101828] appearance-none disabled:text-gray-500 disabled:bg-[#e9ecef]`}
          onChangeCapture={handleChangeCapture}
          disabled={!data.length || isSubmitting ? true : false}
        >
          {isDefaultValueOption && (
            <option disabled className="bg-gray-100" value={defaultValue}>
              {defaultValue}
            </option>
          )}
          {data
            .filter((val) => val.name !== undefined)
            .map((val) => (
              <option
                key={val.id}
                className="text-gray-500"
                value={val.name}
                disabled={val.disabled}
              >
                {isFormatText ? FormatText(val.name) : val.name}
              </option>
            ))}
        </select>

        <HiOutlineChevronUpDown className="absolute right-3 top-[50%] -translate-y-[50%]" />
      </div>
      {error ? (
        <div className="text-[#D91B1B] text-sm mt-1">{error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
