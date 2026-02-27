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
      className={`fixed bottom-4 right-4 z-1001 ${isOpenChat ? "rounded-[30px] border border-[#6670854f]" : ""}`}
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
