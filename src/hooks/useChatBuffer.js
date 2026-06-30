import { useState, useRef, useEffect, useCallback } from "react";
import { LIVE_CHAT_LIMIT } from "../utils/liveChatData";

const useChatBuffer = (paused) => {
  const [messages, setMessages] = useState([]);
  const [staged, setStaged] = useState([]);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const push = useCallback((batch) => {
    if (!batch.length) return;
    const set = pausedRef.current ? setStaged : setMessages;
    set((prev) => [...prev, ...batch].slice(-LIVE_CHAT_LIMIT));
  }, []);

  const pushSelf = useCallback(
    (msg) => setMessages((prev) => [...prev, msg].slice(-LIVE_CHAT_LIMIT)),
    [],
  );

  const resume = useCallback(() => {
    setMessages((prev) => [...prev, ...staged].slice(-LIVE_CHAT_LIMIT));
    setStaged([]);
  }, [staged]);

  return { messages, staged, push, pushSelf, resume };
};

export default useChatBuffer;
