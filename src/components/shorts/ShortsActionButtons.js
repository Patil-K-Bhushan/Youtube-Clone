import { useState } from "react";
import { MdOutlineThumbUp, MdThumbUp, MdOutlineThumbDown, MdThumbDown, MdInsertComment, MdShare } from "react-icons/md";
import { formatCount } from "../../utils/helpers";
import { Link } from "react-router-dom";

const ShortsActionButtons = ({ short, isCommentsOpen, onCommentsToggle, onShareCopy, isMobile }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { statistics, snippet, channelAvatar } = short;
  const channelTitle = short.channelTitle || snippet?.channelTitle || "Creator";
  const channelId = short.channelId || snippet?.channelId;

  const btnClass = `flex flex-col items-center select-none active:scale-95 transition-transform duration-150 ${isMobile ? "text-white" : "text-zinc-400 hover:text-zinc-200"}`;
  const wrapperClass = `flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 shadow-lg ${
    isMobile 
      ? "bg-black/60 backdrop-blur-md hover:bg-black/80 border border-white/10" 
      : "bg-zinc-900/85 backdrop-blur-md hover:bg-zinc-850 border border-white/5"
  }`;

  return (
    <>
      <button onClick={() => { setIsLiked(!isLiked); if (isDisliked) setIsDisliked(false); }} className={btnClass}>
        <div className={wrapperClass}>{isLiked ? <MdThumbUp className="text-xl text-blue-500" /> : <MdOutlineThumbUp className="text-xl" />}</div>
        <span className={`mt-1 text-[11px] font-semibold ${isMobile ? "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" : ""}`}>
          {formatCount(parseInt(statistics?.likeCount || "0") + (isLiked ? 1 : 0))}
        </span>
      </button>
      <button onClick={() => { setIsDisliked(!isDisliked); if (isLiked) setIsLiked(false); }} className={btnClass}>
        <div className={wrapperClass}>{isDisliked ? <MdThumbDown className="text-xl text-red-500" /> : <MdOutlineThumbDown className="text-xl" />}</div>
        <span className={`mt-1 text-[11px] font-semibold ${isMobile ? "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" : ""}`}>Dislike</span>
      </button>
      <button onClick={onCommentsToggle} className={btnClass}>
        <div className={`${wrapperClass} ${isCommentsOpen ? "text-blue-400 bg-zinc-800" : ""}`}><MdInsertComment className="text-xl" /></div>
        <span className={`mt-1 text-[11px] font-semibold ${isMobile ? "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" : ""}`}>
          {formatCount(statistics?.commentCount || "0")}
        </span>
      </button>
      <button onClick={onShareCopy} className={btnClass}>
        <div className={wrapperClass}><MdShare className="text-xl" /></div>
        <span className={`mt-1 text-[11px] font-semibold ${isMobile ? "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" : ""}`}>Share</span>
      </button>
      {channelId ? (
        <Link to={`/channel/${channelId}`} className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-md hover:scale-105 transition-all shadow-lg shrink-0">
          <img src={channelAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${channelTitle}`} alt="Channel" className="h-8 w-8 rounded-full object-cover" />
        </Link>
      ) : (
        <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-md shadow-lg shrink-0">
          <img src={channelAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${channelTitle}`} alt="Channel" className="h-8 w-8 rounded-full object-cover" />
        </div>
      )}
    </>
  );
};

export default ShortsActionButtons;
