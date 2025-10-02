import Image from "next/image";
import React from "react";
import { FaPlay } from "react-icons/fa6";
import "./play-animation.scss";

const VideoThumbnail = ({
  setOpenVideo,
}: {
  setOpenVideo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex-[1] relative">
      <div className="play-wrapper" onClick={() => setOpenVideo(true)}>
        <FaPlay className="transition-colors duration-200 text-[40px] max-[1024px]:!text-[20px]" />
      </div>
      <Image
        src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1746457159/65d90b36_msuhlm.jpg"
        alt="İnsan Kaynakları"
        width={370}
        height={390}
        draggable={false}
        className="h-[390px] max-lg:h-auto max-md:!w-[370px] max-md:h-[390px] max-[430px]:!h-[300px] !w-full object-cover object-top rounded-md"
      />
    </div>
  );
};

export default VideoThumbnail;
