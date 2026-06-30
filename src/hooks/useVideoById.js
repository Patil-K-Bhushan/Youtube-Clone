import { useState, useEffect } from "react";
import { VIDEO_BY_ID_API } from "../utils/constants";
import { fetchChannelAvatars } from "../utils/fetchChannelAvatars";

const useVideoById = (videoId) => {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) return;
    let active = true;
    setVideo(null);
    setError(null);

    const fetchVideo = async () => {
      try {
        const res = await fetch(VIDEO_BY_ID_API(videoId));
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const item = (await res.json()).items?.[0] ?? null;
        if (item) {
          const avatars = await fetchChannelAvatars([item]);
          item.channelAvatar = avatars[item.snippet.channelId];
        }
        if (active) setVideo(item);
      } catch (err) {
        if (active) setError(err.message);
      }
    };

    fetchVideo();
    return () => {
      active = false;
    };
  }, [videoId]);

  return { video, error };
};

export default useVideoById;
