"use client";

import { brands } from "@/data/brands";
import Image from "next/image";
import React from "react";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Navigation, Autoplay } from "swiper/modules";

const Companies = () => {
  return (
    <section className="py-[85px] max-[992px]:py-[30px]">
      <div className="mb-[40px] text-center">
        <h2 className="text-[#202124] text-[15px]">Öncü markaların tercihi</h2>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          className="group"
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            425: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id} className="text-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={100}
                height={34}
                quality={100}
                className="slide-image"
                draggable={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="slider-button-container">
          <button className="prev slide-button">
            <BsChevronLeft size={18} />
          </button>

          <button className="next slide-button">
            <BsChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Companies;
