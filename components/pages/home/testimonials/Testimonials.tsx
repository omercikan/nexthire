"use client";

import React, { useState } from "react";
import TestimonialsSwiper from "./Swiper/TestimonialsSwiper";
import VideoThumbnail from "./VideoSection/VideoThumbnail";
import VideoModal from "./VideoSection/VideoModal";

const Testimonials = () => {
  const [openVideo, setOpenVideo] = useState<boolean>(false);

  return (
    <section className="bg-[#F5F2EA]">
      <div className="testimonials-wrapper-container">
        <TestimonialsSwiper />

        <VideoThumbnail setOpenVideo={setOpenVideo} />
      </div>

      <VideoModal openVideo={openVideo} setOpenVideo={setOpenVideo} />
    </section>
  );
};

export default Testimonials;
