import { useParams } from "react-router-dom";
import VideoContainer from "../video/VideoContainer";
import { FEED_CATEGORIES, AUTH_FEEDS } from "../../utils/feedCategories";

const titleize = (slug = "") =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const FeedPage = () => {
  const { slug } = useParams();
  const isTopicFeed = FEED_CATEGORIES[slug] !== undefined;
  const needsAuth = AUTH_FEEDS.includes(slug);

  return (
    <main className="min-w-0">
      <h1 className="px-6 pt-6 text-2xl font-bold text-gray-900">
        {titleize(slug)}
      </h1>
      {isTopicFeed ? (
        <VideoContainer filter={{ categoryId: FEED_CATEGORIES[slug] }} />
      ) : (
        <p className="px-6 py-12 text-gray-500">
          {needsAuth
            ? `Sign in to see your ${titleize(slug).toLowerCase()} — needs OAuth, placeholder here.`
            : "This section is a placeholder in the clone."}
        </p>
      )}
    </main>
  );
};

export default FeedPage;
