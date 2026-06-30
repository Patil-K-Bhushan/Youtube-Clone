import React from "react";

const CommentAvatar = ({ author, avatar }) => {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={author}
        className="h-9 w-9 shrink-0 rounded-full"
      />
    );
  }

  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-sm font-semibold text-white">
      {author.charAt(0).toUpperCase()}
    </div>
  );
};

export default CommentAvatar;
