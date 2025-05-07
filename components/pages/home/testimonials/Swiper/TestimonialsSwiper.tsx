import React from "react";
import { A11y, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { testimonials } from "@/data/testimonials";
import TestimonialSlide from "./TestimonialSlide";

const TestimonialsSwiper = () => {
  return (
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
          <TestimonialSlide testimonial={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsSwiper;
