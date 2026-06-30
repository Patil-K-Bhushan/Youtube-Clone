import { useWatch } from "../../context/WatchContext";
import SubscribeButton from "./SubscribeButton";

const ChannelRow = () => {
  const { video } = useWatch();
  const { channelTitle } = video.snippet;
  const { channelAvatar } = video;

  return (
    <div className="flex items-center gap-3">
      {channelAvatar ? (
        <img
          src={channelAvatar}
          alt={channelTitle}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 font-semibold text-white">
          {channelTitle.charAt(0).toUpperCase()}
        </div>
      )}
      <p className="min-w-0 truncate font-semibold text-gray-900">
        {channelTitle}
      </p>
      <SubscribeButton />
    </div>
  );
};

export default ChannelRow;
