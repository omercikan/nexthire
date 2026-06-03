import CustomButton from "@/shared/components/ui/CustomButton";
import { cn } from "@/shared/libs/utils";
import { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  onClick: () => void;
  buttonContent: ReactNode;
  buttonClassName?: string;
  children: React.ReactNode;
}

const FormField = ({
  label,
  required,
  error,
  onClick,
  buttonContent,
  buttonClassName = "",
  children,
}: FormFieldProps) => {
  return (
    <div className="relative">
      <label
        htmlFor="date"
        className="flex gap-2 text-sm text-[#050c13] font-medium mb-2"
      >
        {label} {required && <span className="text-[#e7000b]">*</span>}
      </label>

      <CustomButton
        className={cn(
          `py-2! px-3! w-full shadow-xs flex items-center gap-2 bg-transparent! hover:bg-[#f3f5f8]! text-muted-foreground! hover:text-black! text-sm rounded-md! border ${error ? "border-red-600" : "border-border"}`,
          buttonClassName,
        )}
        handleClick={onClick}
      >
        {buttonContent}
      </CustomButton>

      {children}

      {error && (
        <span className="text-xs text-red-600 mt-2 block">{error}</span>
      )}
    </div>
  );
};

export default FormField;
