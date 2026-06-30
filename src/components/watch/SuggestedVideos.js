import { useGetVideos } from "../../hooks/useGetVideos";
import SuggestionCard from "./SuggestionCard";

const SuggestedVideos = () => {
  const { videos } = useGetVideos();

  return (
    <aside className="w-full shrink-0 space-y-2 lg:w-96">
      {videos.map((video) => (
        <SuggestionCard key={video.id} video={video} />
      ))}
    </aside>
  );
};

export default SuggestedVideos;
