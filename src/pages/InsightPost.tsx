import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NewsPost } from '../types/content/NewsPost';
import { getPostBySlug } from '../utils/newsLoader';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Twitter, Facebook, Linkedin, MessageCircle, Link as LinkIcon } from 'lucide-react';
import CommentSection from '../components/comments/CommentSection';

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

  // Generate share URLs
  const postUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(post.title);
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareLinks = [
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(postUrl)}&title=${shareText}`,
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${shareText}`,
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(postUrl)}`,
      icon: <MessageCircle className="w-5 h-5 transform scale-x-[-1]" />,
    },
  ];

  // Category color mapping
  const categoryColorMap: Record<string, string> = {
    'Industry News': 'text-blue-600 bg-blue-50',
    'Company Updates': 'text-green-600 bg-green-50',
    'Product News': 'text-purple-700 bg-purple-50',
  };

  return (
    <div>
      {/* Hero Section - rearranged for clean, left-aligned layout */}
      <section className="pt-32 pb-4 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Category Badge & Back Button */}
          <div className="flex items-center justify-between mb-6">
            <div
              className={`inline-block px-3 py-1 text-sm font-medium rounded-full uppercase tracking-wide ${categoryColorMap[post.category] || 'text-gray-500 bg-gray-100'}`}
            >
              {post.category}
            </div>
            <button
              onClick={() => navigate('/insights')}
              className="flex items-center text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Insights
            </button>
          </div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-archivo font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          {/* Author, Date, Share Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
              {post.author?.avatar && (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}
              <span className="font-medium text-gray-900">{post.author?.name}</span>
              <span className="text-gray-400">|</span>
              <time className="text-gray-600">{post.date}</time>
            </div>
            {/* Social Share Icons + Copy Link */}
            <div className="flex items-center gap-3">
              {shareLinks.map(link => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-400 hover:text-[#DC5F12] transition-colors group"
                  title={`Share on ${link.name}`}
                >
                  {React.cloneElement(link.icon, { className: 'w-4 h-4 group-hover:text-[#DC5F12] transition-colors' })}
                  <span className="sr-only">{link.name}</span>
                </a>
              ))}
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-400 hover:text-[#DC5F12] transition-colors group"
                title="Copy link"
              >
                <LinkIcon className="w-4 h-4 group-hover:text-[#DC5F12] transition-colors" />
                <span className="sr-only">Copy link</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Post Image */}
      {post.image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      )}

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Comment Section */}
          {post && <CommentSection postId={post.id} />}
        </div>
      </section>
    </div>
  );
} 