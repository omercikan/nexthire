import React, { FC } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

const FeatureItem: FC<{ text: string }> = ({ text }) => {
  return (
    <li className="flex gap-2.5 mb-4">
      <FaRegCircleCheck color="4045ef" size={20} />
      <p className="text-sm font-normal">{text}</p>
    </li>
  );
};

export default FeatureItem;
