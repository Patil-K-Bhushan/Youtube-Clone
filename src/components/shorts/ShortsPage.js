import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetVideos } from "../../hooks/useGetVideos";
import useCollapseSidebar from "../../hooks/useCollapseSidebar";
import { setShortsList } from "../../utils/shortsSlice";
import ShortsFeed from "./ShortsFeed";

const ShortsPage = () => {
  useCollapseSidebar();
  const dispatch = useDispatch();
  const { shortsList } = useSelector((store) => store.shorts);
  const { videos: apiVideos, error, loading } = useGetVideos({ query: "#shorts" });

  useEffect(() => {
    if (!loading && shortsList.length === 0 && apiVideos?.length) {
      const mapped = apiVideos.map((v) => ({
        id: typeof v.id === "object" ? v.id.videoId : v.id,
        originalId: typeof v.id === "object" ? v.id.videoId : v.id,
        title: v.snippet?.title || "",
        channelTitle: v.snippet?.channelTitle || "Creator",
        channelAvatar: v.channelAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${v.snippet?.channelTitle}`,
        statistics: {
          likeCount: v.statistics?.likeCount || "0",
          commentCount: v.statistics?.commentCount || "0",
          viewCount: v.statistics?.viewCount || "0",
        },
        comments: [],
      }));
      dispatch(setShortsList(mapped));
    }
  }, [apiVideos, loading, shortsList.length, dispatch]);

  if (loading && shortsList.length === 0) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center bg-zinc-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  if (error && shortsList.length === 0) {
    return (
      <div className="flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-zinc-950 px-6 text-center space-y-2">
        <p className="text-sm font-semibold text-red-500">{error}</p>
        <p className="text-xs text-zinc-400">Configure a valid API key in your .env to stream Shorts.</p>
      </div>
    );
  }

  return <ShortsFeed />;
};

export default ShortsPage;
