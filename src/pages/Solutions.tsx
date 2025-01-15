import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Solutions() {
  const solutions = [
    {
      name: "Proptii",
      description: "AI-powered property valuation and market analysis platform that provides real-time insights and predictive analytics for property investors and professionals.",
      features: [
        "Automated property valuation",
        "Market trend analysis",
        "Investment opportunity scoring",
        "Comparable property analysis"
      ],
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      name: "RentIntel",
      description: "Comprehensive rental market intelligence platform that helps property managers and landlords optimize rental pricing and identify market opportunities.",
      features: [
        "Dynamic rental pricing",
        "Tenant demand analysis",
        "Rental market forecasting",
        "Competitive property tracking"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=400"
    }
  ];

  return (
    <div>
      <section 
        className="h-[80vh] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-[56px] font-archivo font-bold text-white mb-6">
              Our Solutions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Cutting-edge AI solutions for the modern real estate industry
            </p>
          </div>
        </div>
      </section>

      {/* Rest of the component remains unchanged */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {solutions.map((solution, index) => (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <h2 className="text-3xl font-bold text-gray-900">{solution.name}</h2>
                  <p className="text-lg text-gray-600">{solution.description}</p>
                  <ul className="space-y-3">
                    {solution.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-gray-700">
                        <ArrowRight className="h-5 w-5 text-indigo-600 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Link
                      to="#"
                      className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Learn More <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <img
                    src={solution.image}
                    alt={solution.name}
                    className="rounded-2xl shadow-2xl w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}