import React from "react";

const ContactItem = ({
  items,
}: {
  items: { label: string; text: string }[];
}) => {
  return (
    <>
      {items.map(({ label, text }, index) => (
        <div key={index} className="mb-3">
          <label className="text-[#00000099] text-xs line-clamp-none">
            {label}
          </label>
          <p className="text-[#000000E6] text-sm">{text}</p>
        </div>
      ))}
    </>
  );
};

export default ContactItem;
