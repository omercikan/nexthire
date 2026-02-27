import { ChatIcons } from "../../icons/ChatIcon";
import CustomButton from "@/shared/components/ui/CustomButton";
import useChatInput from "./useChatInput";
import ChatInput from "./ChatInput";
import EmojiButton from "./EmojiButton";
import FileButton from "./FileButton";

const ChatFooter = () => {
  const { send: Send } = ChatIcons;
  const { chatInputRef, insertAtEmoji } = useChatInput();

  return (
    <div className="relative">
      <div className="flex items-center border-y bg-white border-y-[#E3E3E3] px-8">
        <ChatInput inputRef={chatInputRef} />

        <div className="flex items-center justify-between gap-6">
          <EmojiButton insertAtEmoji={insertAtEmoji} />

          <FileButton />

          <CustomButton className="p-0! bg-transparent!">
            <Send color="003DF5" size={25} />
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
