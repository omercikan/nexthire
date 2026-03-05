import { useSelector } from "react-redux";
import { ChatIcons } from "../icons/ChatIcon";
import { RootState } from "@/shared/redux/store";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

const ChatBody = () => {
  const { chat: Chat } = ChatIcons;
  const { messages } = useSelector((state: RootState) => state.chatData);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current?.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      className="px-6 py-7.5 h-100 modal-scrollbar scroll-smooth"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `
        radial-gradient(at 0% 0%, rgba(64, 69, 239, 0.12) 0px, transparent 50%), 
        radial-gradient(at 100% 100%, rgba(64, 69, 239, 0.05) 0px, transparent 50%)`,
      }}
      ref={chatBodyRef}
    >
      {messages.map(({ from, message }, i) => (
        <div key={i}>
          {from === "ai" && (
            <div className="flex items-center gap-1.75 mt-4">
              <div className="border border-[#E3E3E3] rounded-full w-max p-[7.91px]">
                <Chat color="003DF5" size={12} />
              </div>

              <div className="flex gap-1 text-xs text-[#667085]">
                <span>Canlı Sohbet</span>
              </div>
            </div>
          )}

          <div
            className={`${from === "user" ? "bg-[#003DF5] text-white ms-auto" : "bg-white"} max-w-[75%] w-fit border border-[#E3E3E3] rounded-[10px] py-3.75 px-8.5 mt-2 ms-8`}
          >
            <Markdown
              allowedElements={[
                "p",
                "strong",
                "em",
                "ul",
                "ol",
                "li",
                "code",
                "pre",
              ]}
              components={{
                p: ({ children }) => (
                  <p className="leading-relaxed">{children}</p>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc pl-5 my-4">{children}</ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 my-4">{children}</ol>
                ),

                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),

                strong: ({ children }) => (
                  <strong className="font-semibold">{children}</strong>
                ),
              }}
            >
              {message}
            </Markdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
