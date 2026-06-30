import { formatCount } from "../utils/helpers";

const VideoCard = ({ info }) => {
  if (!info) return null;

  const { snippet, statistics, channelAvatar } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="cursor-pointer">
      <img
        className="aspect-video w-full rounded-xl object-cover"
        src={thumbnails.high.url}
        alt={title}
      />

      <div className="mt-3 flex gap-3">
        {channelAvatar ? (
          <img
            src={channelAvatar}
            alt={channelTitle}
            className="h-9 w-9 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-sm font-semibold text-white">
            {channelTitle.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
            {title}
          </h3>
          <p className="mt-1 truncate text-xs text-gray-600">{channelTitle}</p>
          <p className="text-xs text-gray-600">
            {formatCount(statistics.viewCount)} views
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
