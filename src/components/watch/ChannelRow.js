import { useWatch } from "../../context/WatchContext";
import SubscribeButton from "./SubscribeButton";
import { Link } from "react-router-dom";

const ChannelRow = () => {
  const { video } = useWatch();
  const { channelTitle, channelId } = video.snippet;
  const { channelAvatar } = video;

  return (
    <div className="flex items-center gap-3">
      <Link to={`/channel/${channelId}`}>
        {channelAvatar ? (
          <img
            src={channelAvatar}
            alt={channelTitle}
            className="h-10 w-10 shrink-0 rounded-full object-cover hover:opacity-85 transition"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 font-semibold text-white hover:opacity-85 transition">
            {channelTitle.charAt(0).toUpperCase()}
          </div>
        )}
      </Link>
      <div>
        <Link to={`/channel/${channelId}`} className="hover:text-blue-600 transition">
          <p className="min-w-0 truncate font-semibold text-gray-900 dark:text-zinc-150">
            {channelTitle}
          </p>
        </Link>
      </div>
      <SubscribeButton />
    </div>
  );
};

export default ChannelRow;
