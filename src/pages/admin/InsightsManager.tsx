import { useState, useEffect } from 'react';
import { NewsPost } from '../../types/content/NewsPost';
import { getAllPosts, createPost, updatePost, deletePost } from '../../utils/newsLoader';
import { ArrowRight, Edit, Trash, Plus } from 'lucide-react';

export default function InsightsManager() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    date: '',
    image: '',
    content: '',
    author: {
      name: '',
      role: '',
      avatar: ''
    },
    tags: '',
    readingTime: ''
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const allPosts = await getAllPosts();
    setPosts(allPosts);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPost: NewsPost = {
        id: selectedPost?.id || Date.now().toString(),
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };

      if (isEditing) {
        await updatePost(newPost);
      } else {
        await createPost(newPost);
      }

      await loadPosts();
      resetForm();
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post. Please try again.');
    }
  };

  const handleEdit = (post: NewsPost) => {
    setSelectedPost(post);
    setIsEditing(true);
    setFormData({
      title: post.title,
      category: post.category,
      description: post.description,
      date: post.date,
      image: post.image,
      content: post.content,
      author: {
        name: post.author?.name || '',
        role: post.author?.role || '',
        avatar: post.author?.avatar || ''
      },
      tags: post.tags?.join(', ') || '',
      readingTime: post.readingTime || ''
    });
  };

  const handleDelete = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        await loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setSelectedPost(null);
    setIsEditing(false);
    setFormData({
      title: '',
      category: '',
      description: '',
      date: '',
      image: '',
      content: '',
      author: {
        name: '',
        role: '',
        avatar: ''
      },
      tags: '',
      readingTime: ''
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Insights Manager</h1>
        <button
          onClick={() => {
            resetForm();
            setIsEditing(false);
          }}
          className="bg-[#DC5F12] text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Post
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? 'Edit Post' : 'Create New Post'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={10}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12] font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Author Name</label>
              <input
                type="text"
                name="author.name"
                value={formData.author.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Author Role</label>
              <input
                type="text"
                name="author.role"
                value={formData.author.role}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Author Avatar URL</label>
              <input
                type="text"
                name="author.avatar"
                value={formData.author.avatar}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Reading Time</label>
              <input
                type="text"
                name="readingTime"
                value={formData.readingTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#DC5F12] focus:ring-[#DC5F12]"
                placeholder="e.g., 5 min read"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#DC5F12] text-white rounded-md hover:bg-[#c45510]"
              >
                {isEditing ? 'Update Post' : 'Create Post'}
              </button>
            </div>
          </form>
        </div>

        {/* Posts List Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Published Posts</h2>
          {posts.map(post => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
              <div>
                <h3 className="font-medium">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 