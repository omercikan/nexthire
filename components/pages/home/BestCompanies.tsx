"use client";

import SectionHeader from "@/components/SectionHeader";
import { fetchData } from "@/lib/fetchData";
import { Candidate, Employer } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { SlLocationPin } from "react-icons/sl";
import { routeFormatter } from "@/lib/routeFormat";
import { LiaUserSolid } from "react-icons/lia";
import { GoArrowUpRight } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import { GoBookmarkFill } from "react-icons/go";
import { AuthContext } from "@/context/authContext";
import toast, { Toaster } from "react-hot-toast";
import { db } from "@/app/api/firebase/firebaseConfig";
import { arrayUnion, doc, DocumentData, onSnapshot } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const BestCompanies = () => {
  const [bestCompanies, setBestCompanies] = useState<Employer[]>([]);
  const { user } = useContext(AuthContext);
  const candidateUser = user as Candidate;
  const [updatedData, setUpdatedData] = useState<Candidate>();
  const [isAdding, setIsAdding] = useState({
    inital: false,
    id: "",
  });

  useEffect(() => {
    if (candidateUser) {
      const unsub = onSnapshot(doc(db, "users", candidateUser?.id), (doc) => {
        setUpdatedData(doc.data() as Candidate);
      });

      return () => unsub();
    }
  }, [candidateUser]);

  useEffect(() => {
    const fetchBestCompanies = async () => {
      const { data }: { data: { employers: Employer[] } } = await fetchData(
        "/api/firebase/employers/bestCompany"
      );
      if (data.employers) setBestCompanies(data.employers);
    };

    fetchBestCompanies();
  }, []);

  const addFavoriteCompany = useCallback(
    async (data: DocumentData, eid: string) => {
      if (user?.role === "candidate") {
        setIsAdding({
          inital: true,
          id: eid,
        });
        await axios.post(
          "/api/firebase/favorites",
          JSON.stringify({
            data: data,
            id: eid,
            user: candidateUser,
            updatedData: updatedData,
            setFavoritePath: "candidates",
          })
        );

        setTimeout(() => {
          setIsAdding({
            inital: false,
            id: "",
          });
        }, 500);
      } else {
        toast.error(
          <div>
            <p>Favorilere eklemek için giriş yapmalısınız.</p>
            <Link
              href="/aday-giris"
              className="block text-[#4045ef] hover:underline w-max"
            >
              Giriş Yap
            </Link>
          </div>, {
            id: "favorite-toast"
          }
        );
      }
    },

    [candidateUser, updatedData, user?.role]
  );

  return (
    <section className="py-[100px] max-lg:py-[35px] bg-[#f5f2ea]">
      <Toaster position="top-right" />

      <div className="container">
        <SectionHeader
          title="Lider Şirketler Yeni Yetenekler Arıyor"
          subtitle="Kariyerine yön vermek için şimdi harekete geç &minus; seni bekleyen fırsatları keşfet!"
          link="/isverenler"
          linkText="Tüm Şirketlere Göz Atın"
        />

        <Swiper
          spaceBetween={30}
          className="!mx-0 !mt-[30px]"
          modules={[A11y, Pagination, Autoplay]}
          a11y={{
            firstSlideMessage: "İlk Slider",
            lastSlideMessage: "Son Slider",
            nextSlideMessage: "Sonraki Slide",
            prevSlideMessage: "Önceki Slide",
          }}
          autoplay={{
            delay: 3000,
          }}
          pagination={{
            clickable: true,
            renderBullet(_index, className) {
              return `<span class="${className}"></span>`;
            },
          }}
          breakpoints={{
            540: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1285: {
              slidesPerView: 4,
            },
          }}
        >
          {bestCompanies.map((company, index) => (
            <SwiperSlide
              key={index}
              className="featured-job-swiper-slide bg-white max-lg:!p-[15px] !p-[30px] !flex !flex-col text-center group"
            >
              {user?.role === "candidate" || typeof user === "undefined" ? (
                <div
                  className="absolute right-2 top-2 invisible group-hover:visible hover:bg-[#ECEDF2] rounded-full w-[30px] h-[30px] transition-colors duration-300 grid place-content-center cursor-pointer"
                  onClick={() =>
                    addFavoriteCompany(
                      {
                        favoriteEmployers: arrayUnion({
                          companyEID: company.eid,
                          companyLogo: company.companyInformations.companyLogo,
                          companyName: company.companyInformations.companyName,
                          companyLocation:
                            company.companyInformations.location.city,
                          numberOfEmployees:
                            company.companyInformations.numberOfEmployees,
                        }),
                      },
                      company?.eid
                    )
                  }
                >
                  {isAdding.id === company.eid && isAdding.inital ? (
                    <CircularProgress size={18} className="!text-[#696969]" />
                  ) : updatedData?.favoriteEmployers?.some((favorite) =>
                      favorite.companyEID.includes(company?.eid)
                    ) ? (
                    <GoBookmarkFill
                      color="696969"
                      size={18}
                      className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500"
                    />
                  ) : (
                    <GoBookmark
                      color="696969"
                      size={18}
                      className="opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500"
                    />
                  )}
                </div>
              ) : null}

              <Link
                className="w-max mx-auto"
                href={`/firma-profil/${routeFormatter(
                  company.companyInformations.companyName
                )}-${company.eid}`}
              >
                <Image
                  src={company.companyInformations.companyLogo}
                  alt={company.companyInformations.companyName}
                  width={70}
                  height={70}
                  className="rounded-full mb-[15px]"
                />
              </Link>
              <h2 className="mb-2.5 text-lg font-medium">
                <Link
                  href={`/firma-profil/${routeFormatter(
                    company.companyInformations.companyName
                  )}-${company.eid}`}
                >
                  {company.companyInformations.companyName}
                </Link>
              </h2>

              <div>
                <ul className="flex flex-wrap items-center justify-center gap-2.5 text-[#202124]">
                  <li className="flex items-center gap-[5px]">
                    <SlLocationPin size={18} />
                    <Link
                      href={`/is-ilanlari/?${new URLSearchParams({
                        konum: routeFormatter(
                          company.companyInformations.location.city
                        ),
                      })}`}
                    >
                      {company.companyInformations.location.city}
                    </Link>
                  </li>

                  <li className="flex items-center gap-[5px]">
                    <LiaUserSolid size={22} />
                    {company.companyInformations.numberOfEmployees}
                  </li>
                </ul>
              </div>

              <div>
                <p className="mt-2.5">
                  <strong className="font-medium">
                    {company.companyInformations.companyName}
                  </strong>{" "}
                  şirketi{" "}
                  <strong className="font-medium">
                    {company.companyInformations.serviceArea}
                  </strong>{" "}
                  alanında hizmet vermektedir.
                </p>
              </div>

              <div className="grow"></div>

              <div className="mt-[15px]">
                <Link
                  className="slide-button !w-full !h-full !py-[11px] !flex !items-center !justify-center !gap-[5px]"
                  href={`/firma-profil/${routeFormatter(
                    company.companyInformations.companyName
                  )}-${company.eid}`}
                >
                  {`Açık iş -
                  ${company.openJobs ? company.openJobs.length : 0}
                  `}
                  <GoArrowUpRight />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestCompanies;
