import { useState, useEffect } from 'react';
import { User, Comment } from '../../types/comment';

interface CommentFormProps {
  user: User;
  setUserName: (name: string) => void;
  onSubmit: (content: string) => void;
  editing?: Comment | null;
  onCancel?: () => void;
}

export default function CommentForm({ user, setUserName, onSubmit, editing, onCancel }: CommentFormProps) {
  const [content, setContent] = useState(editing ? editing.content : '');
  const [name, setName] = useState(user.name || '');

  useEffect(() => {
    setContent(editing ? editing.content : '');
  }, [editing]);

  useEffect(() => {
    setName(user.name || '');
  }, [user.name]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setUserName(e.target.value);
  };

  return (
    <form
      className="mb-6"
      onSubmit={e => {
        e.preventDefault();
        if (content.trim()) {
          onSubmit(content);
          setContent('');
        }
      }}
    >
      <label className="block mb-2 font-medium">Your Name</label>
      <input
        value={name}
        onChange={handleNameChange}
        placeholder="Input your name here"
        className="w-full mb-3 px-3 py-2 border rounded focus:outline-none bg-gray-50"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write your comment..."
        className="w-full mb-3 px-3 py-2 border rounded focus:outline-none min-h-[80px]"
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {editing ? 'Update' : 'Post'} Comment
        </button>
        {editing && onCancel && (
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 