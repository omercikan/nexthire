import { BlogPost } from "@/shared/types";
import React, { useEffect } from "react";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogSlide from "./BlogSlide";
import { Typography } from "@mui/material";
import useCreateArray from "@/shared/hooks/useCreateArray";
import { fetchData } from "@/shared/utils/fetchData";
import LoaderSkeleton from "@/shared/components/ui/LoaderSkeleton";

const BlogsSwiper = ({
  blogs,
  setBlogs,
}: {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}) => {
  const placeholderLoader = useCreateArray(3);

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
              <LoaderSkeleton
                animationType="wave"
                variant="rectangular"
                sxClass={{
                  borderRadius: "18px",
                  width: "100%",
                  height: "284.200px",
                }}
                length={1}
                className="max-lg:!h-[200px]"
              />

              <Typography marginTop={2.5}>
                <LoaderSkeleton
                  sxClass={{
                    width: "84.66px",
                    height: "21.6px",
                    borderRadius: "4px",
                  }}
                  variant="text"
                  animationType="wave"
                  length={1}
                />

                <LoaderSkeleton
                  sxClass={{
                    width: "262.79px",
                    height: "28.8px",
                    borderRadius: "4px",
                  }}
                  variant="text"
                  animationType="wave"
                  length={1}
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
