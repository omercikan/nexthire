import React from "react";
import { GoShare } from "react-icons/go";

const ShareMobile = ({ jobTitle }: { jobTitle: string }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: jobTitle,
        text: "Bu ilanı incele!",
        url: window.location.href,
      });
    }
  };

  return (
    <div className="flex items-center">
      <h2 className="text-[#202124] font-medium me-2.5">Bu ilanı paylaş</h2>

      <button onClick={handleShare} aria-label="İlanı paylaş">
        <GoShare strokeWidth={1} size={20} />
      </button>
    </div>
  );
};

export default ShareMobile;
