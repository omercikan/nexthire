import { trendingKeywords } from "@/data/trendingKeywords";
import React from "react";
import TrendingKeywordsHeader from "./TrendingHeader";
import KeywordItem from "./KeywordItem";

const TrendingKeywords = () => {
  return (
    <section className="pt-[100px] pb-[15px]">
      <TrendingKeywordsHeader />

      <ul className="flex flex-wrap items-center justify-center gap-6 p-[15px]">
        {trendingKeywords.map((keyword) => (
          <KeywordItem key={keyword.id} keyword={keyword} />
        ))}
      </ul>
    </section>
  );
};

export default TrendingKeywords;
