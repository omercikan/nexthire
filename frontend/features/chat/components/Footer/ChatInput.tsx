import { RefObject } from "react";
import useSendMessage from "./hooks/useSendMessage";
import useChatInput from "./hooks/useChatInput";

const ChatInput = ({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  const { handleSendMessage } = useSendMessage();
  const { onKeyDown } = useChatInput();

  return (
    <input
      type="text"
      className="custom__input rounded-none! text-[16px]! text-[#667085] bg-white border-0! px-0! py-5.75! pe-5!"
      placeholder="Mesaj yaz"
      onKeyDown={(e) => onKeyDown(e, handleSendMessage)}
      ref={inputRef}
    />
  );
};

export default ChatInput;
