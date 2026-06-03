import { useRef, useState } from "react";

const useScrollControls = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const ulRef = useRef<HTMLUListElement | null>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    if (!ulRef.current) return;
    setScrollTop(Math.round(ulRef.current.scrollTop));
  };

  const startScrollDown = () => {
    scrollIntervalRef.current = setInterval(() => {
      if (!ulRef.current) return stopScrolling();

      ulRef.current.scrollBy({ top: 20 });

      const { scrollTop, scrollHeight, clientHeight } = ulRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        stopScrolling();
      }
    }, 50);
  };

  const startScrollUp = () => {
    scrollIntervalRef.current = setInterval(() => {
      if (!ulRef.current) return stopScrolling();

      ulRef.current.scrollBy({ top: -20 });

      if (ulRef.current.scrollTop <= 0) {
        stopScrolling();
      }
    }, 50);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  return {
    ulRef,
    handleScroll,
    startScrollDown,
    startScrollUp,
    stopScrolling,
    setMaxScroll,
    scrollTop,
    maxScroll,
  };
};

export default useScrollControls;
