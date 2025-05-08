import { routeFormatter } from "@/lib/routeFormat";
import { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogSlide = ({ blog }: { blog: BlogPost }) => {
  return (
    <div className="h-full">
      <article className="h-full">
        <figure className="blog-figure">
          <Link
            className="blog-category-text"
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
              className="blog-image"
            />
          </Link>
        </figure>

        <div className="mt-[30px]">
          <div className="text-[15px]">
            <time className="blog-time-text">
              {new Intl.DateTimeFormat("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }).format(blog.createdAt)}
            </time>
            <span className="text-[#202124]">Admin</span>
          </div>

          <h1 className="blog-title-text">
            <Link
              href={`/next-blog/${routeFormatter(blog.title)}`}
              className="blog-title-link-text"
            >
              {blog.title}
            </Link>
          </h1>
        </div>
      </article>
    </div>
  );
};

export default BlogSlide;
