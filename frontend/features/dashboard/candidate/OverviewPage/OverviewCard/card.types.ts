import { IconType } from "react-icons/lib";

export interface CardItemFields {
  cardId?: number;
  backgroundColor: string;
  textColor: string;
  icon: IconType;
  cardTitle: string;
  cardText: string | number;
}
