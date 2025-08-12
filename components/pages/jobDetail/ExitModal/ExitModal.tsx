import { setExitModalState } from "@/lib/redux/features/touch";
import { AppDispatch } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModalHeader from "./ModalHeader";
import ModalContent from "./ModalContent";
import ModalFooterActions from "./ModalFooterActions";

const ExitModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSmallBreakpoint, setIsSmallBreakpoint] = useState<boolean>(false);

  const handleCloseExitModal = () => dispatch(setExitModalState(false));

  useEffect(() => {
    const onSmall = () => {
      if (window.innerWidth < 640) {
        setIsSmallBreakpoint(true);
      } else {
        setIsSmallBreakpoint(false);
      }
    };

    onSmall();
    window.addEventListener("resize", onSmall);

    return () => {
      window.removeEventListener("resize", onSmall);
      onSmall();
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") dispatch(setExitModalState(false));
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [dispatch]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/55 z-50"
      onClick={handleCloseExitModal}
      data-testid="exitModalContainer"
    >
      <div
        className="bg-white fixed left-1/2 sm:top-[178.32px] max-sm:top-1/2 max-sm:-translate-y-1/2 -translate-x-1/2 rounded-lg max-sm:w-[90%] max-[800px]:w-[70%]"
        role="dialog"
        aria-modal={true}
        aria-labelledby="application-exit-modal-title"
        aria-describedby="application-exit-modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader
          isSmallBreakpoint={isSmallBreakpoint}
          closeModalFunc={handleCloseExitModal}
        />

        <ModalContent />

        <ModalFooterActions
          isSmallBreakpoint={isSmallBreakpoint}
          closeModalFunc={handleCloseExitModal}
        />
      </div>
    </div>
  );
};

export default ExitModal;
