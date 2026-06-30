import React, { useState, useEffect, useCallback } from "react";
import VideoCard from "./VideoCard";
import ShimmerCard from "../common/ShimmerCard";
import { fetchChannelAvatars } from "../../utils/fetchChannelAvatars";

const gridClasses =
  "grid grid-cols-1 gap-x-4 gap-y-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

const VideoContainer = ({ filter }) => {
  const [videosList, setVideosList] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const filterKey = JSON.stringify(filter);

  const fetchVideosBatch = useCallback(async (filterObj, token) => {
    const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!KEY) {
      throw new Error("No YouTube API Key configured");
    }

    const BASE = "https://youtube.googleapis.com/youtube/v3";
    let url = "";

    const categoryId = filterObj?.categoryId;
    const query = filterObj?.query;

    if (query) {
      // Search path
      url = `${BASE}/search?part=snippet&type=video&maxResults=12&regionCode=IN&q=${encodeURIComponent(query)}&key=${KEY}`;
      if (token) url += `&pageToken=${token}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = data.items ?? [];

      const ids = items.map((i) => i.id?.videoId).filter(Boolean);
      if (!ids.length) return { items: [], nextPageToken: null };
      const statsRes = await fetch(
        `${BASE}/videos?part=snippet,statistics,contentDetails&id=${ids.join(",")}&key=${KEY}`
      );
      const statsData = await statsRes.json();
      return {
        items: statsData.items ?? [],
        nextPageToken: data.nextPageToken ?? null,
      };
    } else {
      // Popular path
      url = `${BASE}/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=12&regionCode=IN&key=${KEY}`;
      if (categoryId) url += `&videoCategoryId=${categoryId}`;
      if (token) url += `&pageToken=${token}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      return {
        items: data.items ?? [],
        nextPageToken: data.nextPageToken ?? null,
      };
    }
  }, []);

  // Fetch initial batch
  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setVideosList([]);
    setNextPageToken(null);

    const run = async () => {
      const parsedFilter = JSON.parse(filterKey);
      try {
        const { items, nextPageToken: nextToken } = await fetchVideosBatch(parsedFilter, null);
        const avatars = await fetchChannelAvatars(items);
        if (active) {
          setVideosList(
            items.map((v) => ({ ...v, channelAvatar: avatars[v.snippet?.channelId] }))
          );
          setNextPageToken(nextToken);
        }
      } catch (err) {
        console.warn("API batch load failed:", err);
        if (active) {
          setError(
            "Failed to fetch videos. A valid YouTube API key is required to stream live content."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => {
      active = false;
    };
  }, [filterKey, fetchVideosBatch]);

  const loadMore = useCallback(async () => {
    if (loadingMore || loading || error) return;
    setLoadingMore(true);

    const parsedFilter = JSON.parse(filterKey);
    try {
      const { items, nextPageToken: nextToken } = await fetchVideosBatch(parsedFilter, nextPageToken);
      if (items.length) {
        const avatars = await fetchChannelAvatars(items);
        setVideosList((prev) => [
          ...prev,
          ...items.map((v) => ({ ...v, channelAvatar: avatars[v.snippet?.channelId] })),
        ]);
        setNextPageToken(nextToken);
      }
    } catch (err) {
      console.warn("API loadMore failed:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [filterKey, nextPageToken, loading, loadingMore, error, fetchVideosBatch]);

  // Window scroll listener for Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 600;
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - threshold
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  if (loading) {
    return (
      <div className={gridClasses}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ShimmerCard key={`initial-shimmer-${i}`} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center p-6 text-center space-y-3">
        <p className="text-base font-semibold text-red-500 dark:text-red-400">
          {error}
        </p>
        <p className="text-xs text-gray-500 dark:text-zinc-400 max-w-sm">
          Please add a valid `REACT_APP_YOUTUBE_API_KEY` to your `.env` configuration file and restart the development server.
        </p>
      </div>
    );
  }

  if (!videosList.length) {
    return (
      <p className="px-6 py-12 text-gray-500 dark:text-zinc-400">
        No videos found for this search.
      </p>
    );
  }

  return (
    <div className="pb-12">
      <div className={gridClasses}>
        {videosList.map((video) => (
          <VideoCard key={video.id} info={video} />
        ))}
      </div>

      {loadingMore && (
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <ShimmerCard key={`load-more-shimmer-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
