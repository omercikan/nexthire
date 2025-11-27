import CustomButton from "@/shared/components/ui/CustomButton";
import React, { MouseEventHandler, ReactNode } from "react";

interface MenuListProps {
  handleClick?: MouseEventHandler;
  isLoading?: boolean;
  buttonContent: ReactNode;
  buttonClass?: string;
}

const MenuList = ({
  list,
  listClass = "",
}: {
  list: MenuListProps[];
  listClass: string;
}) => {
  return (
    <ul
      className={`absolute bg-[#fcfcfc] rounded-sm border border-[#d1d5db] ${listClass}`}
    >
      {list.map(
        (
          { handleClick, isLoading = false, buttonContent, buttonClass = "" },
          i
        ) => (
          <li key={i}>
            <CustomButton
              className={buttonClass}
              handleClick={handleClick}
              isSubmitting={isLoading}
              circularColor="#1814f3"
            >
              {buttonContent}
            </CustomButton>
          </li>
        )
      )}
    </ul>
  );
};

export default MenuList;
