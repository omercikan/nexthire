import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const VideoModal = ({
  openVideo,
  setOpenVideo,
}: {
  openVideo: boolean;
  setOpenVideo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={openVideo}
      nodeRef={videoWrapperRef}
      classNames="iframe-video"
      timeout={300}
      unmountOnExit
    >
      <div className="fixed left-0 top-0 z-[51] bg-black/75 w-full h-full grid place-content-center overflow-hidden">
        <div ref={videoWrapperRef} className="relative">
          <div
            className="ms-auto w-max text-white opacity-60 hover:opacity-100 text-3xl cursor-pointer relative bottom-2"
            onClick={() => setOpenVideo(false)}
          >
            ×
          </div>

          <iframe
            className="drop-shadow-2xl drop-shadow-black/50 max-[992px]:w-[95vw] max-[992px]:h-[60vw]"
            width="900"
            height="506"
            src="https://www.youtube-nocookie.com/embed/sxjgL64czRY?si=12-2SHMZjT0teTTT"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </CSSTransition>
  );
};

export default VideoModal;
