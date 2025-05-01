"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { fetchData } from "@/lib/fetchData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, A11y } from "swiper/modules";
import "swiper/scss";
import Image from "next/image";
import { Employer } from "@/types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { routeFormatter } from "@/lib/routeFormat";
import Skeleton from "@mui/material/Skeleton";
import { TfiCrown } from "react-icons/tfi";
import Tooltip from "@mui/material/Tooltip";
import SectionHeader from "@/components/SectionHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { setEmployers } from "@/lib/features/role/employerSlice";

const FeaturedJobs = () => {
  const { employers } = useSelector((state: RootState) => state.employers);
  const dispatch = useDispatch<AppDispatch>();
  const placeholderLoader = Array.from({ length: 3 }, (_, i) => i);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      const { data }: { data: { employers: Employer[]; status: number } } =
        await fetchData("/api/firebase/employers/featured");
      if (data.employers) dispatch(setEmployers(data.employers));
    };

    fetchFeaturedJobs();
  }, [dispatch]);

  return (
    <div className="container">
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
            autoplay={{
              delay: 3000,
            }}
            loop={true}
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
            {employers.length ? (
              employers.concat(employers).map((job, index) => (
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

                    {job.openJobs.map((detail, index) => (
                      <div key={index} className="flex flex-col grow">
                        <h2 className="featured-job-title-tag w-max">
                          <Link
                            href={`/is-ilani/${routeFormatter(
                              `${detail.jobTitle}-${detail.postId}`
                            )}`}
                          >
                            {detail.jobTitle}
                          </Link>
                        </h2>

                        <p className="text-[15px] mt-2.5">
                          <Link
                            href={`firma-profil/${routeFormatter(
                              `${job.companyInformations.companyName}-${job.eid}`
                            )}`}
                          >
                            <strong className="featured-job-title-tag">
                              {job.companyInformations.companyName}
                            </strong>
                          </Link>{" "}
                          <span className="text-[#696969]">tarafından</span>{" "}
                          <Link
                            href={`/is-ilanlari/${new URLSearchParams({
                              meslek: routeFormatter(detail.category),
                            })}`}
                          >
                            <strong className="featured-job-title-tag">
                              {detail.category}
                            </strong>
                          </Link>{" "}
                          <span className="text-[#696969]">ilanı</span>
                        </p>

                        <div className="grow"></div>

                        <ul className="flex flex-wrap gap-[3px] mt-2.5">
                          <li className="featured-job-list-item bg-[#1967D2] !text-white">
                            {detail.modeOfWork}
                          </li>
                          <li className="featured-job-list-item">
                            {detail.positionLevel}
                          </li>
                          <li className="featured-job-list-item">
                            {detail.workModel}
                          </li>
                        </ul>

                        <div className="grow"></div>

                        <p className="mt-[15px] w-max">
                          Son başvuru tarihi:{" "}
                          <time>
                            {new Date(
                              detail.applicationDeadlineDate
                            ).toLocaleDateString("tr")}
                          </time>
                        </p>
                      </div>
                    ))}
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
    </div>
  );
};

export default FeaturedJobs;
