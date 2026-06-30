import CommentCard from "./CommentCard";

const CommentList = ({ comments, nested = false }) => (
  <div className="space-y-4">
    {comments.map((comment) => (
      <CommentCard key={comment.id} comment={comment} nested={nested} />
    ))}
  </div>
);

export default CommentList;
