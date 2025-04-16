import { FormatText } from "@/lib/formatText";
import { AuthSelectProps } from "@/types";
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
}) => {
  const { ...props } = { data, defaultValue, name };
  const [_field, meta] = useField(props);

  return (
    <div className="flex-[1]">
      <div className="relative">
        <select
          value={value ? value : defaultValue}
          name={name}
          className={`custom__input ${
            meta.error ? "!border-[#D91B1B]" : "border-[#D3E0FE]"
          } valid:text-[#101828] appearance-none disabled:text-gray-500 disabled:bg-[#e9ecef]`}
          onChange={handleChange}
          onChangeCapture={handleChangeCapture}
          disabled={!data.length || isSubmitting ? true : false}
        >
          <option disabled className="bg-gray-100" value={defaultValue}>
            {defaultValue}
          </option>
          {data.map((val) => (
            <option key={val.id} className="text-gray-500" value={val.name}>
              {FormatText(val.name)}
            </option>
          ))}
        </select>

        <HiOutlineChevronUpDown className="absolute right-3 top-[50%] -translate-y-[50%]" />
      </div>
      {meta.error ? (
        <div className="text-[#D91B1B] text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomSelect;
