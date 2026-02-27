import { RefObject } from "react";

const ChatInput = ({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  return (
    <input
      type="text"
      className="custom__input rounded-none! text-[16px]! text-[#667085] bg-white border-0! px-0! py-5.75! pe-5!"
      placeholder="Mesaj yaz"
      ref={inputRef}
    />
  );
};

export default ChatInput;
