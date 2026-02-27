import { ChatIcons } from "../icons/ChatIcon";

const ChatBody = () => {
  const { chat: Chat } = ChatIcons;

  return (
    <div className="bg-[#F6F6F7] px-6 py-7.5 h-100 modal-scrollbar">
      {/* Chat Body Headline */}
      <div className="flex items-center gap-1.75">
        <div className="border border-[#E3E3E3] rounded-full w-max p-[7.91px]">
          <Chat color="003DF5" size={12} />
        </div>

        <div className="flex gap-1 text-xs text-[#667085]">
          <span>Canlı Sohbet</span>
          <span>02:10 PM</span>
        </div>
      </div>

      {/* Chat Body Content */}
      <div className="bg-white border border-[#E3E3E3] rounded-[10px] w-max py-3.75 px-8.5 mt-2 ms-8">
        <p>Hello Nice</p>
      </div>

      <div className="bg-white border border-[#E3E3E3] rounded-[10px] w-max py-3.75 px-8.5 mt-2 ms-8">
        <p className="w-73.75">
          Welcome to LiveChat I was made with Pick a topic from the list or type
          down a question! Welcome to LiveChat I was made with Pick a topic from
          the list or type down a question!
        </p>
      </div>

      <div className="bg-white border border-[#E3E3E3] rounded-[10px] w-max py-3.75 px-8.5 mt-2 ms-8">
        <p className="w-73.75">
          Welcome to LiveChat I was made with Pick a topic from the list or type
          down a question!
        </p>
      </div>

      <div className="ms-8 flex flex-col items-end mt-6.5">
        <div className="text-xs text-[#667085]">
          <span>Visitor 02:12 PM</span>
        </div>

        <div className="bg-[#003DF5] text-white border border-[#E3E3E3] rounded-[10px] w-max py-3.75 px-8.5 mt-2">
          <p className="w-auto">Welcome</p>
        </div>
      </div>

      <div className="flex items-center gap-1.75">
        <div className="border border-[#E3E3E3] rounded-full w-max p-[7.91px]">
          <Chat color="003DF5" size={12} />
        </div>

        <div className="flex gap-1 text-xs text-[#667085]">
          <span>Canlı Sohbet</span>
          <span>02:10 PM</span>
        </div>
      </div>

      <div className="bg-white border border-[#E3E3E3] rounded-[10px] w-max py-3.75 px-8.5 mt-2 ms-8">
        <p className="w-auto">Welcome to LiveChat</p>
      </div>
    </div>
  );
};

export default ChatBody;
