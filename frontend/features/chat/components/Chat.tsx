"use client";

import ChatBody from "./ChatBody";
import ChatFooter from "./Footer/ChatFooter";
import ChatHeader from "./ChatHeader";
import Copyright from "./Copyright";
import ChatIcon from "./ChatIcon";
import useChatActions from "../hooks/useChatActions";

const Chat = () => {
  const {
    status: { isOpenChat },
  } = useChatActions();

  return (
    <div
      className={`fixed bottom-4 right-4 max-md:right-2 z-1001 ${isOpenChat ? "w-[444.6px] max-md:w-full max-md:right-0! max-md:bottom-0! max-md:h-full rounded-[30px] border border-[#6670854f]" : ""}`}
    >
      {isOpenChat ? (
        <>
          <ChatHeader />
          <ChatBody />
          <ChatFooter />
          <Copyright />
        </>
      ) : (
        <ChatIcon />
      )}
    </div>
  );
};

export default Chat;
