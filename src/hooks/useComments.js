import { useState, useEffect } from "react";
import { COMMENTS_API } from "../utils/constants";

const normalize = (raw) => {
  const s = raw.snippet;
  return {
    id: raw.id,
    author: s.authorDisplayName,
    avatar: s.authorProfileImageUrl,
    text: s.textOriginal,
    likeCount: s.likeCount ?? 0,
    publishedAt: s.publishedAt,
    replies: [],
  };
};

const useComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;
    let active = true;
    setLoading(true);
    setDisabled(false);

    const run = async () => {
      try {
        const res = await fetch(COMMENTS_API(videoId));
        if (res.status === 403) return active && setDisabled(true);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const items = (await res.json()).items ?? [];
        const tree = items.map((thread) => {
          const node = normalize(thread.snippet.topLevelComment);
          node.replies = (thread.replies?.comments ?? []).map(normalize);
          return node;
        });
        if (active) setComments(tree);
      } catch (err) {
        console.error("Comments error:", err);
      } finally {
        if (active) setLoading(false);
      }
    };

    run();
    return () => { active = false; };
  }, [videoId]);

  return { comments, disabled, loading };
};

export default useComments;
