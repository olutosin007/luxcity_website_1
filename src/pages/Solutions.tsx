import { ArrowRight, Brain, BarChart3, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Solutions() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    // Handle initial hash navigation
    const hash = window.location.hash.slice(1); // Remove the # symbol
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100); // Small delay to ensure the page has rendered
    }
  }, []);

  const solutions = [
    {
      name: "Proptii",
      headline: "AI-Powered Home Search",
      description: "Proptii simplifies the home search process with AI-driven insights tailored to renters and buyers. It personalizes property recommendations, streamlines communication, and provides real-time updates.",
      benefits: [
        { text: "Personalized property matches", icon: Brain },
        { text: "Smart filters for quick searches", icon: BarChart3 },
        { text: "Seamless communication", icon: Users }
      ],
      image: "/images/proptii-interface.jpg"
    },
    {
      name: "RentIntel",
      headline: "Rental Market Intelligence at Your Fingertips",
      description: "RentIntel empowers landlords and property managers with actionable insights to maximize rental income and identify growth opportunities.",
      benefits: [
        { text: "Dynamic pricing models", icon: Zap },
        { text: "Market trend analysis", icon: BarChart3 },
        { text: "Opportunity mapping", icon: Brain }
      ],
      image: "/images/rentintel-dashboard.jpg"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[100vh] sm:h-[100vh] md:h-[80vh] overflow-hidden pt-[80px] sm:pt-[80px] md:pt-[120px]">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/office-workers-720.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[57px] sm:text-[47px] md:text-[70px] lg:text-[85px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 mb-4 sm:mb-6 animate-fade-in">
              Redefining Property Intelligence
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Discover our cutting-edge AI solutions that empower real estate professionals to innovate, optimize, and thrive in a competitive market.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Sections */}
      <section id="ai-search-section" className="min-h-[100vh] sm:min-h-[100vh] md:h-[672px] bg-white py-16 sm:py-12 md:py-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-[32px] sm:text-[36px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4 sm:mb-6">
                  AI-Powered Home Search
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  Our AI-Powered Home Search revolutionizes the way you find your ideal property. Leveraging advanced algorithms and real-time insights, we simplify your search process, delivering tailored results in seconds.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Start your journey to your dream home today.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <button className="group px-6 sm:px-8 py-4 bg-white text-[#DC5F12] border-2 border-[#DC5F12] rounded-xl hover:bg-[#DC5F12] hover:text-white transition-all duration-300 flex items-center text-base sm:text-lg min-h-[44px]">
                  Contact Us 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/images/london-home-01.jpg"
                alt="London home exterior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Predictive Market Insights Section */}
      <section id="market-insights-section" className="min-h-[100vh] sm:min-h-[100vh] md:h-[672px] bg-[#F6F5F4] py-16 sm:py-12 md:py-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100 order-2 lg:order-1">
              <img
                src="/images/Person-using-smartphone.jpg"
                alt="Person analyzing market insights"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40"></div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-[32px] sm:text-[36px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4 sm:mb-6">
                  Predictive Market Insights
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  Our Predictive Market Insights use AI analytics to reveal real estate trends, pricing, and opportunities. By analyzing data and market shifts, we empower you to make confident, informed decisions.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Gain the edge you need to make smarter property decisions today.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <button className="group px-6 sm:px-8 py-4 bg-white text-[#DC5F12] border-2 border-[#DC5F12] rounded-xl hover:bg-[#DC5F12] hover:text-white transition-all duration-300 flex items-center text-base sm:text-lg min-h-[44px]">
                  Contact Us 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Agents and Assistants Section */}
      <section id="virtual-agents-section" className="min-h-[100vh] sm:min-h-[100vh] md:h-[672px] bg-white py-16 sm:py-12 md:py-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-[32px] sm:text-[36px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4 sm:mb-6">
                  Virtual Agents and Assistants
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  Our Virtual Agents and Assistants use advanced AI to seamlessly handle a wide range of complex requests, from answering queries to streamlining tasks. Whether you need support with property searches or transaction management, they're here to help.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Experience the future of real estate assistance today.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <button className="group px-6 sm:px-8 py-4 bg-white text-[#DC5F12] border-2 border-[#DC5F12] rounded-xl hover:bg-[#DC5F12] hover:text-white transition-all duration-300 flex items-center text-base sm:text-lg min-h-[44px]">
                  Contact Us 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/images/Robotic_Person.jpg"
                alt="AI virtual assistant interface"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Luxcity Section */}
      <section className="py-16 sm:py-12 md:py-24 bg-[#F6F5F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-[32px] sm:text-[36px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4">
            Why Choose Luxcity?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-12 sm:mb-16">
            We combine cutting-edge AI technology with deep real estate expertise to deliver solutions that drive real results for our clients.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {[
              { metric: "10X", label: "Faster Property Discovery" },
              { metric: "95%", label: "Client Satisfaction Rate" },
              { metric: "24/7", label: "AI-Powered Support" }
            ].map((stat, index) => (
              <div key={index} className="p-6 sm:p-8 rounded-2xl bg-white shadow-lg">
                <div className="text-3xl sm:text-4xl font-bold text-[#DC5F12] mb-2">{stat.metric}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <button className="px-6 sm:px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] transition-all duration-300 flex items-center mx-auto text-base sm:text-lg min-h-[44px]">
            Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </section>
    </div>
  );
}