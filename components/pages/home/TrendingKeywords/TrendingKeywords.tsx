import { trendingKeywords } from "@/data/trendingKeywords";
import { routeFormatter } from "@/lib/routeFormat";
import Link from "next/link";
import React from "react";

const TrendingKeywords = () => {
  return (
    <section className="pt-[100px] pb-[15px]">
      <div className="text-[#202124] text-center pb-5">
        <h1 className="text-3xl font-medium">Popüler Anahtar Kelimeler</h1>
        <p className="text-[15px]">
          Günümüzde en çok aranan ve dikkat çeken anahtar kelimeler
        </p>
      </div>

      <ul className="flex flex-wrap items-center justify-center gap-6 p-[15px]">
        {trendingKeywords.map((keyword) => (
          <li key={keyword.id}>
            <Link
              className="py-2.5 px-5 inline-block text-[#131a51] font-medium transition-colors duration-300 ease-in-out hover:bg-[#F5F2EA] border border-[#F5F2EA] rounded-full shadow-lg"
              href={`/is-ilanlari/?${new URLSearchParams({
                meslek: routeFormatter(keyword.keyword),
              })}`}
            >
              {keyword.keyword}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TrendingKeywords;
