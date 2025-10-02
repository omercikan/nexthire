"use client";

import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import "swiper/scss";
import Image from "next/image";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { routeFormatter } from "@/shared/utils/routeFormat";
import { TfiCrown } from "react-icons/tfi";
import Tooltip from "@mui/material/Tooltip";
import { motion } from "framer-motion";
import useCreateArray from "@/shared/hooks/useCreateArray";
import { useGetFeaturedJobsQuery } from "@/shared/redux/services/featuredJobsApi";
import useItemFilterText from "@/shared/hooks/useItemFilterText";
import SectionHeader from "@/shared/components/SectionHeader/SectionHeader";
import ItemFilterText from "@/shared/components/ItemFilterText";
import LoaderSkeleton from "@/shared/components/ui/LoaderSkeleton";

const FeaturedJobs = () => {
  const placeholderLoader = useCreateArray(3);
  const { data, isLoading } = useGetFeaturedJobsQuery("");
  const { applyItemFilter } = useItemFilterText();

  return (
    <motion.div
      className="container"
      initial={{ translateY: 50, scale: 0.8, opacity: 0 }}
      whileInView={{ translateY: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <SectionHeader
        title="Öne Çıkan İşler"
        subtitle="Kendinizi keşfedin, değerinizin karşılığını alacağınız işe adım"
        link="/is-ilanlari"
        linkText="Tüm İşlere Göz Atın"
      />

      <section className="pt-[25px]">
        <div className="relative">
          <Swiper
            className="!mx-0"
            spaceBetween={20}
            modules={[A11y, Navigation, Autoplay]}
            a11y={{
              firstSlideMessage: "Bu, ilk slayt. Önceki bir içerik yok.",
              lastSlideMessage: "Bu, son slayt. Sonraki bir içerik yok.",
              nextSlideMessage: "Sonraki Slayt",
              prevSlideMessage: "Önceki Slay",
            }}
            navigation={{
              nextEl: ".nextFeaturedJob",
              prevEl: ".prevFeaturedJob",
            }}
            loop={true}
            autoplay={{
              delay: 3000,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {!isLoading ? (
              data?.employers.map((job, index) => (
                <SwiperSlide key={index} className="featured-job-swiper-slide">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <Link
                        className="inline-block w-max"
                        href={`/is-ilani/${routeFormatter(
                          `${job.openJobs[0].jobTitle}-${job.openJobs[0].postId}`
                        )}`}
                      >
                        <Image
                          src={job.companyInformations.companyLogo}
                          alt={job.companyInformations.companyName}
                          width={60}
                          height={60}
                          className="rounded-full mb-2.5"
                        />
                      </Link>

                      <Tooltip title="Öne Çıkan" placement="top" arrow>
                        <TfiCrown />
                      </Tooltip>
                    </div>

                    <div key={index} className="flex flex-col grow">
                      <h2 className="featured-job-title-tag w-max">
                        <Link
                          href={`/is-ilani/${routeFormatter(
                            `${job.openJobs[0].jobTitle}-${job.openJobs[0].postId}`
                          )}`}
                        >
                          {job.openJobs[0].jobTitle}
                        </Link>
                      </h2>

                      <p className="text-[15px] mt-2.5">
                        <Link
                          href={`firma-profil/${routeFormatter(
                            `${job.companyInformations.companyName}-${job.id}`
                          )}`}
                        >
                          <strong className="featured-job-title-tag">
                            {job.companyInformations.companyName}
                          </strong>
                        </Link>{" "}
                        <span className="text-[#696969]">tarafından</span>{" "}
                        <ItemFilterText
                          redirect="/is-ilanlari"
                          handleClick={() =>
                            applyItemFilter(
                              job.openJobs[0].category,
                              true,
                              false
                            )
                          }
                        >
                          <strong className="featured-job-title-tag">
                            {job.openJobs[0].category}
                          </strong>
                        </ItemFilterText>
                        <span className="text-[#696969]">ilanı</span>
                      </p>

                      <div className="grow"></div>

                      <ul className="flex flex-wrap gap-[3px] mt-2.5">
                        <li className="featured-job-list-item bg-[#1967D2] !text-white">
                          {job.openJobs[0].modeOfWork}
                        </li>
                        <li className="featured-job-list-item">
                          {job.openJobs[0].positionLevel}
                        </li>
                        <li className="featured-job-list-item">
                          {job.openJobs[0].workModel}
                        </li>
                      </ul>

                      <div className="grow"></div>

                      <p className="mt-[15px] w-max">
                        Son başvuru tarihi:{" "}
                        <time>
                          {new Date(
                            job.openJobs[0].applicationDeadlineDate
                          ).toLocaleDateString("tr")}
                        </time>
                      </p>
                    </div>
                  </div>
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
                    />
                  </SwiperSlide>
                ))}
              </>
            )}
          </Swiper>

          <div className="slider-button-container !flex !w-[115%] max-[992px]:!w-[103%] max-[992px]:!px-0 !left-[50%] -translate-x-[50%]">
            <button
              className="prevFeaturedJob slide-button !w-[45px] !h-[45px] !rounded-4xl"
              role="button"
              aria-label="Önceki"
            >
              <BsChevronLeft size={18} />
            </button>

            <button
              className="nextFeaturedJob slide-button !w-[45px] !h-[45px] !rounded-4xl"
              role="button"
              aria-label="Sonraki"
            >
              <BsChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FeaturedJobs;
