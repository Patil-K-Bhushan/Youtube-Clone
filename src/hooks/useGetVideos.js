import { useState, useEffect } from "react";
import { resolveFeed } from "../utils/resolveFeed";
import { fetchChannelAvatars } from "../utils/fetchChannelAvatars";

export const useGetVideos = (filter = { categoryId: null }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const key = JSON.stringify(filter);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    const run = async () => {
      try {
        const items = await resolveFeed(JSON.parse(key));
        const avatars = await fetchChannelAvatars(items);
        if (active)
          setVideos(items.map((v) => ({ ...v, channelAvatar: avatars[v.snippet.channelId] })));
      } catch (err) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => { active = false; };
  }, [key]);

  return { videos, error, loading };
};