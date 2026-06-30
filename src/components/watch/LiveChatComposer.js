import React from "react";

const LiveChatComposer = ({ input, setInput, onSend }) => (
  <div className="flex items-center gap-2 border-t border-gray-200 px-3 py-3">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-xs font-semibold text-white">
      Y
    </div>
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onSend()}
      placeholder="Chat..."
      maxLength={200}
      className="flex-1 border-b border-gray-300 pb-1 text-sm outline-none focus:border-gray-900"
    />
    <button
      onClick={onSend}
      disabled={!input.trim()}
      className="text-sm font-semibold text-blue-600 disabled:text-gray-300"
    >
      Send
    </button>
  </div>
);

export default LiveChatComposer;
