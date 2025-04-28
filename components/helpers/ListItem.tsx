import React, { ReactNode } from "react";
import { IconType } from "react-icons/lib";

export interface ListemItemProps {
  itemClass?: string;
  itemWrapperClass?: string;
  itemTextClass: string;
  content?: {
    icon?: IconType;
    name: string;
    className: string;
  };
  subtext: string;
  subTextClass: string;
  image: ReactNode;
}

const ListItem = ({
  itemClass,
  itemWrapperClass,
  itemTextClass,
  content,
  subtext,
  subTextClass,
  image,
}: ListemItemProps) => {
  return (
    <li className={itemClass}>
      <div className={itemWrapperClass || content?.className}>
        {content?.icon && <content.icon size={40} color="202124" />}
        {image && image}
      </div>
      <h4 className={itemTextClass}>{content?.name}</h4>
      <span className={subTextClass}>( {subtext} )</span>
    </li>
  );
};

export default ListItem;
