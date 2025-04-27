import React from "react";
import { IconType } from "react-icons/lib";

export interface ListemItemProps {
  itemClass: string;
  itemWrapperClass: string;
  itemTextClass: string;
  content: {
    icon: IconType;
    name: string;
  };
  subtext: string;
  subTextClass: string;
}

const ListItem = ({
  itemClass,
  itemWrapperClass,
  itemTextClass,
  content,
  subtext,
  subTextClass
}: ListemItemProps) => {
  return (
    <li className={itemClass}>
      <div className={itemWrapperClass}>
        {content.icon && <content.icon size={40} color="202124" />}
      </div>
      <h4 className={itemTextClass}>{content.name}</h4>
      <span className={subTextClass}>( {subtext} )</span>
    </li>
  );
};

export default ListItem;
