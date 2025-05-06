"use client";

import { testimonials } from "@/data/testimonials";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Quotes from "@/img/home/quotes-icon.png";
import { FaPlay } from "react-icons/fa6";
import "./play-animation.scss";
import { CSSTransition } from "react-transition-group";

const Testimonials = () => {
  const [openVideo, setOpenVideo] = useState<boolean>(false);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#F5F2EA]">
      <div className="testimonials-wrapper-container">
        <Swiper
          className="flex-[1.6] max-[992px]:flex-[1.3] !mx-0 !h-max w-full"
          modules={[A11y, Pagination, Keyboard]}
          keyboard
          a11y={{
            firstSlideMessage: "Bu, ilk slayt. Önceki bir içerik yok.",
            lastSlideMessage: "Bu, son slayt. Sonraki bir içerik yok.",
            nextSlideMessage: "Sonraki Slayt",
            prevSlideMessage: "Önceki Slay",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
          }}
          loop
          pagination={{
            clickable: true,
            renderBullet(_index, className) {
              return `<span class="${className} testimonials"></span>`;
            },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id} className="w-max !h-max">
              <div className="flex">
                <Image
                  src={Quotes}
                  alt="icon"
                  width={70}
                  height={70}
                  className="rounded-md me-[18px]"
                />

                <div>
                  <h3 className="text-[#202124] text-lg font-medium">
                    {testimonial.name}
                  </h3>
                  <span className="text-[#77838f] text-sm">
                    {testimonial.role}
                  </span>
                </div>
              </div>

              <div className="mt-[15px] h-max">
                <p className="text-[#202124] text-xl font-medium">
                  {testimonial.content}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex-[1] relative">
          <div className="play-wrapper" onClick={() => setOpenVideo(true)}>
            <FaPlay className="transition-colors duration-200 text-[40px] max-[1024px]:!text-[20px]" />
          </div>
          <Image
            src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1746457159/65d90b36_msuhlm.jpg"
            alt="İnsan Kaynakları"
            width={370}
            height={390}
            draggable={false}
            className="h-[390px] max-lg:h-auto max-md:!w-[370px] max-md:h-[390px] max-[430px]:!h-[300px] !w-full object-cover object-top rounded-md"
          />
        </div>
      </div>

      <CSSTransition
        in={openVideo}
        nodeRef={videoWrapperRef}
        classNames="iframe-video"
        timeout={300}
        unmountOnExit
      >
        <div className="fixed left-0 top-0 z-[51] bg-black/75 w-full h-full grid place-content-center overflow-hidden">
          <div ref={videoWrapperRef} className="relative">
            <div
              className="ms-auto w-max text-white opacity-60 hover:opacity-100 text-3xl cursor-pointer relative bottom-2"
              onClick={() => setOpenVideo(false)}
            >
              ×
            </div>

            <iframe
              className="drop-shadow-2xl drop-shadow-black/50 max-[992px]:w-[95vw] max-[992px]:h-[60vw]"
              width="900"
              height="506"
              src="https://www.youtube-nocookie.com/embed/sxjgL64czRY?si=12-2SHMZjT0teTTT"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </CSSTransition>
    </section>
  );
};

export default Testimonials;
