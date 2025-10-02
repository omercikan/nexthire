"use client";

import React from "react";
import TrendingKeywordsHeader from "./TrendingHeader";
import KeywordItem from "./KeywordItem";
import { motion } from "framer-motion";
import { trendingKeywords } from "@/shared/data/trendingKeywords";

const TrendingKeywords = () => {
  return (
    <motion.section
      className="pt-[100px] max-lg:pt-[35px] pb-[15px]"
      initial={{ translateY: 20, opacity: 0 }}
      whileInView={{ translateY: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <TrendingKeywordsHeader />

      <ul className="flex flex-wrap items-center justify-center gap-6 p-[15px]">
        {trendingKeywords.map((keyword) => (
          <KeywordItem key={keyword.id} keyword={keyword} />
        ))}
      </ul>
    </motion.section>
  );
};

export default TrendingKeywords;
