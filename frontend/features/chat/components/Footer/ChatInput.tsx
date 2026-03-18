import { RefObject } from "react";
import useSendMessage from "./hooks/useSendMessage";
import useChatInput from "./hooks/useChatInput";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";

const ChatInput = ({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  const { handleSendMessage } = useSendMessage();
  const { onKeyDown } = useChatInput();
  const { isCvAnalyze } = useSelector(
    (state: RootState) => state.optionMenuSlice,
  );

  return (
    <input
      type="text"
      className="custom__input rounded-none! text-[16px]! text-[#667085] bg-white border-0! px-0! py-5.75! pe-5!"
      placeholder={
        isCvAnalyze ? "CV'niz için analiz isteğinizi belirtin..." : "Mesaj yaz"
      }
      onKeyDown={(e) => onKeyDown(e, handleSendMessage)}
      ref={inputRef}
    />
  );
};

export default ChatInput;
