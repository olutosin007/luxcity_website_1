import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsPost } from '../types/content/NewsPost';
import { getPostBySlug } from '../utils/newsLoader';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft } from 'lucide-react';

export default function InsightPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        const postData = await getPostBySlug(slug);
        if (!postData) {
          navigate('/insights');
          return;
        }
        setPost(postData);
      } catch (error) {
        console.error('Error loading post:', error);
        navigate('/insights');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC5F12]"></div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-full">
                {post.category}
              </span>
              <time className="text-sm text-gray-300">{post.date}</time>
              {post.readingTime && (
                <span className="text-sm text-gray-300">{post.readingTime}</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-archivo font-bold text-white mb-6">
              {post.title}
            </h1>
            {post.author && (
              <div className="flex items-center justify-center space-x-4">
                {post.author.avatar && (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}
                <div className="text-left">
                  <div className="font-medium text-white">{post.author.name}</div>
                  {post.author.role && (
                    <div className="text-sm text-gray-300">{post.author.role}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/insights')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Insights
          </button>
          
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 