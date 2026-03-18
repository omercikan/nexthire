interface LabelProps {
  label: string;
  htmlFor: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLLabelElement>;
}

const Label: React.FC<LabelProps> = ({
  label,
  htmlFor,
  className = "",
  onClick,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-[#080C0F] block mb-2 text-sm font-medium ${className}`}
      onClick={onClick}
    >
      {label}
    </label>
  );
};

export default Label;
