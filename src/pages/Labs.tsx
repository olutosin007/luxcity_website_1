import { ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

export default function Labs() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const experiments = [
    {
      title: "Proptii",
      status: "Beta",
      description: ["Proptii is an AI-driven platform built to make real estate simpler, clearer, and more accessible for everyone. We use the power of artificial intelligence combined with real, practical insight into the property market to give tenants, landlords, and agents the information they need without the confusion or guesswork.", "With Proptii, everything is designed to be straightforward and convenient: smarter recommendations, faster processes, and transparent guidance that helps you make confident decisions at every step."],
      image: "/images/proptii_cover.png",
      link: "https://proptii-r1-1a-new.onrender.com/",
      buttonText: "View product"
    },
    {
      title: "Nest Quest",
      status: "In Development",
      description: "A property matchmaker platform specifically designed for students, helping them find the perfect accommodation that matches their needs, budget, and lifestyle. Nest Quest simplifies the search process with intelligent matching algorithms tailored to student requirements.",
      image: "/images/nest_quest cover image.png",
      link: "https://nest-quest-npp3.onrender.com/",
      buttonText: "View product"
    },
    {
      title: "Council Connect",
      status: "In Development",
      description: "A comprehensive platform that connects government agencies with landlords and agents to streamline the provision of properties for council housing. Council Connect facilitates efficient communication, property management, and allocation processes to help councils meet housing needs more effectively.",
      image: "/images/council_connect cover.png"
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
          <source src="/images/Teamwork-labs-720.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[57px] sm:text-[47px] md:text-[70px] lg:text-[85px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 mb-4 sm:mb-6 animate-fade-in">
              Inventing The Future
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Experiments and groundbreaking solutions designed to transform how we live, work, and play. Bold ideas, advanced research, and transformative technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Rest of the component */}
      <div className="py-16 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:gap-8 md:gap-16">
            {experiments.map((experiment, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 space-y-6">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-2xl font-bold text-gray-900">{experiment.title}</h2>
                      <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
                        {experiment.status}
                      </span>
                    </div>
                    {Array.isArray(experiment.description) ? (
                      <div className="space-y-3">
                        {experiment.description.map((para, idx) => (
                          <p key={idx} className="text-gray-600">{para}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">{experiment.description}</p>
                    )}
                    {experiment.link ? (
                      <a 
                        href={experiment.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      >
                        {experiment.buttonText || "Learn More"} <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    ) : (
                      <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={experiment.image}
                      alt={experiment.title}
                      className={`absolute inset-0 w-full h-full object-cover ${experiment.title === "Council Connect" ? "object-top" : ""}`}
                    />
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