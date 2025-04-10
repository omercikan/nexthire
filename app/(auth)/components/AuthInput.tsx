import { AuthInputProps } from "@/types";
import { useField } from "formik";
import React from "react";

const AuthInput = ({
  label,
  icon,
  extraIcon,
  handleClickPasswordDisplay,
  className,
  ...props
}: AuthInputProps) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      <label className="block mb-1.5">{label}</label>
      <div className="relative">
        <span className="auth-input__span left-3">{icon}</span>

        <input
          {...field}
          {...props}
          className={`custom__input ${
            meta.error ? "!border-[#D91B1B]" : "border-[#D3E0FE]"
          } ${className ? className : ""}`}
        />

        <span
          className="auth-input__span right-3 cursor-pointer"
          onClick={handleClickPasswordDisplay}
        >
          {extraIcon}
        </span>
      </div>
      {meta.touched && meta.error ? (
        <div className="text-[#D91B1B] text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default AuthInput;
