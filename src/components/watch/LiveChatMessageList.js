import React from "react";
import ChatMessage from "./ChatMessage";

const LiveChatMessageList = ({
  scrollRef,
  onScroll,
  messages,
  paused,
  stagedCount,
  onFollowBottom,
}) => (
  <div className="relative flex-1 min-h-0">
    <div
      ref={scrollRef}
      onScroll={onScroll}
      className="h-full space-y-3 overflow-y-auto px-4 py-3"
    >
      {messages.map((m) => (
        <ChatMessage key={m.id} message={m} />
      ))}
    </div>

    {paused && (
      <button
        onClick={onFollowBottom}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-medium text-white shadow-lg hover:bg-gray-800"
      >
        Chat paused{stagedCount ? ` · ${stagedCount} new` : ""} ▾
      </button>
    )}
  </div>
);

export default LiveChatMessageList;
