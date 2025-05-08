import { fetchData } from "@/lib/fetchData";
import { BlogPost } from "@/types";
import React, { useEffect } from "react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogSlide from "./BlogSlide";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";

const BlogsSwiper = ({
  blogs,
  setBlogs,
}: {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}) => {
  const placeholderLoader = Array.from({ length: 3 }, (_, i) => i);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data }: { data: { blogs: BlogPost[]; blogsSize: number } } =
        await fetchData("/api/firebase/fetchBlogs/?start=0&end=3");

      if (data.blogs) setBlogs(data.blogs);
    };

    fetchBlogs();
  }, [setBlogs]);

  return (
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
          <SwiperSlide key={blog.blogId}>
            <BlogSlide blog={blog} />
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
  );
};

export default BlogsSwiper;
