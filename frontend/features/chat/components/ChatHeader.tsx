import CustomButton from "@/shared/components/ui/CustomButton";
import { ChatIcons } from "../icons/ChatIcon";
import useChatActions from "../hooks/useChatActions";
import OptionsMenu from "./OptionsMenu";

const ChatHeader = () => {
  const {
    options: Options,
    mninimize: Minimize,
    close: Close,
    chat: Chat,
  } = ChatIcons;

  const {
    handleChatStatus,
    handleOptionsMenuStatus,
    status: { isOpenOptionsMenu },
  } = useChatActions();

  return (
    <header className="border-b border-[#E3E3E3] bg-white p-8 pb-6.25 rounded-t-[30px]">
      <div className="flex items-center justify-between relative">
        <CustomButton
          className="p-0! bg-transparent!"
          handleClick={handleOptionsMenuStatus}
        >
          <Options color="667085" strokeWidth={2.5} />
        </CustomButton>

        {isOpenOptionsMenu && <OptionsMenu />}

        <h2 className="mx-8 text-xl text-[#667085]">NextHire AI Chat</h2>

        <div className="flex items-center gap-3">
          <CustomButton
            className="p-0! bg-transparent!"
            handleClick={() => handleChatStatus("minimize")}
          >
            <Minimize color="667085" strokeWidth={2.5} />
          </CustomButton>

          <CustomButton
            className="p-0! bg-transparent!"
            handleClick={() => handleChatStatus("close")}
          >
            <Close color="667085" strokeWidth={2.5} />
          </CustomButton>
        </div>
      </div>

      <div className="border-t border-t-[#667085] opacity-15 my-4.5" />

      <div className="flex items-center gap-x-[33.29px]">
        <div className="border border-[#E3E3E3] rounded-full w-max p-2.75 relative">
          <Chat color="003DF5" />

          <span className="bg-[#268750] w-2.5 h-2.5 rounded-full inline-block absolute right-0 animate-pulse" />
        </div>

        <div>
          <p className="text-[#454B58] text-xl">AI Asistan</p>
          <span className="text-[#667085] text-lg">NextHire AI Asistanı</span>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
