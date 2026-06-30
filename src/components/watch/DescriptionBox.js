import { useState } from "react";
import { useWatch } from "../../context/WatchContext";
import { formatCount, timeAgo } from "../../utils/helpers";

const DescriptionBox = () => {
  const { video } = useWatch();
  const [expanded, setExpanded] = useState(false);
  if (!video) return null;

  const { description, publishedAt } = video.snippet;

  return (
    <div className="mt-4 rounded-xl bg-gray-100 p-3 text-sm">
      <p className="font-semibold text-gray-900">
        {formatCount(video.statistics.viewCount)} views · {timeAgo(publishedAt)}
      </p>
      <p
        className={`mt-1 whitespace-pre-wrap text-gray-800 ${expanded ? "" : "line-clamp-2"}`}
      >
        {description}
      </p>
      {description?.length > 120 && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-1 font-medium text-gray-600 hover:text-gray-900"
        >
          {expanded ? "Show less" : "...more"}
        </button>
      )}
    </div>
  );
};

export default DescriptionBox;
