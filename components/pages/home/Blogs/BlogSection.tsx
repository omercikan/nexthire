"use client";

import SectionHeader from "@/components/SectionHeader";
import { BlogPost } from "@/types";
import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import BlogsSwiper from "./Swiper/BlogSwiper";

const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  return (
    <div className="container pt-[100px] pb-[70px] max-lg:py-[15px]">
      <SectionHeader
        title="NextHire Blog: Kariyeriniz İçin Bilgiler ve İpuçları"
        subtitle="Kariyerinize yön verecek yazılar ve iş dünyası ipuçları."
        linkText="Tümünü Görüntüle"
        link="/next-blog"
      />

      <section className="mt-[15px]">
        <div className="relative">
          <BlogsSwiper blogs={blogs} setBlogs={setBlogs} />

          <div
            className={`${
              blogs.length ? "!flex" : "!hidden"
            } slider-button-container !w-[115%] min-md:!hidden max-[730px]:!w-[103%] !left-[50%] -translate-x-[50%] max-[992px]:!px-0`}
          >
            <button
              className="prevBlog slide-button !bg-[#1967D2] !text-white"
              role="button"
              aria-label="önceki"
            >
              <BsChevronLeft size={18} />
            </button>

            <button
              className="nextBlog slide-button !bg-[#1967D2] !text-white"
              role="button"
              aria-label="sonraki"
            >
              <BsChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogSection;
