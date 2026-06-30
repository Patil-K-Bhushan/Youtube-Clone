import { useWatch } from "../../context/WatchContext";
import ChannelRow from "./ChannelRow";
import ActionBar from "./ActionBar";

const VideoMeta = () => {
  const { video } = useWatch();
  if (!video) return null;

  return (
    <div className="mt-4">
      <h1 className="text-xl font-bold text-gray-900">{video.snippet.title}</h1>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ChannelRow />
        <ActionBar />
      </div>
    </div>
  );
};

export default VideoMeta;
