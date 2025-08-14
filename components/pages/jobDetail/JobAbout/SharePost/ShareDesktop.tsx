import React, { useEffect, useState } from "react";
import DesktopShareLinks from "./DesktopShareLinks";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const ShareDesktop = ({ jobTitle }: { jobTitle: string }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const jobUrl = isClient ? encodeURIComponent(window.location.href) : "";
  const jobText = encodeURIComponent(
    `NextHire'da bulduğum ilanı incele: ${jobTitle}`
  );

  return (
    <div className="flex items-center">
      <h2 className="text-[#202124] font-medium me-2.5">Bu ilanı paylaş</h2>

      <DesktopShareLinks
        links={[
          {
            icon: <FaLinkedinIn />,
            platform: "LinkedIn",
            url: `https://www.linkedin.com/feed/?shareActive=true&text=${jobText}%20${jobUrl}`,
            className: "bg-[#0A66C2]",
            tooltipTitle: "LinkedIn'de paylaş",
          },

          {
            icon: <FaFacebookF />,
            platform: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${jobUrl}`,
            className: "bg-[#1967d2]",
            tooltipTitle: "Facebook'ta paylaş",
          },

          {
            icon: <FaXTwitter />,
            platform: "X (Twitter)",
            url: `https://twitter.com/intent/tweet?text=${jobText}&url=${jobUrl}`,
            className: "bg-black",
            tooltipTitle: "X'te paylaş",
          },
        ]}
      />
    </div>
  );
};

export default ShareDesktop;
