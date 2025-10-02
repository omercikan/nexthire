"use client";

import React, { useContext } from "react";
import FooterWidget from "./Footer/FooterWidget";
import FooterMenu from "./Footer/FooterMenu";
import FooterStore from "./Footer/FooterStore/FooterStore";
import FooterCopyright from "./Footer/FooterCopyright/FooterCopyright";
import { AuthContext } from "@/features/auth/authContext";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="bg-[#202124]">
      <footer className="pt-[85px] max-lg:pt-[30px]">
        <div className="container pb-[85px] max-lg:pb-[30px]">
          <div className="flex flex-wrap max-md:flex-col justify-between">
            <FooterWidget />

            {(user?.role === "candidate" || !user) && (
              <FooterMenu
                menuTitle="Adaylar İçin"
                items={[
                  {
                    item: "İşlere Göz Atın",
                    link: "/is-ilanlari",
                  },
                  {
                    item: "Aday Panosu",
                    link: "/aday-panosu",
                  },
                  {
                    item: "İş Uyarıları",
                    link: !user ? "/aday-giris" : "/hesabim/is-uyarilari",
                  },
                ]}
              />
            )}

            {(user?.role === "employer" || !user) && (
              <FooterMenu
                menuTitle="İşverenler İçin"
                items={[
                  {
                    item: "Adaylara Göz Atın",
                    link: "/adaylar",
                  },
                  {
                    item: "İşveren Panosu",
                    link: "/isveren-panosu",
                  },
                  {
                    item: "İş Paylaş",
                    link: !user ? "/isveren-giris" : "/hesabim/is-paylas",
                  },
                ]}
              />
            )}

            <FooterMenu
              menuTitle="Hakkımızda"
              items={[
                {
                  item: "Bize Ulaşın",
                  link: "/iletisim",
                },
                {
                  item: "Hakkımızda",
                  link: "/hakkimizda",
                },
                {
                  item: "Şartlar",
                  link: "/sartlar",
                },
                {
                  item: "SSS",
                  link: "/yardim",
                },
              ]}
            />

            <FooterStore />
          </div>
        </div>

        <div className="border-t border-[#37383A]"></div>

        <FooterCopyright />
      </footer>
    </section>
  );
};

export default Footer;
