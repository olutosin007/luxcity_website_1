import { useState, useEffect } from 'react';
import { Brain, ArrowRight, ChevronLeft, ChevronRight, Building2, ExternalLink } from 'lucide-react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=600",
      title: "Optimised Results",
      description: "Discover cutting-edge properties with AI-powered insights"
    },
    {
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=800&h=600",
      title: "Smart Living",
      description: "Experience the future of real estate technology"
    },
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=600",
      title: "Premium Locations",
      description: "Find your perfect location with AI assistance"
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
      <section className="h-[80vh] pt-32 pb-16 sm:pt-40 sm:pb-24 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-archivo font-medium text-white leading-tight">
                AI-Powered Solutions for Real Estate and Construction Industries
              </h1>
              <p className="mt-6 text-lg text-gray-200">
                Harnessing cutting-edge Generative AI to deliver tailored solutions that enhance efficiency and sustainability in real estate and construction. Helping you make smarter decisions faster.
              </p>
              <div className="mt-8">
                <button className="px-6 py-3 bg-[#dc5f12] text-white rounded-lg hover:bg-[#c45510] transition flex items-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-b from-transparent to-black/10">
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button 
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>
              </div>
              <div className="absolute -bottom-[46px] left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20 group transition-all duration-200 hover:bg-white/20">
                <div className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium text-white">Multimodal AI Tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 opacity-0 animate-fade-in">
            <h2 className="text-4xl font-archivo font-bold text-gray-900 mb-4">
              Our Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leveraging frontier technologies to streamline and accelerate every step of property transactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800&h=500",
                title: "AI-Powered Property Matching",
                description: "Our advanced AI algorithms analyze thousands of data points to match properties with your specific needs and preferences.",
                features: ["Smart Matching", "Preference Learning", "Real-time Updates"]
              },
              {
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800&h=500",
                title: "Predictive Market Insights",
                description: "Stay ahead with AI-driven analytics that forecast market trends and identify investment opportunities.",
                features: ["Price Predictions", "Market Analysis", "Investment Scoring"]
              },
              {
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800&h=500",
                title: "Virtual Agents and Assistants",
                description: "24/7 AI assistants that handle inquiries, schedule viewings, and provide instant property information.",
                features: ["24/7 Support", "Smart Scheduling", "Instant Responses"]
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <button className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors group">
                    <span className="font-medium">Learn More</span>
                    <ExternalLink className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Building2 className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
          <p className="text-xl text-gray-800 mb-3">
            Ready to revolutionize your real estate experience with AI?
          </p>
          <p className="text-gray-600 mb-8">
            Join thousands of satisfied clients who have transformed their property journey with Luxcity's AI-powered solutions.
          </p>
          <button className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center mx-auto">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </>
  );
}