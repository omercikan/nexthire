import { RefObject, useEffect, useRef } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref.current;

      if (!el || !(event.target instanceof Node) || el.contains(event.target)) {
        return;
      }

      callbackRef.current();
    };

    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref]);
}

export default useClickOutside;
