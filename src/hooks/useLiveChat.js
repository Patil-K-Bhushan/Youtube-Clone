import { useEffect, useRef } from "react";
import { LIVE_CHAT_API } from "../utils/constants";
import {
  randomChatMessage,
  normalizeLiveMessage,
  LIVE_CHAT_LIMIT,
} from "../utils/liveChatData";

const useLiveChat = (liveChatId, push) => {
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    if (!liveChatId) {
      const interval = setInterval(() => push([randomChatMessage()]), 1200);
      return () => clearInterval(interval);
    }

    let timer, token = "";
    const loop = async () => {
      if (document.hidden) return;
      try {
        const res = await fetch(LIVE_CHAT_API(liveChatId, token));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled.current) return;
        if (token) {
          const msgs = (json.items ?? []).slice(-LIVE_CHAT_LIMIT).map(normalizeLiveMessage);
          push(msgs);
        }
        token = json.nextPageToken ?? token;
        timer = setTimeout(loop, Math.max(json.pollingIntervalMillis ?? 4000, 1500));
      } catch (err) {
        console.error("Live chat error:", err);
      }
    };
    const onVisible = () => !document.hidden && (clearTimeout(timer), loop());
    document.addEventListener("visibilitychange", onVisible);
    loop();

    return () => {
      cancelled.current = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [liveChatId, push]);
};

export default useLiveChat;
