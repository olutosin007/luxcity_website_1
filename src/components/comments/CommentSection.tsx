import { useEffect, useState } from 'react';
import { getUser, setUserName } from '../../utils/userStorage';
import { getComments, addComment, updateComment, deleteComment } from '../../utils/commentStorage';
import { Comment, User } from '../../types/comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const FILTERS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'edited', label: 'Edited Only' },
];

export default function CommentSection({ postId }: { postId: string }) {
  const [user, setUser] = useState<User>(getUser());
  const [comments, setComments] = useState<Comment[]>([]);
  const [editing, setEditing] = useState<Comment | null>(null);
  const [filter, setFilter] = useState('newest');

  useEffect(() => {
    getComments(postId).then(setComments);
  }, [postId]);

  const handleAdd = async (content: string) => {
    const comment: Comment = {
      id: crypto.randomUUID(),
      postId,
      userId: user.id,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      isEdited: false,
    };
    await addComment(comment);
    setComments(await getComments(postId));
  };

  const handleEdit = async (id: string, content: string) => {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      comment.content = content;
      comment.updatedAt = new Date();
      comment.isEdited = true;
      await updateComment(comment);
      setComments(await getComments(postId));
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteComment(id);
    setComments(await getComments(postId));
  };

  // Update user name handler
  const handleNameChange = (name: string) => {
    setUserName(name);
    setUser(u => ({ ...u, name }));
  };

  // Filter and sort comments
  let filteredComments = [...comments];
  if (filter === 'edited') {
    filteredComments = filteredComments.filter(c => c.isEdited);
  }
  if (filter === 'newest') {
    filteredComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (filter === 'oldest') {
    filteredComments.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-3 py-2 text-sm"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            {FILTERS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <CommentForm
        user={user}
        setUserName={handleNameChange}
        onSubmit={editing ? (content) => handleEdit(editing.id, content) : handleAdd}
        editing={editing}
        onCancel={() => setEditing(null)}
      />
      <CommentList
        comments={filteredComments}
        user={user}
        onEdit={setEditing}
        onDelete={handleDelete}
      />
    </div>
  );
} 