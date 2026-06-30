import VideoCard from "./VideoCard";
import ShimmerCard from "./ShimmerCard";
import { useGetVideos } from "../hooks/useGetVideos";
import { Link } from "react-router-dom";

const gridClasses =
  "grid grid-cols-1 gap-x-4 gap-y-8 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

const VideoContainer = ({ filter }) => {
  const { videos, error, loading } = useGetVideos(filter);

  if (error)
    return (
      <div className="flex h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-base font-medium text-red-600">
          Could not load videos — {error}
        </p>
      </div>
    );

  if (loading)
    return (
      <div className={gridClasses}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ShimmerCard key={i} />
        ))}
      </div>
    );

  if (!videos.length)
    return (
      <p className="px-6 py-12 text-gray-500">
        No videos found for this category.
      </p>
    );

  return (
    <div className={gridClasses}>
      {videos.map((video) => (
        <Link key={video.id} to={`/watch?v=${video.id}`}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
