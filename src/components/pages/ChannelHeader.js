import React from "react";
import { formatCount } from "../../utils/helpers";

const ChannelHeader = ({ channel }) => {
  const { snippet, statistics, brandingSettings } = channel;
  const avatar = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url;
  const banner = brandingSettings?.image?.bannerExternalUrl;

  return (
    <div className="w-full">
      {/* Banner */}
      {banner ? (
        <img
          src={banner}
          alt={snippet.title}
          className="h-28 md:h-40 w-full object-cover"
        />
      ) : (
        <div className="h-28 md:h-40 w-full bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
      )}
      {/* Info Profile */}
      <div className="px-6 flex flex-col md:flex-row md:items-center gap-4 mt-6">
        <img
          src={avatar}
          alt={snippet.title}
          className="h-20 w-20 md:h-28 md:w-28 rounded-full border border-gray-200 dark:border-zinc-850 shadow-md object-cover"
        />
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-zinc-100">{snippet.title}</h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-zinc-400">
            <span>@{snippet.customUrl || snippet.title.replace(/\s+/g, "").toLowerCase()}</span>
            <span>•</span>
            <span>{formatCount(statistics?.subscriberCount || 0)} subscribers</span>
            <span>•</span>
            <span>{formatCount(statistics?.videoCount || 0)} videos</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-zinc-450 max-w-xl line-clamp-2">{snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelHeader;
