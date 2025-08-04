import { AppDispatch, RootState } from "@/lib/redux/store";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { resetApplicationData } from "@/lib/redux/features/applicationModal/modalData";

const ApplicationStatusModal = () => {
  const { companyName, status } = useSelector(
    (state: RootState) => state.applicationModalData.applicationStatus
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleAction = useCallback(
    (routerUrl?: string) => {
      dispatch(resetApplicationData());
      document.body.style.overflow = "visible";
      if (routerUrl) router.push(routerUrl);
    },
    [dispatch, router]
  );

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleAction();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleAction]);

  return (
    <div
      className="bg-black/30 w-full h-full fixed top-0 left-0 z-50"
      role="dialog"
      aria-modal={true}
      aria-labelledby="application-status-title"
      tabIndex={-1}
      onClick={() => handleAction()}
    >
      <div
        className="bg-white fixed max-sm:w-full max-sm:h-full top-[32px] max-sm:top-0 left-1/2 -translate-x-1/2 sm:rounded-lg max-sm:flex max-sm:flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b max-sm:border-none border-gray-200 py-4 px-6 max-sm:px-4">
          <h2
            className="text-xl font-medium max-sm:hidden"
            id="application-status-title"
          >
            {status === "applied"
              ? "Başvurunuz başarıyla gönderildi"
              : "Başvurunuz gönderilemedi"}
          </h2>

          <button aria-label="Modalı kapat" onClick={() => handleAction()}>
            <IoCloseOutline size={32} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-sm:h-full max-sm:content-center">
          <DotLottieReact
            src={
              status === "applied"
                ? "https://lottie.host/932106c6-de16-4bca-bb3c-0eed73743f8e/w6UEK7Sf84.lottie"
                : "https://lottie.host/9a7453d1-5aea-4793-bcff-9efe247b3250/8Y9L8A5nGi.lottie"
            }
            autoplay
            className="!w-[90px] !h-[90px] mx-auto mt-4 pointer-events-none"
            aria-hidden="true"
          />

          <div className="text-center px-12 max-[992px]:px-6 pt-3 max-sm:pt-0 pb-10 border-b max-sm:border-none border-gray-200">
            <h3 className="text-[22px] font-medium text-[#000000E6]">
              {status === "applied"
                ? `Başvurunuz ${companyName} şirketine gönderildi`
                : `Üzgünüz başvurunuz ${
                    companyName
                      ? `${companyName} şirketine gönderilemedi`
                      : "gönderilemedi"
                  }`}
            </h3>

            <p className="text-[#00000099] mt-4">
              {status === "applied" ? (
                <>
                  Başvurunuzu{" "}
                  <strong className="font-medium">
                    “Hesabım” &gt; “İşlerim”
                  </strong>{" "}
                  sekmesinden takip edebilirsiniz.
                </>
              ) : (
                <>
                  Başvurunuz gönderilemedi. Lütfen tekrar deneyin veya destek
                  ekibimiz ile iletişime geçin.
                </>
              )}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="my-2.5 max-sm:mb-10 me-6 max-sm:me-0 max-sm:w-full flex justify-end max-sm:justify-center">
          <button
            type="button"
            className="custom__button px-4 !py-2 font-medium max-sm:w-[90%]"
            onClick={() =>
              handleAction(
                status === "applied" ? "/hesabim/islerim" : "/yardim-merkezi"
              )
            }
          >
            {status === "applied" ? "İşlerime Git" : "Yardım Merkezi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusModal;
