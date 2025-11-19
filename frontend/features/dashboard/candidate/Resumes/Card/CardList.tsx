import React, { useRef } from "react";
import CardItem from "./CardItem";
import { IconType } from "react-icons/lib";

const CardList = ({
  cards,
}: {
  cards: { icon: IconType; title: string; text: string }[];
}) => {
  const cardRef = useRef<HTMLUListElement | null>(null);

  return (
    <ul className="flex flex-wrap gap-[30px] gap-y-5" ref={cardRef}>
      {cards?.map(({ icon, text, title }, index) => (
        <CardItem
          key={title}
          icon={icon}
          title={title}
          text={text}
          index={index}
        />
      ))}
    </ul>
  );
};

export default CardList;
