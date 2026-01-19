import { ArrowRight, Brain, BarChart3, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import InterestFormModal from '../components/InterestFormModal';

export default function Solutions() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    productName: string;
    productUrl: string;
  }>({
    isOpen: false,
    productName: '',
    productUrl: '',
  });

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
                  Proptii
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  Proptii is an AI-driven platform built to make real estate simpler, clearer, and more accessible for everyone. We use the power of artificial intelligence combined with real, practical insight into the property market to give tenants, landlords, and agents the information they need without the confusion or guesswork.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  With Proptii, everything is designed to be straightforward and convenient: smarter recommendations, faster processes, and transparent guidance that helps you make confident decisions at every step.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  onClick={() => {
                    setModalState({
                      isOpen: true,
                      productName: 'Proptii',
                      productUrl: 'https://proptii-r1-1a-new.onrender.com/',
                    });
                  }}
                  className="group inline-flex px-6 sm:px-8 py-4 bg-white text-[#DC5F12] border-2 border-[#DC5F12] rounded-xl hover:bg-[#DC5F12] hover:text-white transition-all duration-300 items-center text-base sm:text-lg min-h-[44px]"
                >
                  View product 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/images/proptii-cover.png"
                alt="Proptii platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Nest Quest Section */}
      <section id="nest-quest-section" className="min-h-[100vh] sm:min-h-[100vh] md:h-[672px] bg-[#F6F5F4] py-16 sm:py-12 md:py-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100 order-2 lg:order-1">
              <img
                src="/images/nest-quest cover.png"
                alt="Nest Quest student property platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40"></div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="text-[32px] sm:text-[36px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4 sm:mb-6">
                  Nest Quest
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  A property matchmaker platform specifically designed for students, helping them find the perfect accommodation that matches their needs, budget, and lifestyle. Nest Quest simplifies the search process with intelligent matching algorithms tailored to student requirements.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Find your perfect student accommodation today.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <button
                  onClick={() => {
                    setModalState({
                      isOpen: true,
                      productName: 'Nest Quest',
                      productUrl: 'https://nest-quest-npp3.onrender.com/',
                    });
                  }}
                  className="group inline-flex px-6 sm:px-8 py-4 bg-white text-[#DC5F12] border-2 border-[#DC5F12] rounded-xl hover:bg-[#DC5F12] hover:text-white transition-all duration-300 items-center text-base sm:text-lg min-h-[44px]"
                >
                  View product 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Council Connect Section */}
      <section id="council-connect-section" className="min-h-[100vh] sm:min-h-[100vh] md:h-[672px] bg-white py-16 sm:py-12 md:py-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-[32px] sm:text-[36px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] mb-4 sm:mb-6">
                  Council Connect
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-4 sm:mb-6">
                  A comprehensive platform that connects government agencies with landlords and agents to streamline the provision of properties for council housing. Council Connect facilitates efficient communication, property management, and allocation processes to help councils meet housing needs more effectively.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Streamline council housing provision today.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <button className="group px-6 sm:px-8 py-4 bg-white text-[#DC5F12] border-2 border-[#DC5F12] rounded-xl hover:bg-[#DC5F12] hover:text-white transition-all duration-300 flex items-center text-base sm:text-lg min-h-[44px]">
                  View product 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/images/council-connect cover.png"
                alt="Council Connect platform"
                className="w-full h-full object-cover object-top"
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

          <button className="group px-6 sm:px-8 py-4 bg-white text-[#DC5F12] border-2 border-[#DC5F12] rounded-xl hover:bg-[#DC5F12] hover:text-white transition-all duration-300 flex items-center mx-auto text-base sm:text-lg min-h-[44px]">
            Get Started Today <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Interest Form Modal */}
      <InterestFormModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, productName: '', productUrl: '' })}
        productName={modalState.productName}
        productUrl={modalState.productUrl}
      />
    </div>
  );
}