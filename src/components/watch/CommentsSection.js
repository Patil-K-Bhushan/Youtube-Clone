import { useState, useMemo } from "react";
import { useWatch } from "../../context/WatchContext";
import useComments from "../../hooks/useComments";
import CommentList from "./CommentLists";
import CommentComposer from "./CommentComposer";
import CommentsHeader from "./CommentsHeader";
import { makeLocalComment } from "../../utils/helpers";

const CommentsSection = () => {
  const { videoId } = useWatch();
  const { comments, disabled, loading } = useComments(videoId);
  const [localTop, setLocalTop] = useState([]);
  const [sort, setSort] = useState("top");
  const [isCollapsed, setIsCollapsed] = useState(true);

  const ordered = useMemo(() => {
    const all = [...localTop, ...comments];
    return [...all].sort((a, b) =>
      sort === "top"
        ? b.likeCount - a.likeCount
        : new Date(b.publishedAt) - new Date(a.publishedAt)
    );
  }, [localTop, comments, sort]);

  if (disabled) {
    return <p className="mt-6 text-sm text-gray-500">Comments are turned off.</p>;
  }
  if (loading) {
    return <p className="mt-6 text-sm text-gray-500">Loading comments…</p>;
  }

  const total = comments.length + localTop.length;
  const toggleSort = () => setSort((s) => (s === "top" ? "new" : "top"));

  return (
    <div className="mt-6 border border-gray-250 dark:border-zinc-800 rounded-xl p-4 md:border-none md:p-0">
      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="flex items-center justify-between cursor-pointer md:cursor-default"
      >
        <CommentsHeader total={total} sort={sort} onToggleSort={toggleSort} />
        <button className="text-xs font-bold text-blue-600 dark:text-blue-400 md:hidden">
          {isCollapsed ? "Show Comments" : "Hide Comments"}
        </button>
      </div>

      <div className={`${isCollapsed ? "hidden md:block" : "block"} mt-4`}>
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
    </div>
  );
};

export default CommentsSection;
