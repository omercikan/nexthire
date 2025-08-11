import CustomButton from "@/components/ui/CustomButton";
import { resetApplicationData } from "@/lib/redux/features/applicationModal/modalData";
import { resetProgressBarValue } from "@/lib/redux/features/applicationModal/progressBar";
import {
  changeShowMoreResumes,
  setApplicationModal,
  setExitModalState,
} from "@/lib/redux/features/touch";
import { AppDispatch } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";

const ExitModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSmallBreakpoint, setIsSmallBreakpoint] = useState<boolean>(false);

  const handleCloseExitModal = () => dispatch(setExitModalState(false));

  const handleExitApplication = () => {
    dispatch(setExitModalState(false));
    dispatch(setApplicationModal(false));
    dispatch(resetApplicationData());
    dispatch(resetProgressBarValue());
    dispatch(changeShowMoreResumes());
  };

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
    >
      <div
        className="bg-white fixed left-1/2 sm:top-[178.32px] max-sm:top-1/2 max-sm:-translate-y-1/2 -translate-x-1/2 rounded-lg max-sm:w-[90%] max-[800px]:w-[70%]"
        role="dialog"
        aria-modal={true}
        aria-labelledby="application-exit-modal-title"
        aria-describedby="application-exit-modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between max-sm:justify-center p-4 max-sm:px-3 sm:border-b sm:border-gray-200">
          <h2
            className="text-lg text-[#000000E6] font-medium max-[375px]:text-[16px] max-[320px]:text-center"
            id="application-exit-modal-title"
          >
            Başvurudan çıkmak istiyor musunuz?
          </h2>

          {!isSmallBreakpoint && (
            <button onClick={handleCloseExitModal}>
              <IoCloseOutline size={32} />
            </button>
          )}
        </div>

        <div className="p-4 max-sm:pt-0">
          <p
            className="max-sm:text-center"
            id="application-exit-modal-description"
          >
            Başvurudan çıkarsanız, yüklenen dosyalarınız saklanır;{" "}
            <br className="max-[800px]:hidden" /> ancak ek sorulara verdiğiniz
            yanıtlar ve iletişim bilgileri kaybolur.
          </p>
        </div>

        <div className="text-end border-t max-sm:flex max-sm:justify-between border-gray-200 py-3 max-sm:py-0 sm:px-4">
          <CustomButton
            text="Başvurudan Çık"
            className="sm:!py-1.5 px-4 max-sm!:py-4 flex-1/2 whitespace-nowrap max-sm:!bg-transparent max-sm:!text-[#000000E6] max-sm:font-medium max-sm:text-lg max-sm:!rounded-none"
            handleClick={handleExitApplication}
          />

          {isSmallBreakpoint && (
            <span className="border border-gray-200"></span>
          )}

          {isSmallBreakpoint && (
            <CustomButton
              text="Devam Et"
              className="sm:!py-1.5 px-4 !rounded-none max-sm!:py-4 max-sm:!bg-transparent flex-1/2 whitespace-nowrap max-sm:!text-[#000000E6] max-sm:font-medium max-sm:text-lg"
              handleClick={() => dispatch(setExitModalState(false))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExitModal;
