"use client";

import React, { useState } from "react";
import TestimonialsSwiper from "./Swiper/TestimonialsSwiper";
import VideoThumbnail from "./VideoSection/VideoThumbnail";
import VideoModal from "./VideoSection/VideoModal";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [openVideo, setOpenVideo] = useState<boolean>(false);

  return (
    <section className="bg-[#F5F2EA]">
      <motion.div
        className="testimonials-wrapper-container"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <TestimonialsSwiper />

        <VideoThumbnail setOpenVideo={setOpenVideo} />
      </motion.div>

      <VideoModal openVideo={openVideo} setOpenVideo={setOpenVideo} />
    </section>
  );
};

export default Testimonials;
