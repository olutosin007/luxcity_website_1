import { Comment, User } from '../../types/comment';

interface CommentItemProps {
  comment: Comment;
  user: User;
  onEdit: (comment: Comment) => void;
  onDelete: (id: string) => void;
}

export default function CommentItem({ comment, user, onEdit, onDelete }: CommentItemProps) {
  const isOwner = comment.userId === user.id;
  return (
    <div className="bg-gray-50 rounded p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="font-semibold text-gray-800">{user.name}</div>
        <div className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()} {comment.isEdited && <span>(edited)</span>}
        </div>
      </div>
      <div className="text-gray-700 mb-2">{comment.content}</div>
      {isOwner && (
        <div className="flex gap-2">
          <button
            className="text-indigo-600 hover:underline text-sm"
            onClick={() => onEdit(comment)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:underline text-sm"
            onClick={() => onDelete(comment.id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
} 