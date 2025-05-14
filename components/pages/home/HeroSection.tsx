import React from "react";
import HomeStyles from "@/scss/home-bg.module.scss";
import Image from "next/image";
import HeroBg from "@/img/hero-bg.jpg";
import SearchJob from "@/components/SearchJob";
import { jobKeywords } from "@/data/job-keywords";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <picture>
        <Image
          src={HeroBg}
          alt="Ana sayfa kahraman görseli"
          className="object-cover bg-left pointer-events-none"
          fill
          priority
          sizes="100vw"
        />
      </picture>

      <div className={`${HomeStyles.heroAnimation} text-center`}>
        <div className="mb-5">
          <h2 className="hero-section-title">
            Sizin için en iyi işleri buluyoruz
          </h2>
          <p className="mt-2.5 max-[540px]:text-[15px]">
            12.800 iş arasından kariyer fırsatınızı arayın
          </p>
        </div>

        <SearchJob jobKeywords={jobKeywords} />
      </div>
    </section>
  );
};

export default HeroSection;
