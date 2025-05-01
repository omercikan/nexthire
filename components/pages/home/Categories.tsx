"use client";

import SectionHeader from "@/components/SectionHeader";
import { categories } from "@/data/categories";
import { routeFormatter } from "@/lib/routeFormat";
import { RootState } from "@/lib/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Categories = () => {
  const { employers } = useSelector((state: RootState) => state.employers);

  return (
    <div className="container pt-[70px] pb-[100px]">
      <SectionHeader
        title="Kategorilere Göz At"
        subtitle="Farklı alanlardaki iş fırsatlarını keşfedin ve size en uygun olanı bulun."
        linkText="Tümünü Gör"
        link="/is-ilanlari"
      />

      <ul className="category-list x-scrollbar">
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
                  employers.filter(
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
    </div>
  );
};

export default Categories;
