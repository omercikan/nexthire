import { useCallback, useEffect, useRef } from "react";

const useEventSource = () => {
  const eventSourceRef = useRef<EventSource | null>(null);

  const closeStream = useCallback(() => {
    eventSourceRef.current?.close();
    eventSourceRef.current = null;
  }, []);

  const openStream = useCallback(
    (url: string, options?: EventSourceInit) => {
      closeStream();
      const event = new EventSource(url, options);
      eventSourceRef.current = event;
      return event;
    },
    [closeStream],
  );

  useEffect(() => {
    return () => closeStream();
  }, [closeStream]);

  return { openStream, closeStream };
};

export default useEventSource;
