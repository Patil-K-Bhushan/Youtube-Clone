import { useState } from "react";
import { makeLocalComment } from "../../utils/helpers";
import CommentComposer from "./CommentComposer";
import CommentAvatar from "./CommentAvatar";
import CommentDetails from "./CommentDetails";
import CommentVotes from "./CommentVotes";
import CommentReplies from "./CommentReplies";

const CommentCard = ({ comment, nested = false }) => {
  const [vote, setVote] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [repliesOpen, setRepliesOpen] = useState(nested);
  const [localReplies, setLocalReplies] = useState([]);

  const replies = [...localReplies, ...comment.replies];
  const score = (comment.likeCount ?? 0) + vote;
  const castVote = (dir) => setVote((v) => (v === dir ? 0 : dir));

  const addReply = (text) => {
    setLocalReplies((prev) => [makeLocalComment(text), ...prev]);
    setShowReply(false);
    setRepliesOpen(true);
  };

  return (
    <div className="flex gap-3">
      <CommentAvatar author={comment.author} avatar={comment.avatar} />
      <div className="min-w-0 flex-1">
        <CommentDetails
          author={comment.author}
          publishedAt={comment.publishedAt}
          text={comment.text}
        />
        <CommentVotes
          vote={vote}
          score={score}
          castVote={castVote}
          onToggleReply={() => setShowReply((s) => !s)}
        />
        {showReply && (
          <div className="mt-2">
            <CommentComposer
              onSubmit={addReply}
              onCancel={() => setShowReply(false)}
              autoFocus
            />
          </div>
        )}
        <CommentReplies
          replies={replies}
          repliesOpen={repliesOpen}
          setRepliesOpen={setRepliesOpen}
        />
      </div>
    </div>
  );
};

export default CommentCard;
