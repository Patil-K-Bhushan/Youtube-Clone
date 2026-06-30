import { useRef, useEffect, useCallback } from "react";

const useChatScroll = (trigger, paused) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return; 
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (nearBottom) el.scrollTop = el.scrollHeight;
  }, [trigger, paused]);

  const scrollToBottom = useCallback(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  return { ref, scrollToBottom };
};

export default useChatScroll;
