import { CHANNELS_API } from "./constants";

const cache = new Map();

export const fetchChannelAvatars = async (videos) => {
  const ids = [
    ...new Set(videos.map((v) => v?.snippet?.channelId).filter(Boolean)),
  ];
  const missing = ids.filter((id) => !cache.has(id));

  if (missing.length) {
    try {
      const res = await fetch(CHANNELS_API(missing));
      if (!res.ok) {
        console.error("channels.list failed:", res.status, await res.text());
      } else {
        const json = await res.json();
        (json.items ?? []).forEach((ch) => {
          const t = ch.snippet?.thumbnails;
          cache.set(ch.id, (t?.medium ?? t?.default ?? t?.high)?.url ?? null);
        });
      }
    } catch (err) {
      console.error("channels.list error:", err);
    }
  }

  return ids.reduce((map, id) => {
    map[id] = cache.get(id);
    return map;
  }, {});
};
