import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { changeMenuState } from "@/lib/redux/features/users/userMenuSlice";
import { AuthContext } from "@/context/authContext";

const NavList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);

  return (
    <ul className="max-[992px]:h-full">
      <li>
        <div className="flex items-end justify-between bg-white p-5 min-[992px]:hidden">
          <Image
            src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png"
            alt="NextHire"
            width={120}
            height={53}
          />
          <IoCloseOutline
            size={26}
            cursor="pointer"
            onClick={() => {
              dispatch(changeMenuState());
              document.body.style.overflow = "visible";
            }}
          />
        </div>
      </li>

      <li className="max-[992px]:h-[calc(100%-73.75px)]">
        <div className="max-[992px]:!p-5 pb-1 max-[992px]:bg-[#202124] max-[992px]:h-full">
          <ul className="flex gap-3 max-[992px]:flex-col font-medium">
            <li className="max-[992px]:py-3">
              <Link
                href={`${
                  user?.role === "candidate" ? "/is-ilanlari" : "/adaylar"
                }`}
                className="text-[#979797] min-[992px]:text-black hover:text-[#4045ef]"
              >
                {user?.role === "candidate" ? "İş Ara" : "Aday Bul"}
              </Link>
            </li>

            <li className="max-[992px]:py-3">
              <Link
                href="/next-blog"
                className="text-[#979797] min-[992px]:text-black hover:text-[#4045ef]"
              >
                Next Blog
              </Link>
            </li>

            <li className="max-[992px]:py-3">
              <Link
                href="/cv-bankasi"
                className="text-[#979797] min-[992px]:text-black hover:text-[#4045ef]"
              >
                CV Bankası
              </Link>
            </li>

            {user?.role !== "candidate" && (
              <li className="mt-[56px] py-3 min-[992px]:hidden">
                <Link href="/isveren-kayit" className="text-[#979797]">
                  <button className="bg-[#1967D2] hover:bg-[#1451a4] transition duration-300 text-white w-full py-4 text-[15px] rounded-lg">
                    İş İlanı Ver
                  </button>
                </Link>
              </li>
            )}
          </ul>

          <div className="min-[992px]:hidden">
            <h4
              className={`text-[#979797] text-lg font-medium mb-2.5 ${
                user?.role === "candidate" ? "pt-3" : ""
              }`}
            >
              Bizi arayın
            </h4>
            <span className="text-white text-lg font-medium mb-[15px] block">
              123 456 7890
            </span>

            <address className="text-[#979797] text-sm not-italic">
              Maslak Mahallesi, Maslak 1453 Sitesi, A Blok, Kat:10, 34398
              Sarıyer/İstanbul
            </address>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default NavList;
