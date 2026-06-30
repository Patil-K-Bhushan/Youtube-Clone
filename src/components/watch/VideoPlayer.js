import { useWatch } from "../../context/WatchContext";

const VideoPlayer = () => {
  const { videoId, error } = useWatch();

  if (error)
    return <p className="text-red-600">Could not load video — {error}</p>;
  if (!videoId) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
