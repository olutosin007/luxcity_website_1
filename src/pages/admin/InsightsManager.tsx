import { useState, useEffect } from 'react';
import { NewsPost } from '../../types/content/NewsPost';
import { getAllPosts, createPost, updatePost, deletePost, getSeedPosts, seedInsightsFromBackup } from '../../utils/newsLoader';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Edit, Trash, Plus, LogOut, Database, Search, ChevronDown, ChevronRight, X, ExternalLink } from 'lucide-react';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function parsePostDate(dateStr: string): { year: number; month: number } | null {
  const d = new Date(dateStr.replace(/\//g, '-'));
  if (Number.isNaN(d.getTime())) return null;
  return { year: d.getFullYear(), month: d.getMonth() };
}

function groupPostsByYearMonth(postsList: NewsPost[]): { year: string; months: { monthKey: string; monthLabel: string; monthIndex: number; posts: NewsPost[] }[] }[] {
  const byYear = new Map<string, Map<number, NewsPost[]>>();
  for (const post of postsList) {
    const parsed = parsePostDate(post.date);
    if (!parsed) continue;
    const { year, month } = parsed;
    const y = String(year);
    if (!byYear.has(y)) byYear.set(y, new Map());
    const monthMap = byYear.get(y)!;
    if (!monthMap.has(month)) monthMap.set(month, []);
    monthMap.get(month)!.push(post);
  }
  const result: { year: string; months: { monthKey: string; monthLabel: string; monthIndex: number; posts: NewsPost[] }[] }[] = [];
  const years = Array.from(byYear.keys()).sort((a, b) => Number(b) - Number(a));
  for (const year of years) {
    const monthMap = byYear.get(year)!;
    const months = Array.from(monthMap.entries())
      .map(([monthIndex, posts]) => ({
        monthKey: `${year}-${monthIndex}`,
        monthLabel: `${MONTH_NAMES[monthIndex]} ${year}`,
        monthIndex,
        posts: posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      }))
      .sort((a, b) => b.monthIndex - a.monthIndex);
    result.push({ year, months });
  }
  return result;
}

export default function InsightsManager() {
  const { user, signOut, isConfigured } = useAuth();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [filterSearch, setFilterSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [expandedMonthKey, setExpandedMonthKey] = useState<string | null>(null);

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

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      !filterSearch.trim() ||
      post.title.toLowerCase().includes(filterSearch.toLowerCase()) ||
      (post.description && post.description.toLowerCase().includes(filterSearch.toLowerCase())) ||
      (post.category && post.category.toLowerCase().includes(filterSearch.toLowerCase()));
    const matchesCategory = !filterCategory || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean))).sort();

  const clearFilters = () => {
    setFilterSearch('');
    setFilterCategory('');
  };

  const hasActiveFilters = !!filterSearch.trim() || !!filterCategory;

  const yearMonthGroups = groupPostsByYearMonth(filteredPosts);
  const availableYears = yearMonthGroups.map(g => g.year);

  useEffect(() => {
    if (availableYears.length > 0 && !selectedYear) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears.length, selectedYear]);

  const selectedYearData = yearMonthGroups.find(g => g.year === selectedYear);

  const handleSeedFromBackup = async () => {
    if (!window.confirm('Add all backup posts to Firestore? Existing posts with the same slug will be merged.')) return;
    setSeeding(true);
    try {
      const seedPosts = getSeedPosts();
      const count = await seedInsightsFromBackup(seedPosts);
      alert(`Seeded ${count} posts to Firestore.`);
      await loadPosts();
    } catch (err) {
      console.error('Seed failed:', err);
      alert('Seed failed. Check console.');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="pt-28 md:pt-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!isConfigured && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800" role="alert">
          <p className="font-medium">Firebase not detected — using local data only.</p>
          <p className="text-sm mt-1">
            To use Firestore and the login: add <code className="bg-amber-100 px-1 rounded">.env</code> in the project root (same folder as <code className="bg-amber-100 px-1 rounded">package.json</code>) with your <code className="bg-amber-100 px-1 rounded">VITE_FIREBASE_*</code> variables (copy from <code className="bg-amber-100 px-1 rounded">.env.example</code>), then <strong>stop and restart</strong> the dev server (<code className="bg-amber-100 px-1 rounded">npm run dev</code>).
          </p>
        </div>
      )}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Insights Manager</h1>
        <div className="flex items-center gap-2">
          {isConfigured && (
            <button
              type="button"
              onClick={handleSeedFromBackup}
              disabled={seeding}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
              title="One-time: add backup posts to Firestore"
            >
              <Database className="w-4 h-4" />
              {seeding ? 'Seeding…' : 'Seed from backup'}
            </button>
          )}
          {isConfigured && user && (
            <button
              type="button"
              onClick={async () => {
                try {
                  await signOut();
                } catch (e) {
                  console.error('Sign out failed:', e);
                  alert('Sign out failed. Try again.');
                }
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          )}
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Published Posts</h2>

          {/* Search & category filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, description, category..."
                value={filterSearch}
                onChange={e => setFilterSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#DC5F12] focus:border-[#DC5F12]"
              />
            </div>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-[#DC5F12] focus:border-[#DC5F12] bg-white min-w-[140px]"
            >
              <option value="">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Year buttons */}
          {availableYears.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600 self-center mr-1">Year:</span>
              {availableYears.map(year => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedYear === year
                      ? 'bg-[#DC5F12] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          )}

          {/* Month accordions for selected year */}
          {selectedYearData && selectedYearData.months.length > 0 ? (
            <div className="space-y-2">
              {selectedYearData.months.map(({ monthKey, monthLabel, posts: monthPosts }) => {
                const isExpanded = expandedMonthKey === monthKey;
                return (
                  <div
                    key={monthKey}
                    className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedMonthKey(isExpanded ? null : monthKey)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                      <span className="font-medium text-gray-900">{monthLabel}</span>
                      <span className="text-sm text-gray-500">
                        {monthPosts.length} post{monthPosts.length !== 1 ? 's' : ''}
                      </span>
                    </button>
                    {isExpanded && (
                      <div className="border-t border-gray-200 bg-gray-50/80">
                        <ul className="divide-y divide-gray-200">
                          {monthPosts.map(post => (
                            <li key={post.id} className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-gray-100/80">
                              <span className="font-medium text-gray-900 truncate flex-1 min-w-0">{post.title}</span>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <a
                                  href={`/insights/${encodeURIComponent(post.slug)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-sm text-gray-700 hover:text-[#DC5F12] border border-gray-300 rounded-md hover:bg-white"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  View post
                                </a>
                                <button
                                  onClick={() => handleEdit(post)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                                >
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(post.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                >
                                  <Trash className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              {filteredPosts.length === 0 ? 'No posts match the filters.' : 'No posts for the selected year.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 