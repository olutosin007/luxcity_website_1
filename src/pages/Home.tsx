import { useState, useEffect } from 'react';
import { Brain, ArrowRight, ChevronLeft, ChevronRight, Building2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBackground from '../components/HeroBackground';
import { getRecentPosts } from '../utils/newsLoader';
import { NewsPost } from '../types/content/NewsPost';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/Slide-1.png",
      title: "Personalised Home Discovery",
      description: "Let AI find your ideal rental match based on your lifestyle and preferences."
    },
    {
      image: "/images/Slide-2.png",
      title: "AI-Powered Market Intelligence",
      description: "Make data-driven decisions with real-time market insights and predictive analytics."
    },
    {
      image: "/images/Slide-3.png",
      title: "Streamline Property Operations",
      description: "Automate workflows and reduce costs with intelligent property management."
    }
  ];

  const [latestPosts, setLatestPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getRecentPosts(3);
      setLatestPosts(posts);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative min-h-[100vh] overflow-hidden flex items-center"
        style={{
          backgroundImage: 'url(/images/Sandwichbot.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Full hero overlay image, above slide, below text */}
        <img
          src="/images/Sandwichtop.png"
          alt="Sandwich Top Overlay"
          className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
          style={{ objectFit: 'cover' }}
        />
        <div 
          className="hidden lg:block absolute top-0 right-0 h-full w-2/3 animate-fade-in" 
          style={{ animationDelay: '0.3s', zIndex: 15 }}
        >
          <div className="relative h-full w-full">
              <img 
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover transition-all duration-700 ease-in-out z-10"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-8 text-center z-30">
                <h3 className="text-lg md:text-xl font-semibold text-white">{slides[currentSlide].title}</h3>
                <p className="text-sm md:text-base text-white/90 mt-2">{slides[currentSlide].description}</p>
              </div>
          </div>
        </div>
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[100vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full pt-[320px] pb-20 md:pt-[140px] md:pb-16">
            <div className="animate-fade-in md:text-center lg:text-left z-30 relative">
              {/* Multimodal AI Tools badge */}
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-strong p-3 rounded-xl border border-white/20 group transition-all duration-300 hover:bg-white/20 mb-6">
                <Brain className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium text-white">Multimodal AI Tools</span>
              </div>
              <h1 className="text-[57px] sm:text-[47px] md:text-[70px] lg:text-[85px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200">
                Real&nbsp;Estate Reimagined
              </h1>
              <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl md:mx-auto lg:mx-0">
                Harnessing advanced techologies to deliver tailored solutions 
                that enhance efficiency and sustainability in real estate 
                and construction.
              </p>
              <div className="mt-8 md:mt-10">
                <Link 
                  to="/solutions" 
                  className="px-6 md:px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] transition-all duration-300 flex items-center inline-flex min-h-[44px] md:mx-auto lg:mx-0"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] sm:text-[38px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4">
              Our Solutions
            </h2>
            <p className="mt-4 text-base md:text-lg text-gray-600">Leveraging technologies to streamline and accelerate every step of property transactions</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                image: "/images/Robot-hands-and-technology.jpg",
                title: "AI-Powered Home Search",
                description: "AI tailors property choices to perfectlyfit your evolving needs and lifestyle.",
                link: "/solutions#ai-search-section"
              },
              {
                image: "/images/Person-using-smartphone.jpg",
                title: "Predictive Market Insights",
                description: "AI-driven analytics for trends, pricing dynamics, and investment strategies.",
                link: "/solutions#market-insights-section"
              },
              {
                image: "/images/Robotic_Person.jpg",
                title: "Virtual Agents and Assistants",
                description: "AI agents seamlessly helping users with a wide variety of complex requests.",
                link: "/solutions#virtual-agents-section"
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <Link 
                  to={feature.link}
                  className="block overflow-hidden rounded-2xl mb-4 aspect-[4/3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC5F12]"
                >
                  <span className="sr-only">View {feature.title}</span>
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}{' '}
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-[#DC5F12] hover:text-[#c45510] transition-colors duration-300"
                  >
                    Learn More <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="h-[600px] relative bg-cover bg-center flex items-center"
        style={{
          backgroundImage: 'url("/images/cta-background.jpg")'
        }}
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="/images/proptii_logo_wht_05.png" 
            alt="Proptii Logo" 
            className="h-24 w-auto mx-auto mb-6" 
          />
          <p className="text-2xl text-white mb-3">
            Introducing Proptii: Your AI-Powered Home Search Solution
          </p>
          <p className="text-lg text-gray-200 mb-8">
            Discover your next home faster, smarter, and stress-free. AI-driven simplicity for renters and buyers seeking their ideal space.
          </p>
          <button className="px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] transition-all duration-300 flex items-center mx-auto">
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>

      {/* News & Insights section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] sm:text-[38px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4">
              News & Insights
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends and insights in real estate technology
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {latestPosts.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-sm font-medium text-indigo-600">{item.category}</span>
                    <span className="text-sm text-gray-500 mx-2">•</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <Link 
                    to={`/insights/${item.slug}`} 
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}