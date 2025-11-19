import React from "react";

const ResumeColumn = ({
  items,
}: {
  items: {
    title: string;
    text: string;
    wrapperClass?: string;
    spanClass?: string;
  }[];
}) => {
  return (
    <>
      {items.map(({ text, wrapperClass, title, spanClass }) => (
        <div key={text} className={wrapperClass}>
          <h3 className="text-[#232323] font-medium whitespace-nowrap text-ellipsis overflow-hidden w-max text-[15px]">
            {title}
          </h3>
          <span className={`text-sm text-[#718EBF] ${spanClass ?? ""}`}>
            {text}
          </span>
        </div>
      ))}
    </>
  );
};

export default ResumeColumn;
