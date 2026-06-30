import { useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveIndex, appendShortsList, setNextPageToken } from "../../utils/shortsSlice";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import ShortsFeedItem from "./ShortsFeedItem";

const ShortsFeed = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const { shortsList, activeIndex, nextPageToken } = useSelector((store) => store.shorts);

  const loadMore = useCallback(async () => {
    const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!KEY) return;
    try {
      const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${encodeURIComponent("#shorts")}&pageToken=${nextPageToken || ""}&key=${KEY}`;
      const data = await fetch(url).then(r => r.json());
      const ids = (data.items || []).map((i) => i.id?.videoId).filter(Boolean);
      if (!ids.length) return;
      const stats = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids.join(",")}&key=${KEY}`).then(r => r.json());
      const mapped = (stats.items || []).map((v) => ({
        id: v.id, originalId: v.id, title: v.snippet?.title || "",
        channelTitle: v.snippet?.channelTitle || "Creator",
        channelAvatar: `https://api.dicebear.com/7.x/initials/svg?seed=${v.snippet?.channelTitle}`,
        statistics: { likeCount: v.statistics?.likeCount || "0", commentCount: v.statistics?.commentCount || "0", viewCount: v.statistics?.viewCount || "0" },
        comments: []
      }));
      dispatch(appendShortsList(mapped));
      dispatch(setNextPageToken(data.nextPageToken || null));
    } catch (e) { console.error(e); }
  }, [nextPageToken, dispatch]);

  const navigateShort = (dir) => {
    const nextIdx = activeIndex + dir;
    if (nextIdx >= 0 && nextIdx < shortsList.length) {
      containerRef.current?.scrollTo({ top: nextIdx * containerRef.current.clientHeight, behavior: "smooth" });
      dispatch(setActiveIndex(nextIdx));
    }
  };

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    if (idx !== activeIndex && idx >= 0 && idx < shortsList.length) dispatch(setActiveIndex(idx));
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) loadMore();
  };

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full items-center justify-center bg-zinc-950 overflow-hidden">
      <div className="absolute right-4 md:right-8 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3">
        <button onClick={() => navigateShort(-1)} disabled={activeIndex === 0} className="rounded-full bg-zinc-900/60 backdrop-blur-md p-3 text-zinc-200 hover:bg-zinc-800 disabled:opacity-30 border border-white/10 active:scale-90 transition-transform shadow-xl"><MdKeyboardArrowUp className="text-xl" /></button>
        <button onClick={() => navigateShort(1)} disabled={activeIndex === shortsList.length - 1} className="rounded-full bg-zinc-900/60 backdrop-blur-md p-3 text-zinc-200 hover:bg-zinc-800 disabled:opacity-30 border border-white/10 active:scale-90 transition-transform shadow-xl"><MdKeyboardArrowDown className="text-xl" /></button>
      </div>
      <div ref={containerRef} onScroll={handleScroll} className="h-full w-full overflow-y-scroll snap-y snap-mandatory scrollbar-none flex flex-col items-center" style={{ scrollbarWidth: "none" }}>
        {shortsList.map((short, idx) => (
          <ShortsFeedItem key={short.id + "-" + idx} short={short} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default ShortsFeed;
