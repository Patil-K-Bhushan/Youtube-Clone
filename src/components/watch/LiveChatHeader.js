import React from "react";

const LiveChatHeader = ({ liveChatId }) => (
  <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
    <h2 className="font-semibold text-gray-900">Live chat</h2>
    <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
      <span className="h-2 w-2 animate-pulse rounded-full bg-red-600" />
      {liveChatId ? "LIVE" : "LIVE • demo"}
    </span>
  </div>
);

export default LiveChatHeader;
