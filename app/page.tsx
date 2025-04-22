"use client";

import { Jost } from "next/font/google";
import AnimationInputStyles from "@/scss/animation-input.module.scss";
import HomeStyles from "@/scss/home-bg.module.scss";
import { IoIosSearch } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";

const jost = Jost({
  display: "swap",
  weight: ["500", "600", "700"],
});

export default function Home() {
  return (
    <main className={jost.className}>
      <section
        className={`${HomeStyles.homeBg} pt-[170px] max-lg:py-[30px] max-lg:px-[12px]`}
      >
        <div className={`${HomeStyles.heroAnimation} text-center`}>
          <div className="mb-5">
            <h2 className="hero-section-title">
              Sizin için en iyi işleri buluyoruz
            </h2>
            <p className="mt-2.5 max-[540px]:text-[15px]">
              12.800 iş arasından kariyer fırsatınızı arayın
            </p>
          </div>

          <form className="hero-section-form" noValidate>
            <div className="hero-section-form__wrapper">
              <div
                className={`hero-section-form__input-group ${AnimationInputStyles.animationInputWrapper} min-md:border-e max-md:border-b border-[#ECEDF2]`}
              >
                <IoIosSearch
                  className="absolute left-0 top-[50%] -translate-y-[50%]"
                  size={24}
                  color="696969"
                />
                <input
                  className="custom__input !border-0 text-[#696969] !text-[15px]"
                  type="text"
                  required
                  aria-label="Meslek adı ile ara"
                />
                <ul>
                  <li>
                    <span>Yazılım</span>
                  </li>
                  <li>
                    <span>Sağlık</span>
                  </li>
                  <li>
                    <span>Makine Mühendisi</span>
                  </li>
                  <li>
                    <span>UX/UI Designer</span>
                  </li>
                </ul>
              </div>

              <div className="hero-section-form__input-group relative">
                <SlLocationPin
                  className="absolute left-0 top-[50%] -translate-y-[50%]"
                  color="696969"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Şehir veya ilçe ara"
                  className="custom__input !border-0 !text-[15px] text-[#696969]"
                />
              </div>

              <div className="w-full flex-[0.5]">
                <button className="hero-section-form__button">İş Bul</button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
