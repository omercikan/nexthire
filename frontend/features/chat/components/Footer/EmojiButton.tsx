import CustomButton from "@/shared/components/ui/CustomButton";
import { ChatIcons } from "../../icons/ChatIcon";
import EmojiPicker from "emoji-picker-react";
import useChatActions from "../../hooks/useChatActions";

const EmojiButton = ({
  insertAtEmoji,
}: {
  insertAtEmoji: (emoji: string) => void;
}) => {
  const { smile: Smile } = ChatIcons;
  const {
    handleEmojiMenuStatus,
    status: { isOpenEmojiMenu },
  } = useChatActions();

  return (
    <div className="relative">
      <CustomButton
        className="p-0! bg-transparent! pt-1.5!"
        handleClick={handleEmojiMenuStatus}
      >
        <Smile color="667085" size={22} />
      </CustomButton>

      {isOpenEmojiMenu && (
        <EmojiPicker
          reactionsDefaultOpen={true}
          onEmojiClick={({ emoji }) => insertAtEmoji(emoji)}
          className="absolute! bottom-12.25 right-0"
        />
      )}
    </div>
  );
};

export default EmojiButton;
