import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import CopyrightSocial from "./CopyrightSocial";
import CopyrightText from "./CopyrightText";

const FooterCopyright = () => {
  return (
    <div className="container footer-copyright-wrapper">
      <CopyrightText />

      <div>
        <CopyrightSocial
          socials={[
            {
              link: "https://www.facebook.com",
              icon: <FaFacebookF />,
              title: "Facebook",
            },
            { link: "https://x.com", icon: <FaXTwitter />, title: "X" },
            {
              link: "https://www.instagram.com",
              icon: <FaInstagram />,
              title: "Instagram",
            },
            {
              link: "https://www.linkedin.com/in/omercikan",
              icon: <FaLinkedinIn />,
              title: "LinkedIn",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default FooterCopyright;
