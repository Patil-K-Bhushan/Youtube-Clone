import React from "react";
import { formatCount } from "../../utils/helpers";

const CommentsHeader = ({ total, sort, onToggleSort }) => (
  <div className="mb-5 flex items-center gap-6">
    <h2 className="text-lg font-bold text-gray-900">
      {formatCount(total)} Comments
    </h2>
    <button
      onClick={onToggleSort}
      className="text-sm font-medium text-gray-600 hover:text-gray-900"
    >
      Sort by: {sort === "top" ? "Top" : "Newest"}
    </button>
  </div>
);

export default CommentsHeader;
