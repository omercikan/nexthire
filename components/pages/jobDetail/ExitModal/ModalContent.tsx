import React from "react";

const ModalContent = () => {
  return (
    <div className="p-4 max-sm:pt-0">
      <p className="max-sm:text-center" id="application-exit-modal-description">
        Başvurudan çıkarsanız, yüklenen dosyalarınız saklanır;{" "}
        <br className="max-[800px]:hidden" /> ancak ek sorulara verdiğiniz
        yanıtlar ve iletişim bilgileri kaybolur.
      </p>
    </div>
  );
};

export default ModalContent;
