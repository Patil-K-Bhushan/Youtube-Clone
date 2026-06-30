import { Link } from "react-router-dom";
import { formatCount } from "../../utils/helpers";

const SuggestionCard = ({ video }) => {
  const { title, channelTitle, thumbnails } = video.snippet;

  return (
    <Link to={`/watch?v=${video.id}`} className="flex gap-2">
      <img
        src={thumbnails.medium.url}
        alt={title}
        className="aspect-video w-40 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {title}
        </h3>
        <p className="mt-1 truncate text-xs text-gray-600">{channelTitle}</p>
        <p className="text-xs text-gray-600">
          {formatCount(video.statistics.viewCount)} views
        </p>
      </div>
    </Link>
  );
};

export default SuggestionCard;
