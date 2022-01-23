import { useEffect, useRef } from "react";

const useEventListener = (
  eventName: string,
  handler: any,
  element = typeof window !== "undefined" ? window : null
) => {
  const savedHandler: any = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: any) => savedHandler!.current(event);
    element!.addEventListener(eventName, eventListener);
    return () => {
      element!.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
