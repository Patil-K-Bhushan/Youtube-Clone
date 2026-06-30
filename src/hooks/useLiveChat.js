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

    let timer;
    const poll = async (pageToken = "", firstCall = true) => {
      try {
        const res = await fetch(LIVE_CHAT_API(liveChatId, pageToken));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (cancelled.current) return;
        if (!firstCall)
          push(
            (json.items ?? [])
              .slice(-LIVE_CHAT_LIMIT)
              .map(normalizeLiveMessage),
          );
        const wait = Math.max(json.pollingIntervalMillis ?? 4000, 1500);
        timer = setTimeout(() => poll(json.nextPageToken, false), wait);
      } catch (err) {
        console.error("Live chat error:", err);
      }
    };
    poll();

    return () => {
      cancelled.current = true;
      clearTimeout(timer);
    };
  }, [liveChatId, push]);
};

export default useLiveChat;
