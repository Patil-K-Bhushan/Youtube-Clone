import { useState } from "react";

const ShortsCommentInput = ({ onAddComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-2.5 bg-zinc-950 flex gap-2 items-center md:rounded-br-2xl">
      <img src="https://api.dicebear.com/7.x/adventurer/svg?seed=You" alt="Me" className="h-7 w-7 rounded-full bg-zinc-800" />
      <div className="flex flex-1 items-center gap-1.5 rounded-full border border-zinc-850 bg-zinc-900 px-2.5 py-1 focus-within:border-zinc-700">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
        />
        {text.trim() && (
          <button type="submit" className="text-xs font-bold text-blue-500">Post</button>
        )}
      </div>
    </form>
  );
};

export default ShortsCommentInput;
