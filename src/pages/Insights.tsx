import { ArrowRight, Search, Calendar, Filter, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { NewsPost } from '../types/content/NewsPost';
import { getAllPosts } from '../utils/newsLoader';
import ReactMarkdown from 'react-markdown';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Insights() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const categoryOptions = [
    { value: '', label: 'All Categories', color: '', icon: <Filter className="w-4 h-4 mr-2 text-gray-400" /> },
    { value: 'Industry News', label: 'Industry News', color: 'text-blue-600', dot: 'bg-blue-600' },
    { value: 'Company Updates', label: 'Company Updates', color: 'text-green-600', dot: 'bg-green-600' },
    { value: 'Product News', label: 'Product News', color: 'text-purple-700', dot: 'bg-purple-700' },
  ];

  useEffect(() => {
    const loadPosts = async () => {
      try {
        console.log('Starting to load posts...');
        const allPosts = await getAllPosts();
        console.log('Loaded posts:', allPosts);
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();

    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  console.log('Current posts state:', posts);
  console.log('Loading state:', loading);

  // Filtered posts logic
  const filteredPosts = posts.filter(post => {
    // Search term filter
    const matchesSearch =
      searchTerm.trim() === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.category && post.category.toLowerCase().includes(searchTerm.toLowerCase()));
    // Date filter
    const postDate = new Date(post.date);
    const matchesStart = !startDate || postDate >= startDate;
    const matchesEnd = !endDate || postDate <= endDate;
    // Category filter
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesStart && matchesEnd && matchesCategory;
  });

  // Clear filters handler
  const clearFilters = () => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
    setSelectedCategory('');
  };

  const isFilterActive = searchTerm || startDate || endDate || selectedCategory;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC5F12]"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative h-[80vh] overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/team-discussion-720.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[85px] font-archivo font-light leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 mb-6 animate-fade-in">
              Insights
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Expert analysis, research, and perspectives on real estate technology
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Section */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl max-w-7xl mx-auto -mt-16 mb-12 px-6 py-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 animate-fade-in">
            {/* Search Input */}
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search className="w-5 h-5" /></span>
              <input
                type="text"
                placeholder="Search insights..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:outline-none text-gray-700 bg-white"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            {/* Date Range */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="date"
                  className="pl-4 pr-2 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white min-w-[140px]"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={e => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                  placeholder="Start date"
                />
              </div>
              <span className="text-gray-500">to</span>
              <div className="relative">
                <input
                  type="date"
                  className="pl-4 pr-2 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white min-w-[140px]"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  min={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={e => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                  placeholder="End date"
                />
              </div>
            </div>
            {/* Category Dropdown */}
            <div className="relative min-w-[180px]">
              <button
                type="button"
                className="w-full flex items-center px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Filter className="w-5 h-5 mr-2 text-gray-400" />
                <span className={categoryOptions.find(opt => opt.value === selectedCategory)?.color || 'text-gray-700'}>
                  {categoryOptions.find(opt => opt.value === selectedCategory)?.label}
                </span>
                <svg className="ml-auto w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {dropdownOpen && (
                <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  {categoryOptions.map(opt => (
                    <button
                      key={opt.value}
                      className={`w-full flex items-center px-4 py-2 hover:bg-gray-100 transition text-left ${opt.color}`}
                      onClick={() => { setSelectedCategory(opt.value); setDropdownOpen(false); }}
                      type="button"
                    >
                      {opt.dot && <span className={`inline-block w-2 h-2 rounded-full mr-2 ${opt.dot}`}></span>}
                      {opt.icon || null}
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Clear Filters Button */}
            <button
              type="button"
              onClick={clearFilters}
              className={`flex items-center px-4 py-3 rounded-lg border font-medium transition
                ${isFilterActive ? 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
              disabled={!isFilterActive}
            >
              <XCircle className={`w-5 h-5 mr-2 ${isFilterActive ? 'text-gray-400' : 'text-gray-300'}`} />
              {isFilterActive ? 'Clear Filters' : 'No filters applied'}
            </button>
          </div>
          <div className="grid grid-cols-1 gap-12">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
                          {post.category}
                        </span>
                        <time className="ml-4 text-sm text-gray-500">{post.date}</time>
                      </div>
                      {post.readingTime && (
                        <span className="text-sm text-gray-500">{post.readingTime}</span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
                    <p className="text-gray-600">{post.description}</p>
                    {post.author && (
                      <div className="flex items-center space-x-4">
                        {post.author.avatar && (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{post.author.name}</div>
                          {post.author.role && (
                            <div className="text-sm text-gray-500">{post.author.role}</div>
                          )}
                        </div>
                      </div>
                    )}
                    <Link
                      to={`/insights/${post.slug}`}
                      className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Read More <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}