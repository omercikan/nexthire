"use client";

import SectionHeader from "@/components/SectionHeader";
import { categories } from "@/data/categories";
import { routeFormatter } from "@/lib/routeFormat";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useGetFeaturedJobsQuery } from "@/lib/redux/services/featuredJobs";

const Categories = () => {
  const { data } = useGetFeaturedJobsQuery("");

  return (
    <motion.div
      className="container pt-[70px] max-lg:pt-[20px] max-lg:pb-[35px] pb-[100px]"
      initial={{ translateY: 50, scale: 0.8, opacity: 0 }}
      whileInView={{ translateY: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <SectionHeader
        title="Kategorilere Göz At"
        subtitle="Farklı alanlardaki iş fırsatlarını keşfedin ve size en uygun olanı bulun."
        linkText="Tümünü Gör"
        link="/is-ilanlari"
      />

      <ul className="category-list x-scrollbar max-md:mask-x-from-70%">
        {categories.map((category) => (
          <li key={category.id} className="group">
            <Link
              className="category-list-item w-full"
              href={`/is-ilanlari/?${new URLSearchParams({
                meslek: routeFormatter(category.name),
              })}`}
            >
              <div className="category-list-item-wrapper">
                <category.icon size={40} color="202124" />
              </div>
              <h1 className="category-item-text">{category?.name}</h1>
              <span className="category-subtext">
                ({" "}
                {`${
                  data?.employers.filter(
                    (employer) =>
                      employer.companyInformations.serviceArea == category.name
                  ).length
                } açık pozisyon`}{" "}
                )
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Categories;
