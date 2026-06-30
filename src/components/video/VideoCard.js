import { formatCount, parseDuration } from "../../utils/helpers";
import { Link } from "react-router-dom";

const VideoCard = ({ info, duration }) => {
  if (!info) return null;
  const { snippet, statistics, channelAvatar } = info;
  const { channelTitle, title, thumbnails } = snippet;
  const rAvatar = channelAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${channelTitle}`;
  const vId = typeof info.id === "object" ? info.id.videoId : info.id;

  return (
    <div className="group flex flex-col gap-2 rounded-xl p-2 transition duration-300 hover:bg-gray-100 dark:hover:bg-zinc-800">
      <Link to={`/watch?v=${vId}`} className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-105 dark:bg-zinc-800">
        <img className="h-full w-full object-cover group-hover:scale-102 transition duration-300" src={thumbnails.high.url} alt={title} />
        {duration && <span className="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-bold text-white">{duration}</span>}
      </Link>
      <div className="flex gap-2">
        <Link to={`/channel/${snippet.channelId}`} className="shrink-0">
          <img src={rAvatar} alt={channelTitle} className="h-8 w-8 rounded-full border border-gray-100 dark:border-zinc-800 object-cover hover:opacity-85 transition" />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={`/watch?v=${vId}`}>
            <h3 className="line-clamp-2 text-xs font-bold leading-snug text-gray-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
          </Link>
          <Link to={`/channel/${snippet.channelId}`} className="hover:text-gray-950 dark:hover:text-white transition">
            <p className="mt-1 truncate text-[10px] font-semibold text-gray-500 dark:text-zinc-400">{channelTitle}</p>
          </Link>
          <p className="text-[10px] text-gray-500 dark:text-zinc-400">{formatCount(statistics?.viewCount || 0)} views</p>
        </div>
      </div>
    </div>
  );
};

export const withLiveAndDuration = (WrappedComponent) => {
  return (props) => {
    const isLive = props.info?.snippet?.liveBroadcastContent === "live";
    const durationStr = props.info?.contentDetails?.duration;
    const duration = durationStr ? parseDuration(durationStr) : "";
    return (
      <div className="relative">
        <WrappedComponent {...props} duration={duration} />
        {isLive && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow animate-pulse z-10">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />LIVE
          </div>
        )}
      </div>
    );
  };
};

export default withLiveAndDuration(VideoCard);
