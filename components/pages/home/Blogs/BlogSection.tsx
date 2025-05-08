"use client";

import SectionHeader from "@/components/SectionHeader";
import { fetchData } from "@/lib/fetchData";
import { routeFormatter } from "@/lib/routeFormat";
import { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";

const BlogSection = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const placeholderLoader = Array.from({ length: 3 }, (_, i) => i);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data }: { data: { blogs: BlogPost[]; blogsSize: number } } =
        await fetchData("/api/firebase/fetchBlogs/?start=0&end=3");

      if (data.blogs) setBlogs(data.blogs);
    };

    fetchBlogs();
  }, []);

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
          <Swiper
            className="!mx-0"
            spaceBetween={35}
            modules={[A11y, Navigation]}
            navigation={{
              nextEl: ".nextBlog",
              prevEl: ".prevBlog",
            }}
            a11y={{
              firstSlideMessage: "Bu, ilk slayt. Önceki bir içerik yok.",
              lastSlideMessage: "Bu, son slayt. Sonraki bir içerik yok.",
              nextSlideMessage: "Sonraki Slayt",
              prevSlideMessage: "Önceki Slay",
            }}
            loop
            breakpoints={{
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
            }}
          >
            {blogs.length ? (
              blogs.map((blog) => (
                <SwiperSlide key={blog.blogId} className="!h-auto">
                  <div className="h-full">
                    <article className="h-full">
                      <figure className="h-[300px] max-[1280px]:h-[250px] max-lg:h-[222px] max-[992px]:!h-[200px] max-[480px]:!h-[235px] overflow-hidden rounded-xl">
                        <Link
                          className="text-sm bg-white hover:text-[#1967d2] py-[5px] px-[15px] rounded-full absolute top-5 left-5 z-10"
                          href={`/next-blog/?${new URLSearchParams({
                            kategori: routeFormatter(blog.category),
                          })}`}
                        >
                          <span>{blog.category}</span>
                        </Link>

                        <Link href={`/next-blog/${routeFormatter(blog.title)}`}>
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            width={410}
                            height={310}
                            className="w-full h-full object-cover rounded-xl hover:scale-105 transition duration-300"
                          />
                        </Link>
                      </figure>

                      <div className="mt-[30px]">
                        <div className="text-[15px]">
                          <time className="text-[#77838f] border-r border-[#ECEDF2] me-2.5 pe-2.5">
                            {new Intl.DateTimeFormat("tr-TR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }).format(blog.createdAt)}
                          </time>
                          <span className="text-[#202124]">Admin</span>
                        </div>

                        <h1 className="text-[#202124] hover:text-[#1967d2] transition-colors duration-300 font-medium text-[20px] mt-3">
                          <Link
                            href={`/next-blog/${routeFormatter(blog.title)}`}
                            className="whitespace-nowrap overflow-hidden text-ellipsis inline-block w-full"
                          >
                            {blog.title}
                          </Link>
                        </h1>
                      </div>
                    </article>
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <>
                {placeholderLoader.map((_, i) => (
                  <SwiperSlide key={i}>
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      sx={{
                        borderRadius: "18px",
                        width: "100%",
                        height: "284.200px",
                      }}
                    />

                    <Typography marginTop={2.5}>
                      <Skeleton width={84.66} height={21.6} animation="wave" />
                      <Skeleton
                        width={262.79}
                        height={28.8}
                        animation="wave"
                        className="max-[1280px]:!w-[200px] max-[480px]:!w-[262.79px]"
                      />
                    </Typography>
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>

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
