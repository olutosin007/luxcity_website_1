import { Comment, User } from '../../types/comment';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  user: User;
  onEdit: (comment: Comment) => void;
  onDelete: (id: string) => void;
}

export default function CommentList({ comments, user, onEdit, onDelete }: CommentListProps) {
  if (!comments.length) {
    return <div className="text-gray-500 text-center py-6">No comments yet. Be the first to comment!</div>;
  }
  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
} 