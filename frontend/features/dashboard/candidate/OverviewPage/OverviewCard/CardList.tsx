import React from "react";
import CardItem from "./CardItem";
import { CardItemFields } from "./card.types";

const CardList = ({ cards }: { cards: CardItemFields[] }) => {
  return (
    <ul className="flex flex-wrap gap-[30px] max-sm:gap-[15px]">
      {cards.map(
        ({ cardId, icon, backgroundColor, cardText, cardTitle, textColor }) => (
          <CardItem
            key={cardId}
            backgroundColor={backgroundColor}
            cardText={cardText}
            cardTitle={cardTitle}
            icon={icon}
            textColor={textColor}
          />
        )
      )}
    </ul>
  );
};

export default CardList;
