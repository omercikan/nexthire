import React from "react";
import { CardItemTypes } from "./card.types";

const CardItem = ({ title, text, element }: CardItemTypes) => {
  return (
    <li className="flex justify-between items-center">
      <h3 className="text-[#202124] font-medium whitespace-nowrap text-ellipsis overflow-hidden">{title}:</h3>
      {text ? (
        <span className="text-[#696969] text-[15px]">{text}</span>
      ) : (
        element
      )}
    </li>
  );
};

export default CardItem;
