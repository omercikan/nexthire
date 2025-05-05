import { StepCardItemProps } from "@/types";
import Image from "next/image";
import React from "react";

const StepCardItem = ({ card }: StepCardItemProps) => {
  return (
    <li key={card.id} className="text-center p-[15px]">
      <Image
        src={card.cardImage}
        alt={card.cardTitle}
        width={200}
        height={182}
        className="mx-auto !w-[200px] !h-[182px] object-cover"
      />
      <h2 className="text-[#202124] text-[20px] font-medium my-[15px]">
        {card.cardTitle}
      </h2>
      <p className="text-[#202124]">{card.cardDescription}</p>
    </li>
  );
};

export default StepCardItem;
