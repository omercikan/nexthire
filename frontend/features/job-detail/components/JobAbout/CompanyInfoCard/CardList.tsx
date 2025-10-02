import React from "react";
import CardItem from "./CardItem";
import { CardListProps } from "./card.types";

const CardList = ({ items }: CardListProps) => {
  return (
    <ul className="flex flex-col gap-y-5 mt-5">
      {items.map(({ id, text, title, element }) => (
        <CardItem key={id} text={text} element={element} title={title} />
      ))}
    </ul>
  );
};

export default CardList;
