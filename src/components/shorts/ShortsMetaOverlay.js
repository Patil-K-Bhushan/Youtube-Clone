import { useState } from "react";
import { Link } from "react-router-dom";

const ShortsMetaOverlay = ({ short, isPlaying, isActive }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { title, channelTitle, channelAvatar, snippet } = short;
  const resolvedAvatar = channelAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${channelTitle}`;
  const channelId = short.channelId || snippet?.channelId;

  return (
    <div className="absolute bottom-3 left-3 right-3 bg-zinc-950/70 backdrop-blur-md border border-white/10 rounded-xl p-3 text-white z-10 select-none pointer-events-auto shadow-lg">
      <div className="flex items-center justify-between gap-2">
        {channelId ? (
          <Link to={`/channel/${channelId}`} className="flex items-center gap-2 hover:opacity-90 min-w-0">
            <img src={resolvedAvatar} alt={channelTitle} className="h-7 w-7 rounded-full border border-zinc-700 bg-zinc-800 object-cover shrink-0" />
            <span className="font-bold text-xs truncate text-zinc-100">@{channelTitle.replace(/\s+/g, "").toLowerCase()}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            <img src={resolvedAvatar} alt={channelTitle} className="h-7 w-7 rounded-full border border-zinc-700 bg-zinc-800 object-cover shrink-0" />
            <span className="font-bold text-xs truncate text-zinc-100">@{channelTitle.replace(/\s+/g, "").toLowerCase()}</span>
          </div>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); setIsSubscribed(!isSubscribed); }}
          className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold transition-all ${
            isSubscribed ? "bg-white/15 text-zinc-200 hover:bg-white/25" : "bg-red-600 text-white hover:bg-red-700 active:scale-95"
          }`}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <p className="mt-2 text-[11px] line-clamp-2 text-zinc-200 leading-relaxed font-normal">{title}</p>
    </div>
  );
};

export default ShortsMetaOverlay;
