"use client";

import ChatBody from "./ChatBody";
import ChatFooter from "./Footer/ChatFooter";
import ChatHeader from "./ChatHeader";
import Copyright from "./Copyright";
import ChatIcon from "./ChatIcon";
import useChatActions from "../hooks/useChatActions";
import useChatClassName from "../hooks/useChatClassName";

const Chat = () => {
  const {
    status: { isOpenChat },
  } = useChatActions();
  const chatClassName = useChatClassName();

  return (
    <div
      className={`fixed bottom-4 right-4 max-md:right-2 z-1001 transition-[width] ease-in-out duration-400 ${chatClassName ?? ""}`}
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
