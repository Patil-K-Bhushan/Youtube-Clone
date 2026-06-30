import { useState } from "react";
import { useWatch } from "../../context/WatchContext";
import useChatBuffer from "../../hooks/useChatBuffer";
import useLiveChat from "../../hooks/useLiveChat";
import useChatScroll from "../../hooks/useChatScroll";
import { makeUserMessage } from "../../utils/liveChatData";
import { useSelector } from "react-redux";
import { postLiveChatMessage } from "../../utils/youtubeActions";
import LiveChatHeader from "./LiveChatHeader";
import LiveChatMessageList from "./LiveChatMessageList";
import LiveChatComposer from "./LiveChatComposer";

const LiveChat = () => {
  const accessToken = useSelector((store) => store.auth.accessToken);
  const user = useSelector((store) => store.auth.user);
  const { video } = useWatch();
  const liveChatId = video?.liveStreamingDetails?.activeLiveChatId ?? null;

  const [paused, setPaused] = useState(false);
  const { messages, staged, push, pushSelf, resume } = useChatBuffer(paused);
  useLiveChat(liveChatId, push);
  const { ref, scrollToBottom } = useChatScroll(messages[messages.length - 1]?.id, paused);
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
    pushSelf(makeUserMessage(text, user));
    setInput("");
    followBottom();
    if (accessToken && liveChatId) {
      postLiveChatMessage(accessToken, liveChatId, text).catch((e) =>
        console.error("Send failed:", e)
      );
    }
  };

  return (
    <aside className="relative flex h-[70vh] w-full flex-col overflow-hidden rounded-xl border border-gray-200 lg:w-96">
      <LiveChatHeader liveChatId={liveChatId} />
      <LiveChatMessageList
        scrollRef={ref}
        onScroll={onScroll}
        messages={messages}
        paused={paused}
        stagedCount={staged.length}
        onFollowBottom={followBottom}
      />
      <LiveChatComposer input={input} setInput={setInput} onSend={send} />
    </aside>
  );
};

export default LiveChat;
