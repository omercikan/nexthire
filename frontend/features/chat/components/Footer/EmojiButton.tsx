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
          searchPlaceHolder="Emoji Ara"
          onEmojiClick={({ emoji }) => insertAtEmoji(emoji)}
          className="absolute! max-sm:fixed! bottom-12.25 max-sm:bottom-30 max-[350px]:bottom-[108.9px] right-0 max-sm:right-2 max-[350px]:right-0! max-[350px]:w-full!"
        />
      )}
    </div>
  );
};

export default EmojiButton;
