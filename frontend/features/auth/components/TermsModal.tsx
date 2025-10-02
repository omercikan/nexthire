import { termsData } from "@/shared/data/termsData";
import React, { useRef } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CSSTransition } from "react-transition-group";
import { TermsModalProps } from "../../../shared/types/signup-form.types";

const TermsModal = ({ termsModal, setTermsModal }: TermsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={termsModal}
      nodeRef={modalRef}
      classNames={"modal"}
      timeout={300}
      unmountOnExit
    >
      <div className="terms-modal__container">
        <div className="terms-modal__wrapper modal-scrollbar" ref={modalRef}>
          <h2 className="terms-modal__title">
            Kullanım Şartları
            <IoCloseOutline
              cursor="pointer"
              onClick={() => setTermsModal(false)}
            />
          </h2>

          <div className="space-y-4 text-sm text-[#425583] px-6 pb-6">
            <p>
              Bu kullanım şartları, NextHire platformunu kullanırken uymanız
              gereken kuralları belirtmektedir. Lütfen dikkatlice okuyun.
              Platformu kullanarak bu şartları kabul ettiğinizi onaylarsınız.
              Platform, işverenler ve iş arayanlar arasında iş fırsatları ve
              kariyer gelişim hizmetleri sağlamak amacıyla tasarlanmıştır.
            </p>

            <ul>
              {termsData.map((data, index) => (
                <li key={index}>
                  <h3 className="font-semibold text-black mb-3">
                    {data.title}
                  </h3>
                  <p className="mb-3">{data.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default TermsModal;
