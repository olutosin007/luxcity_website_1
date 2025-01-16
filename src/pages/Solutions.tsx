import { ArrowRight, Brain, BarChart3, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBackground from '../components/HeroBackground';

export default function Solutions() {
  const solutions = [
    {
      name: "Proptii",
      description: "AI-powered property valuation and market analysis platform that provides real-time insights and predictive analytics for property investors and professionals.",
      features: [
        { text: "Automated property valuation", icon: Brain },
        { text: "Market trend analysis", icon: BarChart3 },
        { text: "Investment opportunity scoring", icon: Zap },
        { text: "Comparable property analysis", icon: Users }
      ],
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&q=80&w=800&h=400",
      stats: { accuracy: 95, properties: 50000, users: 1000 }
    },
    {
      name: "RentIntel",
      description: "Comprehensive rental market intelligence platform that helps property managers and landlords optimize rental pricing and identify market opportunities.",
      features: [
        { text: "Dynamic rental pricing", icon: Zap },
        { text: "Tenant demand analysis", icon: Users },
        { text: "Rental market forecasting", icon: BarChart3 },
        { text: "Competitive property tracking", icon: Brain }
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=400",
      stats: { accuracy: 92, properties: 35000, users: 800 }
    }
  ];

  return (
    <div>
      {/* Hero Section - Updated to match main hero style */}
      <section className="relative h-[80vh] overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <HeroBackground />
        
        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-[85px] font-archivo font-light leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-indigo-200 mb-6 animate-fade-in">
              Our Solutions
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Cutting-edge AI solutions transforming the modern real estate industry through innovation and efficiency
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Section - Updated with consistent styling */}
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-900/5 to-transparent">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <circle cx="25" cy="25" r="1" fill="rgba(99, 102, 241, 0.4)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="space-y-32">
            {solutions.map((solution, index) => (
              <div 
                key={index} 
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 lg:p-12 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`space-y-8 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div>
                      <h2 className="text-4xl font-archivo font-light text-gray-900 mb-4 relative inline-block">
                        {solution.name}
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#DC5F12] to-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      </h2>
                      <p className="text-lg text-gray-600 leading-relaxed">{solution.description}</p>
                    </div>

                    {/* Stats Section - Updated with hero-matching style */}
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(solution.stats).map(([key, value], i) => (
                        <div key={i} className="text-center p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                          <div className="text-2xl font-bold text-[#DC5F12]">
                            {typeof value === 'number' && value >= 1000 ? `${value.toLocaleString()}+` : `${value}${key === 'accuracy' ? '%' : ''}`}
                          </div>
                          <div className="text-sm text-gray-600 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-4">
                      {solution.features.map((feature, fIndex) => (
                        <li 
                          key={fIndex} 
                          className="flex items-center text-gray-700 p-3 rounded-xl transition-all duration-300 hover:bg-white/10"
                        >
                          <feature.icon className="h-5 w-5 text-[#DC5F12] mr-3 transition-all duration-300 group-hover:scale-110" />
                          {feature.text}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4">
                      <Link
                        to="#"
                        className="inline-flex items-center px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] transition-all duration-300"
                      >
                        Learn More <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>

                  <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-strong border border-white/20">
                      <img
                        src={solution.image}
                        alt={solution.name}
                        className="w-full h-[450px] object-cover transition-all duration-700 ease-in-out transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Floating Elements - Matching hero style */}
                    <div className="absolute -z-10 inset-0">
                      <div className="absolute top-0 right-0 w-32 h-32 border border-white/10 rounded-full transform rotate-45 float-slow"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 border border-white/10 rounded-full transform -rotate-45 float-slow" style={{ animationDelay: '-5s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}