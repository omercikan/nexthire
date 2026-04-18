import { CustomInputProps } from "@/shared/types";

const CustomInput = ({
  label,
  icon,
  extraIcon,
  handleClickPasswordDisplay,
  className,
  iconSpanClass,
  children,
  labelClass,
  wrapperClass = "",
  error,
  ...props
}: CustomInputProps) => {
  return (
    <div className={`w-full ${wrapperClass}`}>
      {label && (
        <label
          htmlFor={props.name}
          className={`block mb-1.5 ${labelClass ?? ""}`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <span
          className={`auth-input__span left-3 ${
            iconSpanClass ? iconSpanClass : ""
          }`}
        >
          {icon}
        </span>

        <input
          id={props.name}
          autoComplete="on"
          {...props}
          className={`custom__input ${
            error ? "!border-[#D91B1B]" : "border-[#D3E0FE]"
          } ${className ? className : ""}`}
        />

        {children && children}

        {extraIcon && (
          <span
            className="auth-input__span right-3 cursor-pointer"
            onClick={handleClickPasswordDisplay}
          >
            {extraIcon}
          </span>
        )}
      </div>

      {error && <div className="text-[#D91B1B] text-sm mt-1">{error}</div>}
    </div>
  );
};

export default CustomInput;
