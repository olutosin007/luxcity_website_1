import { ArrowRight, ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

export default function Company() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible in real estate technology."
    },
    {
      title: "Client Success",
      description: "Our clients' success is our success. We're committed to delivering exceptional value."
    },
    {
      title: "Future-Ready",
      description: "We build solutions that anticipate and adapt to future market needs."
    }
  ];

  const faqs = [
    {
      question: "What services does Luxcity offer?",
      answer: "Luxcity offers a range of AI-powered real estate solutions including AI-Powered Home Search, Predictive Market Insights, and Virtual Agents & Assistants. Our technology helps streamline property transactions, provide data-driven insights, and enhance the overall real estate experience for tenants, landlords, and agents."
    },
    {
      question: "How does AI technology improve real estate processes?",
      answer: "Our AI technology automates workflows, provides intelligent property matching based on behavioral patterns, offers predictive analytics for market trends and pricing, and delivers 24/7 virtual assistance. This reduces manual work, speeds up decision-making, and helps users make more informed choices."
    },
    {
      question: "Who can benefit from Luxcity's solutions?",
      answer: "Our solutions are designed for a wide range of users including tenants looking for their ideal rental property, landlords managing their portfolios, real estate agents seeking to improve their services, and property investors needing market insights. We make real estate simpler and more accessible for everyone."
    },
    {
      question: "Is Luxcity's technology secure and reliable?",
      answer: "Yes, security and reliability are paramount to us. We use industry-standard security practices to protect user data and ensure our platforms are robust and dependable. Our solutions are built with enterprise-grade infrastructure to handle high volumes of transactions securely."
    },
    {
      question: "How can I get started with Luxcity?",
      answer: "You can get started by contacting us through our contact form, calling us at +44 (0) 203 189 1276, or emailing us at contactus@theluxcity.co.uk. Our team will work with you to understand your needs and recommend the best solutions for your specific requirements."
    },
    {
      question: "Does Luxcity offer custom solutions for businesses?",
      answer: "Yes, we work with businesses of all sizes to develop custom AI solutions tailored to their specific needs. Whether you're a property management company, a real estate agency, or a property developer, we can create bespoke solutions that integrate with your existing systems and workflows."
    }
  ];

  return (
    <div>
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/london-at-night.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[57px] sm:text-[47px] md:text-[70px] lg:text-[85px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 mb-6 animate-fade-in">
              About Luxcity
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              We're on a mission to reshape and elevate the real estate industry by harnessing the power of artificial intelligence and advanced technologies to build a smarter future.
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-8">
                At Luxcity, we envision a future where real estate decisions are powered by intelligent technology, making property transactions more efficient, transparent, and accessible to everyone.
              </p>
              <p className="text-lg text-gray-600">
               We are quickly becoming a leading force in PropTech innovation, combining artificial intelligence with deep real estate expertise.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=500"
                alt="Luxcity office"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 flex-shrink-0 transition-transform duration-200 ${
                        openFaq === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Us On Our Journey</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our vision of transforming the real estate industry through technology.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}