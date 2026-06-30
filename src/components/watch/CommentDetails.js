import React from "react";
import { timeAgo } from "../../utils/helpers";

const CommentDetails = ({ author, publishedAt, text }) => (
  <>
    <p className="text-sm">
      <span className="font-medium text-gray-900">{author}</span>
      <span className="text-xs text-gray-500 ml-2">
        {timeAgo(publishedAt)}
      </span>
    </p>
    <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-gray-800">
      {text}
    </p>
  </>
);

export default CommentDetails;
