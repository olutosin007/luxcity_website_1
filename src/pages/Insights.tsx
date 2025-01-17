import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NewsPost } from '../types/content/NewsPost';
import { getAllPosts } from '../utils/newsLoader';
import ReactMarkdown from 'react-markdown';

export default function Insights() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  console.log('Current posts state:', posts);
  console.log('Loading state:', loading);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC5F12]"></div>
      </div>
    );
  }

  return (
    <div>
      <section 
        className="h-[80vh] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-[56px] font-archivo font-bold text-white mb-6">
              Insights
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Expert analysis, research, and perspectives on real estate technology
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {posts.map((post) => (
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