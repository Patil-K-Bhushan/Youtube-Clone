import { useSearchParams } from "react-router-dom";
import VideoContainer from "../video/VideoContainer";

const ResultsPage = () => {
  const [params] = useSearchParams();
  const query = params.get("search_query") || "";

  return (
    <main className="min-w-0">
      <h1 className="px-6 pt-6 text-xl font-semibold text-gray-900">
        Results for “{query}”
      </h1>
      <VideoContainer filter={{ query }} />
    </main>
  );
};

export default ResultsPage;
