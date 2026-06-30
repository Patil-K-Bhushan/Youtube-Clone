import { useState } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { formatCount, timeAgo, makeLocalComment } from "../../utils/helpers";
import CommentList from "./CommentLists";
import CommentComposer from "./CommentComposer";

const CommentCard = ({ comment, nested = false }) => {
  const [vote, setVote] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(nested);
  const [localReplies, setLocalReplies] = useState([]);

  const replies = [...localReplies, ...comment.replies];
  const score = (comment.likeCount ?? 0) + vote;
  const castVote = (dir) => setVote((v) => (v === dir ? 0 : dir));

  const addReply = (text) => {
    setLocalReplies((prev) => [makeLocalComment(text), ...prev]);
    setShowReply(false);
    setRepliesOpen(true);
  };

  return (
    <div className="flex gap-3">
      {comment.avatar ? (
        <img
          src={comment.avatar}
          alt={comment.author}
          className="h-9 w-9 shrink-0 rounded-full"
        />
      ) : (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-sm font-semibold text-white">
          {comment.author.charAt(0).toUpperCase()}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-medium text-gray-900">{comment.author}</span>
          <span className="text-xs text-gray-500">
            {timeAgo(comment.publishedAt)}
          </span>
        </p>
        <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-gray-800">
          {comment.text}
        </p>

        <div className="mt-1 flex items-center gap-1 text-gray-600">
          <button
            onClick={() => castVote(1)}
            aria-label="Upvote"
            className={`rounded-full p-1.5 hover:bg-gray-100 ${vote === 1 ? "text-gray-900" : ""}`}
          >
            {vote === 1 ? (
              <AiFillLike size={16} />
            ) : (
              <AiOutlineLike size={16} />
            )}
          </button>
          <span className="min-w-[1.75rem] text-center text-xs font-medium">
            {formatCount(score)}
          </span>
          <button
            onClick={() => castVote(-1)}
            aria-label="Downvote"
            className={`rounded-full p-1.5 hover:bg-gray-100 ${vote === -1 ? "text-gray-900" : ""}`}
          >
            {vote === -1 ? (
              <AiFillDislike size={16} />
            ) : (
              <AiOutlineDislike size={16} />
            )}
          </button>
          <button
            onClick={() => setShowReply((s) => !s)}
            className="ml-2 rounded-full px-3 py-1 text-xs font-semibold hover:bg-gray-100"
          >
            Reply
          </button>
        </div>

        {showReply && (
          <div className="mt-2">
            <CommentComposer
              onSubmit={addReply}
              onCancel={() => setShowReply(false)}
              autoFocus
            />
          </div>
        )}

        {replies.length > 0 && (
          <button
            onClick={() => setRepliesOpen((o) => !o)}
            className="mt-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold text-blue-600 hover:bg-blue-50"
          >
            <span className="text-[10px]">{repliesOpen ? "▼" : "▶"}</span>
            {formatCount(replies.length)}{" "}
            {replies.length === 1 ? "reply" : "replies"}
          </button>
        )}

        {repliesOpen && replies.length > 0 && (
          <div className="mt-2 flex">
            <button
              onClick={() => setRepliesOpen(false)}
              aria-label="Collapse thread"
              className="group flex w-6 shrink-0 cursor-pointer justify-center"
            >
              <span className="w-0.5 rounded bg-gray-200 transition-colors group-hover:bg-gray-900" />
            </button>
            <div className="min-w-0 flex-1">
              <CommentList comments={replies} nested />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
