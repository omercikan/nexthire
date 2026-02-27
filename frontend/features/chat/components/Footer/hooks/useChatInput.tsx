import { useRef } from "react";

const useChatInput = () => {
  const chatInputRef = useRef<HTMLInputElement | null>(null);

  const insertAtEmoji = (emoji: string) => {
    if (chatInputRef.current) {
      const { current: input } = chatInputRef;

      const start = input.selectionStart as number;
      const end = input.selectionEnd as number;

      const textBefore = input.value.substring(0, start);
      const textAfter = input.value.substring(end);

      input.value = textBefore.concat(emoji, textAfter);

      const newCursorPosition = start + emoji.length;
      input.selectionStart = input.selectionEnd = newCursorPosition;

      input.focus();
    }
  };

  return { chatInputRef, insertAtEmoji };
};

export default useChatInput;
