import React from "react";
import { IconType } from "react-icons/lib";
import { colors } from "../constants/color";

const CardItem = ({
  icon: Icon,
  title,
  text,
  index,
}: {
  icon: IconType;
  title: string;
  text: string;
  index: number;
}) => {
  return (
    <li className="bg-white py-[25px] px-[52px] max-lg:py-5 max-lg:px-7 rounded-[25px] flex max-[608px]:flex-col max-[608px]:items-center max-[608px]:text-center flex-[1] gap-x-[22px] gap-y-[15px]">
      <span
        className="grid place-content-center w-[70px] h-[70px] max-lg:w-[45px] max-lg:h-[45px] rounded-full bg-[#E7EDFF]"
        style={{ backgroundColor: colors[index + 1].background }}
      >
        <Icon
          className="text-[30px] max-lg:text-[22px]"
          color={colors[index + 1].color}
        />
      </span>

      <div>
        <h4 className="text-[#232323] text-xl max-sm:text-lg max-[425px]:text-sm font-semibold whitespace-nowrap">
          {title}
        </h4>
        <span className="text-[#718EBF] mt-1 block min-[608px]:w-[150px] whitespace-nowrap text-ellipsis overflow-hidden max-[608px]:mx-auto">
          {text}
        </span>
      </div>
    </li>
  );
};

export default CardItem;
