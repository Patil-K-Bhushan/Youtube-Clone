import React from "react";
import { formatCount } from "../../utils/helpers";
import CommentList from "./CommentLists";

const CommentReplies = ({
  replies,
  repliesOpen,
  setRepliesOpen,
}) => {
  if (replies.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setRepliesOpen((o) => !o)}
        className="mt-2 flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-semibold text-blue-600 hover:bg-blue-50"
      >
        <span className="text-[10px]">{repliesOpen ? "▼" : "▶"}</span>
        {formatCount(replies.length)}{" "}
        {replies.length === 1 ? "reply" : "replies"}
      </button>

      {repliesOpen && (
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
    </>
  );
};

export default CommentReplies;
