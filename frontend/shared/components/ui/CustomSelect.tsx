import { FormatText } from "@/shared/utils/formatText";
import { AuthSelectProps } from "@/shared/types";
import { useField } from "formik";
import React, { FC } from "react";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

const CustomSelect: FC<AuthSelectProps> = ({
  handleChangeCapture,
  handleChange,
  data,
  defaultValue,
  name,
  isSubmitting,
  value,
  isDefaultValueOption = true,
  isFormatText = true,
  className,
  label,
  labelClass,
}) => {
  const { ...props } = { data, defaultValue, name };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_field, meta] = useField(props);

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
          value={value ? value : defaultValue}
          name={name}
          id={name}
          className={`custom__input ${className ?? ""} ${
            meta.error ? "!border-[#D91B1B]" : "border-[#D3E0FE]"
          } valid:text-[#101828] appearance-none disabled:text-gray-500 disabled:bg-[#e9ecef]`}
          onChange={handleChange}
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
      {meta.error ? (
        <div className="text-[#D91B1B] text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
