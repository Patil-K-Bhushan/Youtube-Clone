import { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineLike, AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { useWatch } from "../../context/WatchContext";
import { formatCount } from "../../utils/helpers";
import { rateVideo } from "../../utils/youtubeActions";

const ActionBar = () => {
  const { video } = useWatch();
  const accessToken = useSelector((store) => store.auth.accessToken);
  const [liked, setLiked] = useState(false);

  const toggleLike = async () => {
    const next = !liked;
    setLiked(next); 
    if (!accessToken) return;
    try { await rateVideo(accessToken, video.id, next ? "like" : "none"); }
    catch (err) { console.error("Rate failed:", err); setLiked(!next); }
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      <div className="flex items-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-zinc-100">
        <button onClick={toggleLike} className="flex items-center gap-2 rounded-l-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700">
          {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          <span className="text-sm font-medium">{formatCount(video.statistics.likeCount)}</span>
        </button>
        <div className="h-6 w-px bg-gray-300 dark:bg-zinc-700" />
        <button className="rounded-r-full px-4 py-2 hover:bg-gray-200 dark:hover:bg-zinc-700"><AiOutlineDislike size={20} /></button>
      </div>
    </div>
  );
};

export default ActionBar;