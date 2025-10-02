import Image from "next/image";
import React from "react";
import Quotes from "../../../assets/quotes-icon.png";
import { testimonialSlideProps } from "@/shared/types";

const TestimonialSlide = ({ testimonial }: testimonialSlideProps) => {
  return (
    <>
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
          <span className="text-[#77838f] text-sm">{testimonial.role}</span>
        </div>
      </div>

      <div className="mt-[15px] h-max">
        <p className="text-[#202124] text-xl font-medium">
          {testimonial.content}
        </p>
      </div>
    </>
  );
};

export default TestimonialSlide;
