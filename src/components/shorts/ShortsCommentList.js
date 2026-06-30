import { MdOutlineThumbUp } from "react-icons/md";

const ShortsCommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="flex h-32 flex-col items-center justify-center text-center">
        <p className="text-xs text-zinc-400 font-medium">No comments yet.</p>
      </div>
    );
  }

  return comments.map((c) => (
    <div key={c.id} className="flex gap-2.5 text-xs">
      <img
        src={c.authorProfileImageUrl}
        alt={c.authorDisplayName}
        className="h-8 w-8 rounded-full bg-zinc-800 object-cover flex-shrink-0"
        onError={(e) => { e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${c.authorDisplayName}`; }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5">
          <span className="font-semibold text-zinc-300 text-[11px] truncate">{c.authorDisplayName}</span>
          <span className="text-[9px] text-zinc-500">{c.publishedAt}</span>
        </div>
        <p className="mt-0.5 text-zinc-300 text-xs break-words">{c.textDisplay}</p>
        <div className="mt-1 flex items-center gap-3 text-[10px] text-zinc-500">
          <button className="flex items-center gap-0.5 hover:text-zinc-300">
            <MdOutlineThumbUp className="text-[12px]" />
            <span>{c.likeCount || 0}</span>
          </button>
        </div>
      </div>
    </div>
  ));
};

export default ShortsCommentList;
