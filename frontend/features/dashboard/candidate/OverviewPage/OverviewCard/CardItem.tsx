import React from "react";
import { CardItemFields } from "./card.types";

const CardItem = ({
  icon: Icon,
  backgroundColor,
  textColor,
  cardTitle,
  cardText,
}: CardItemFields) => {
  return (
    <li className="flex flex-[1] gap-[15px] bg-white rounded-[25px] w-max py-[25px] max-md:py-5 px-[30px] max-md:px-[17px]">
      <div
        className="w-[70px] h-[70px] grid place-content-center rounded-full"
        style={{ backgroundColor: backgroundColor, color: textColor }}
      >
        <Icon size={30} />
      </div>

      <div>
        <span className="text-[#718EBF] text-sm whitespace-nowrap">
          {cardTitle}
        </span>
        <span className="text-[#232323] text-[25px] font-semibold block">
          {cardText}
        </span>
      </div>
    </li>
  );
};

export default CardItem;
