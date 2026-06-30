import { colorFor } from "../../utils/liveChatData";

const ChatMessage = ({ message }) => (
  <div className="flex items-start gap-2 text-sm">
    {message.avatar ? (
      <img
        src={message.avatar}
        alt={message.author}
        className="mt-0.5 h-6 w-6 shrink-0 rounded-full"
      />
    ) : (
      <div
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ${colorFor(message.author)}`}
      >
        {message.author.charAt(0).toUpperCase()}
      </div>
    )}
    <p className="min-w-0 break-words">
      <span
        className={`mr-1.5 font-medium ${message.isUser ? "text-blue-600" : "text-gray-500"}`}
      >
        {message.author}
      </span>
      <span className="text-gray-900">{message.text}</span>
    </p>
  </div>
);

export default ChatMessage;
