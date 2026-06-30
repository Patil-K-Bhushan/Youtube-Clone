import { MOST_POPULAR_API, SEARCH_API, VIDEOS_BY_IDS_API } from "./constants";

const json = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const resolveFeed = async ({ categoryId = null, query = null }) => {
  if (query) {
    const found = (await json(SEARCH_API(query))).items ?? [];
    const ids = found.map((i) => i.id?.videoId).filter(Boolean);
    if (!ids.length) return [];
    return (await json(VIDEOS_BY_IDS_API(ids))).items ?? [];
  }
  return (await json(MOST_POPULAR_API(categoryId))).items ?? [];
};
