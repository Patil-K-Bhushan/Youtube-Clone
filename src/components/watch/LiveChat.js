import { useState } from "react";
import { useWatch } from "../../context/WatchContext";
import useChatBuffer from "../../hooks/useChatBuffer";
import useLiveChat from "../../hooks/useLiveChat";
import useChatScroll from "../../hooks/useChatScroll";
import { makeUserMessage } from "../../utils/liveChatData";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  const { video } = useWatch();
  const liveChatId = video?.liveStreamingDetails?.activeLiveChatId ?? null;

  const [paused, setPaused] = useState(false);
  const { messages, staged, push, pushSelf, resume } = useChatBuffer(paused);
  useLiveChat(liveChatId, push);
  const { ref, scrollToBottom } = useChatScroll(
    messages[messages.length - 1]?.id,
    paused,
  );
  const [input, setInput] = useState("");

  const followBottom = () => {
    resume();
    setPaused(false);
    requestAnimationFrame(scrollToBottom);
  };

  const onScroll = (e) => {
    const el = e.currentTarget;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (nearBottom && paused) followBottom();
    else if (!nearBottom && !paused) setPaused(true);
  };

  const send = () => {
    const text = input.trim();
    if (!text) return;
    pushSelf(makeUserMessage(text));
    setInput("");
    followBottom();
  };

  return (
    <aside className="relative flex h-[70vh] w-full flex-col overflow-hidden rounded-xl border border-gray-200 lg:w-96">
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
        <h2 className="font-semibold text-gray-900">Live chat</h2>
        <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
          {liveChatId ? "LIVE" : "LIVE • demo"}
        </span>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-3"
      >
        {messages.map((m) => (
          <ChatMessage key={m.id} message={m} />
        ))}
      </div>

      {paused && (
        <button
          onClick={followBottom}
          className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-medium text-white shadow-lg hover:bg-gray-800"
        >
          Chat paused{staged.length ? ` · ${staged.length} new` : ""} ▾
        </button>
      )}

      <div className="flex items-center gap-2 border-t border-gray-200 px-3 py-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-xs font-semibold text-white">
          Y
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Chat..."
          maxLength={200}
          className="flex-1 border-b border-gray-300 pb-1 text-sm outline-none focus:border-gray-900"
        />
        <button
          onClick={send}
          disabled={!input.trim()}
          className="text-sm font-semibold text-blue-600 disabled:text-gray-300"
        >
          Send
        </button>
      </div>
    </aside>
  );
};

export default LiveChat;
