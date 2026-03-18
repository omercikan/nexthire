import useChatInput from "./hooks/useChatInput";
import ChatInput from "./ChatInput";
import EmojiButton from "./EmojiButton";
import FileButton from "../FileUpload/FileButton";
import SendButton from "./SendButton";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import FileContainer from "../FileUpload/FileContainer";
import FileUploadContextProvider from "../FileUpload/fileUploadContext";

const ChatFooter = () => {
  const { chatInputRef, insertAtEmoji } = useChatInput();
  const { isCvAnalyze } = useSelector(
    (state: RootState) => state.optionMenuSlice,
  );

  return (
    <FileUploadContextProvider>
      <div className="relative">
        {isCvAnalyze && <FileContainer />}

        <div
          className={`flex items-center bg-white ${isCvAnalyze ? "border-b" : "border-y"} border-[#E3E3E3] px-8`}
        >
          <ChatInput inputRef={chatInputRef} />

          <div className="flex items-center justify-between gap-6">
            <EmojiButton insertAtEmoji={insertAtEmoji} />
            <FileButton />
            <SendButton inputRef={chatInputRef} />
          </div>
        </div>
      </div>
    </FileUploadContextProvider>
  );
};

export default ChatFooter;
