import { useState, useMemo } from "react";
import { useWatch } from "../../context/WatchContext";
import useComments from "../../hooks/useComments";
import CommentList from "./CommentLists";
import CommentComposer from "./CommentComposer";
import { formatCount, makeLocalComment } from "../../utils/helpers";

const CommentsSection = () => {
  const { videoId } = useWatch();
  const { comments, disabled, loading } = useComments(videoId);
  const [localTop, setLocalTop] = useState([]);
  const [sort, setSort] = useState("top"); 

  const ordered = useMemo(() => {
    const all = [...localTop, ...comments];
    return [...all].sort((a, b) =>
      sort === "top"
        ? b.likeCount - a.likeCount
        : new Date(b.publishedAt) - new Date(a.publishedAt),
    );
  }, [localTop, comments, sort]);

  if (disabled)
    return (
      <p className="mt-6 text-sm text-gray-500">Comments are turned off.</p>
    );
  if (loading)
    return <p className="mt-6 text-sm text-gray-500">Loading comments…</p>;

  const total = comments.length + localTop.length;

  return (
    <div className="mt-6">
      <div className="mb-5 flex items-center gap-6">
        <h2 className="text-lg font-bold text-gray-900">
          {formatCount(total)} Comments
        </h2>
        <button
          onClick={() => setSort((s) => (s === "top" ? "new" : "top"))}
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Sort by: {sort === "top" ? "Top" : "Newest"}
        </button>
      </div>

      <CommentComposer
        placeholder="Add a comment..."
        onSubmit={(text) =>
          setLocalTop((prev) => [makeLocalComment(text), ...prev])
        }
      />

      <div className="mt-6">
        <CommentList comments={ordered} />
      </div>
    </div>
  );
};

export default CommentsSection;
