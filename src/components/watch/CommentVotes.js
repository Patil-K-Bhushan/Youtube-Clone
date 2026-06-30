import React from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { formatCount } from "../../utils/helpers";

const CommentVotes = ({ vote, score, castVote, onToggleReply }) => (
  <div className="mt-1 flex items-center gap-1 text-gray-600">
    <button
      onClick={() => castVote(1)}
      aria-label="Upvote"
      className={`rounded-full p-1.5 hover:bg-gray-100 ${vote === 1 ? "text-gray-900" : ""}`}
    >
      {vote === 1 ? <AiFillLike size={16} /> : <AiOutlineLike size={16} />}
    </button>
    <span className="min-w-[1.75rem] text-center text-xs font-medium">
      {formatCount(score)}
    </span>
    <button
      onClick={() => castVote(-1)}
      aria-label="Downvote"
      className={`rounded-full p-1.5 hover:bg-gray-100 ${vote === -1 ? "text-gray-900" : ""}`}
    >
      {vote === -1 ? <AiFillDislike size={16} /> : <AiOutlineDislike size={16} />}
    </button>
    <button
      onClick={onToggleReply}
      className="ml-2 rounded-full px-3 py-1 text-xs font-semibold hover:bg-gray-100"
    >
      Reply
    </button>
  </div>
);

export default CommentVotes;
