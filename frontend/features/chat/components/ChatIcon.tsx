import ChatIconImage from "@/public/assets/chat.png";
import CustomButton from "@/shared/components/ui/CustomButton";
import Image from "next/image";
import useChatActions from "../hooks/useChatActions";

const ChatIcon = () => {
  const {
    handleChatStatus,
    status: { isMinimize, isOpenChat },
  } = useChatActions();

  return (
    <>
      <CustomButton
        className="p-0! bg-transparent!"
        handleClick={() => handleChatStatus("close")}
      >
        {!isOpenChat && !isMinimize ? (
          <Image
            src={ChatIconImage}
            alt="Sohbet İkonu"
            width={50}
            height={50}
          />
        ) : (
          <div className="bg-white border border-[#E3E3E3] shadow-lg drop-shadow-2xl py-2 px-8 rounded-full flex items-center gap-x-3 text-[#667085]">
            <span className="text-xl">🤖</span>
            <span>NextHire Sohbet</span>
            {/* <span>1</span> */}
          </div>
        )}
      </CustomButton>
    </>
  );
};

export default ChatIcon;
