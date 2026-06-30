import { useState } from "react";
import { MdClose } from "react-icons/md";
import useComments from "../../hooks/useComments";
import ShortsCommentList from "./ShortsCommentList";
import ShortsCommentInput from "./ShortsCommentInput";

const ShortsComments = ({ videoId, onClose }) => {
  const { comments: apiComments, disabled, loading } = useComments(videoId);
  const [localComments, setLocalComments] = useState([]);

  const allComments = [...localComments, ...apiComments.map(c => ({
    id: c.id, authorDisplayName: c.author,
    authorProfileImageUrl: c.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${c.author}`,
    textDisplay: c.text, likeCount: c.likeCount, publishedAt: new Date(c.publishedAt).toLocaleDateString() || "some time ago"
  }))];

  if (disabled) return <p className="p-4 text-xs text-zinc-500">Comments are turned off.</p>;

  return (
    <div className="flex h-full w-full flex-col bg-zinc-900 text-zinc-100 shadow-2xl md:rounded-r-2xl border-l border-zinc-850">
      <div className="flex items-center justify-between border-b border-zinc-805 px-4 py-3 bg-zinc-900">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-zinc-100">Comments</span>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-zinc-400">{allComments.length}</span>
        </div>
        <button onClick={onClose} className="rounded-full p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
          <MdClose className="text-lg" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 no-scrollbar">
        {loading && allComments.length === 0 ? <p className="text-xs text-zinc-500">Loading...</p> : <ShortsCommentList comments={allComments} />}
      </div>
      <ShortsCommentInput onAddComment={(text) => setLocalComments(prev => [{
        id: "my-comment-" + Date.now(), authorDisplayName: "You",
        authorProfileImageUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=You",
        textDisplay: text, likeCount: 0, publishedAt: "Just now"
      }, ...prev])} />
    </div>
  );
};

export default ShortsComments;
