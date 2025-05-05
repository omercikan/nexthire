import { stepCards } from "@/data/stepCards";
import React from "react";
import StepCardHeader from "./StepCardHeader";
import StepCardItem from "./StepCardItem";

const StepCards = () => {
  return (
    <section>
      <div className="container py-[100px] max-lg:py-[30px]">
        <StepCardHeader />

        <ul className="flex max-md:flex-col justify-evenly items-center mt-[25px]">
          {stepCards.map((card) => (
            <StepCardItem key={card.id} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default StepCards;
