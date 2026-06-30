import { useState } from "react";
import { AiOutlineLike, AiFillLike, AiOutlineDislike } from "react-icons/ai";
import { PiShareFatBold } from "react-icons/pi";
import { MdOutlineFileDownload } from "react-icons/md";
import { useWatch } from "../../context/WatchContext";
import { formatCount } from "../../utils/helpers";

const Pill = ({ children }) => (
  <button className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200">
    {children}
  </button>
);

const ActionBar = () => {
  const { video } = useWatch();
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex shrink-0 items-center gap-2">
      <div className="flex items-center rounded-full bg-gray-100">
        <button
          onClick={() => setLiked((l) => !l)}
          className="flex items-center gap-2 rounded-l-full px-4 py-2 hover:bg-gray-200"
        >
          {liked ? <AiFillLike size={20} /> : <AiOutlineLike size={20} />}
          <span className="text-sm font-medium">
            {formatCount(video.statistics.likeCount)}
          </span>
        </button>
        <div className="h-6 w-px bg-gray-300" />
        <button className="rounded-r-full px-4 py-2 hover:bg-gray-200">
          <AiOutlineDislike size={20} />
        </button>
      </div>
      <Pill>
        <PiShareFatBold size={18} /> Share
      </Pill>
      <Pill>
        <MdOutlineFileDownload size={20} /> Download
      </Pill>
    </div>
  );
};

export default ActionBar;
