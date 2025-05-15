"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import NavList from "./Header/NavList";
import UserItems from "./Header/UserItems";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { changeMenuState } from "@/lib/redux/features/users/userMenuSlice";
import { CSSTransition } from "react-transition-group";
import { usePathname } from "next/navigation";

const Header = () => {
  const [scroll, setScroll] = useState<boolean>(false);
  const [breakpoint, setBreakPoint] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { menu } = useSelector((state: RootState) => state.userMenu);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathanme = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setBreakPoint(window.innerWidth >= 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      setScroll(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`main-header transition duration-300 ${
        pathanme !== "/" ? "!fixed !top-0 w-full shadow-xs bg-white" : ""
      } ${
        scroll
          ? "!fixed !top-0 w-full shadow-xs bg-white"
          : "min-[1024px]:!fixed !top-0 w-full"
      }`}
    >
      <div className="main-header__wrapper">
        <div className="navbar-brand-menu">
          <HiMenuAlt3
            className="min-[992px]:hidden"
            size={26}
            cursor="pointer"
            onClick={() => {
              dispatch(changeMenuState());
              document.body.style.overflow = "hidden";
            }}
          />

          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png"
              alt="NextHire"
              width={153}
              height={53}
            />
          </Link>
        </div>

        {breakpoint && (
          <nav className="large-navlist">
            <NavList />
          </nav>
        )}

        <CSSTransition
          in={menu}
          timeout={300}
          unmountOnExit
          classNames="modal-menu"
          nodeRef={menuRef}
        >
          <nav className="small-navlist min-[992px]:hidden z-50">
            <div className="small-navlist__wrapper" ref={menuRef}>
              <NavList />
            </div>
          </nav>
        </CSSTransition>
      </div>

      <UserItems />
    </header>
  );
};

export default Header;
