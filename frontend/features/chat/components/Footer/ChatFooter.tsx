import useChatInput from "./hooks/useChatInput";
import ChatInput from "./ChatInput";
import EmojiButton from "./EmojiButton";
import FileButton from "./FileButton";
import SendButton from "./SendButton";

const ChatFooter = () => {
  const { chatInputRef, insertAtEmoji } = useChatInput();

  return (
    <div className="relative">
      <div className="flex items-center border-y bg-white border-y-[#E3E3E3] px-8">
        <ChatInput inputRef={chatInputRef} />

        <div className="flex items-center justify-between gap-6">
          <EmojiButton insertAtEmoji={insertAtEmoji} />

          <FileButton />

          <SendButton inputRef={chatInputRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
