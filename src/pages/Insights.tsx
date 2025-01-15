import { ArrowRight } from 'lucide-react';

export default function Insights() {
  const posts = [
    {
      title: "The Future of AI in Real Estate Valuation",
      category: "Research Report",
      date: "March 15, 2024",
      description: "An in-depth analysis of how artificial intelligence is transforming property valuation methods and improving accuracy.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      title: "Emerging Trends in Property Technology",
      category: "Market Analysis",
      date: "March 10, 2024",
      description: "Exploring the latest technological innovations shaping the real estate industry and their impact on market dynamics.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      title: "Sustainable Real Estate: A Data-Driven Approach",
      category: "Industry Report",
      date: "March 5, 2024",
      description: "How data analytics and AI are helping property developers and investors make sustainable decisions.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=400"
    }
  ];

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

      {/* Rest of the component remains unchanged */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12">
            {posts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12 space-y-6">
                    <div>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
                        {post.category}
                      </span>
                      <time className="ml-4 text-sm text-gray-500">{post.date}</time>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{post.title}</h2>
                    <p className="text-gray-600">{post.description}</p>
                    <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      Read More <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
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