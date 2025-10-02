"use client";

import React from "react";
import StepCardHeader from "./StepCardHeader";
import StepCardItem from "./StepCardItem";
import { motion } from "framer-motion";
import { stepCards } from "@/shared/data/stepCards";

const StepCards = () => {
  return (
    <section>
      <motion.div
        className="container py-[100px] max-lg:py-[30px]"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <StepCardHeader />

        <ul className="flex max-md:flex-col justify-evenly items-center mt-[25px]">
          {stepCards.map((card) => (
            <StepCardItem key={card.id} card={card} />
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default StepCards;
