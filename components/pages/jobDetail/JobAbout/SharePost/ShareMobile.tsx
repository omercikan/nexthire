import { RootState } from "@/lib/redux/store";
import React from "react";
import { GoShare } from "react-icons/go";
import { useSelector } from "react-redux";

const ShareMobile = () => {
  const jobTitle = useSelector(
    (state: RootState) => state.jobDetail.jobDetail.jobTitle
  );

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

      <button onClick={handleShare}>
        <GoShare strokeWidth={1} size={20} />
      </button>
    </div>
  );
};

export default ShareMobile;
