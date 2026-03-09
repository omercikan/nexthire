import { Roboto } from "next/font/google";
import React, { useContext, useEffect, useState } from "react";
import { HiMiniChevronDown } from "react-icons/hi2";
import UserModal from "./UserModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/redux/store";
import { changeModalState } from "@/shared/redux/slices/user-modal/userModalSlice";
import { LiaUser } from "react-icons/lia";
import { MdArrowDropDown } from "react-icons/md";
import Link from "next/link";
import { AuthContext } from "@/features/auth/authContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { handleLogout } from "@/shared/utils/logout";

const roboto = Roboto({
  display: "swap",
  weight: ["400", "500"],
  subsets: ["latin-ext"],
});

const UserItems = () => {
  const [breakpoint, setBreakPoint] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (window.innerWidth >= 992) {
      setBreakPoint(true);
    } else {
      setBreakPoint(false);
    }
  }, []);

  return (
    <ul className={`text-[15px] ${roboto.className}`}>
      <li className="flex items-center">
        {user && (
          <ol className="flex items-center gap-1">
            <li className="relative">
              <Link href="/hesabim/gelen-kutusu">
                <span className="bg-[#4045ef] text-white w-2 h-2 p-2 grid place-content-center rounded-full absolute right-0 -top-1 text-xs">
                  0
                </span>
                <IoNotificationsOutline size={24} cursor="pointer" />
              </Link>
            </li>
            <li className="font-medium text-[#333333] text-[16px] flex items-center cursor-pointer group">
              <LiaUser
                size={28}
                cursor="pointer"
                className="me-1"
                onClick={() =>
                  window.innerWidth < 992 && dispatch(changeModalState())
                }
              />
              <span className="max-[992px]:hidden">
                {(user?.fullname).split(" ")[0]}
              </span>
              <MdArrowDropDown
                size={22}
                className="group-hover:rotate-180 transition max-[992px]:hidden"
              />

              <ul className="session-user-modal">
                <li className="pb-6 px-6 border-b border-[#e4e4e4]">
                  <h1 className="text-[#212529]">{user?.fullname}</h1>
                  <Link
                    href="/hesabim"
                    className="text-[#4045ef] hover:underline text-sm"
                  >
                    Hesabıma Git
                  </Link>
                </li>

                <li className="flex flex-col gap-4 p-6">
                  <Link href="/ayarlar" className="header-user-modal-links">
                    Ayarlar
                  </Link>
                  <Link href="/yardim" className="header-user-modal-links">
                    Yardım
                  </Link>
                  <span
                    className="header-user-modal-links"
                    onClick={() => handleLogout(user._id)}
                  >
                    Çıkış Yap
                  </span>
                </li>
              </ul>
            </li>
          </ol>
        )}

        <ol>
          <li className="group flex items-center gap-4">
            {!user && (
              <button
                className="header-login-btn group"
                onClick={() => {
                  if (window.innerWidth < 992) dispatch(changeModalState());
                  if (window.innerWidth >= 576)
                    document.body.style.overflow = "hidden";
                }}
              >
                Giriş Yap / Üye Ol
                <HiMiniChevronDown
                  size={20}
                  className="group-hover:rotate-180 transition max-[992px]:hidden"
                />
              </button>
            )}

            {breakpoint && (
              <div className="absolute right-[45px] top-full max-[992px]:hidden invisible group-hover:invisible">
                <UserModal />
              </div>
            )}
          </li>
        </ol>
      </li>
    </ul>
  );
};

export default UserItems;
