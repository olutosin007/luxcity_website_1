import { useState, useEffect } from 'react';
import { Brain, ArrowRight, ChevronLeft, ChevronRight, Building2, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBackground from '../components/HeroBackground';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=600",
      title: "Personalised Home Discovery",
      description: "Let AI find your ideal rental match based on your lifestyle and preferences."
    },
    {
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=600",
      title: "AI-Powered Market Intelligence",
      description: "Make data-driven decisions with real-time market insights and predictive analytics."
    },
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=600",
      title: "Streamline Property Operations",
      description: "Automate workflows and reduce costs with intelligent property management."
    }
  ];

  const news = [
    {
      title: "The Future of AI in Real Estate Valuation",
      category: "Research Report",
      date: "March 15, 2024",
      description: "An in-depth analysis of how artificial intelligence is transforming property valuation methods and improving accuracy.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400",
      slug: "ai-valuation-future"
    },
    {
      title: "Emerging Trends in Property Technology",
      category: "Market Analysis",
      date: "March 10, 2024",
      description: "Exploring the latest technological innovations shaping the real estate industry and their impact on market dynamics.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=400",
      slug: "property-tech-trends"
    },
    {
      title: "Sustainable Real Estate: A Data-Driven Approach",
      category: "Industry Report",
      date: "March 5, 2024",
      description: "How data analytics and AI are helping property developers and investors make sustainable decisions.",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=400",
      slug: "sustainable-real-estate-data"
    }
  ];

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
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <HeroBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
            <div className="animate-fade-in pt-20">
              <h1 className="text-[75px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200">
                AI-Powered Solutions for Real&nbsp;Estate
              </h1>
              <p className="mt-6 text-xl text-gray-200 leading-relaxed">
                Harnessing cutting-edge Generative AI to deliver tailored solutions that enhance efficiency and sustainability in real estate and construction.
              </p>
              <div className="mt-10">
                <Link 
                  to="/solutions" 
                  className="px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] transition-all duration-300 flex items-center inline-flex"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-strong border border-white/20">
                <img 
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-[450px] object-cover transition-all duration-700 ease-in-out transform scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 text-center">
                  <h3 className="text-white text-xl font-semibold">{slides[currentSlide].title}</h3>
                  <p className="text-white/90 mt-2">{slides[currentSlide].description}</p>
                </div>
                <button 
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-strong p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-strong p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-strong p-4 rounded-xl border border-white/20 group transition-all duration-300 hover:bg-white/20">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium text-white">Multimodal AI Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4">
              Our Solutions
            </h2>
            <p className="mt-4 text-gray-600">Leveraging technologies to streamline and accelerate every step of property transactions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}{' '}
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-[#DC5F12] hover:text-[#c45510] transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      const targetPath = feature.link.split('#')[0];
                      const targetId = feature.link.split('#')[1];
                      
                      if (window.location.pathname !== targetPath) {
                        window.location.href = feature.link;
                        setTimeout(() => {
                          const element = document.getElementById(targetId);
                          if (element) {
                            const headerOffset = 80;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                        }, 100);
                      } else {
                        const element = document.getElementById(targetId);
                        if (element) {
                          const headerOffset = 80;
                          const elementPosition = element.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }
                    }}
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
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4">
              News & Insights
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest trends and insights in real estate technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of AI in Real Estate Valuation",
                category: "Research Report",
                date: "March 15, 2024",
                description: "An in-depth analysis of how artificial intelligence is transforming property valuation methods and improving accuracy.",
                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400",
                slug: "ai-valuation-future"
              },
              {
                title: "Emerging Trends in Property Technology",
                category: "Market Analysis",
                date: "March 10, 2024",
                description: "Exploring the latest technological innovations shaping the real estate industry and their impact on market dynamics.",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=400",
                slug: "property-tech-trends"
              },
              {
                title: "Sustainable Real Estate: A Data-Driven Approach",
                category: "Industry Report",
                date: "March 5, 2024",
                description: "How data analytics and AI are helping property developers and investors make sustainable decisions.",
                image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=400",
                slug: "sustainable-real-estate-data"
              }
            ].map((item, index) => (
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