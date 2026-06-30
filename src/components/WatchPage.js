import { useSearchParams } from "react-router-dom";
import useCollapseSidebar from "../hooks/useCollapseSidebar";
import useVideoById from "../hooks/useVideoById";
import WatchContext from "../context/WatchContext";
import VideoPlayer from "./watch/VideoPlayer";
import VideoMeta from "./watch/VideoMeta";
import DescriptionBox from "./watch/DescriptionBox";
import CommentsSection from "./watch/CommentsSection";
import SuggestedVideos from "./watch/SuggestedVideos";
import LiveChat from "./watch/LiveChat";

const WatchPage = () => {
  useCollapseSidebar();

  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const { video, error } = useVideoById(videoId);

  const isLive = video?.snippet?.liveBroadcastContent === "live";

  return (
    <WatchContext.Provider value={{ videoId, video, error }}>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-6 p-6 lg:flex-row">
        <div className="min-w-0 flex-1">
          <VideoPlayer />
          <VideoMeta />
          <DescriptionBox />
          <CommentsSection />
        </div>
        {isLive ? <LiveChat /> : <SuggestedVideos />}
      </div>
    </WatchContext.Provider>
  );
};

export default WatchPage;
