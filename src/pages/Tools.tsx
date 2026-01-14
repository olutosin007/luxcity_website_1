import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Calendar, HelpCircle, Clock } from 'lucide-react';
import SEO from '../components/SEO';

export default function Tools() {

  const tools = [
    {
      id: 'readiness-checker',
      title: 'Are You Ready to Apply?',
      icon: CheckCircle,
      description: 'Check what you\'re missing before agents do. Takes 2 minutes and shows what you need to prepare.',
      link: '/tools/readiness-checker',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'document-tracker',
      title: 'Your Rental Documents',
      icon: FileText,
      description: 'Track what documents you already have. See the repetition before automation is introduced.',
      link: '/tools/document-tracker',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'viewing-tracker',
      title: 'Track Your Property Viewings',
      icon: Calendar,
      description: 'When you\'re speaking to multiple agents, details get lost quickly. Keep everything in one place.',
      link: '/tools/viewing-tracker',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'process-simulator',
      title: 'What Happens After You Apply?',
      icon: HelpCircle,
      description: 'Turn the black box into a clear system. Understand what usually takes place behind the scenes.',
      link: '/tools/process-simulator',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'timeline-generator',
      title: 'How Long Will This Take?',
      icon: Clock,
      description: 'Set realistic expectations. Get a realistic estimate based on your situation.',
      link: '/tools/timeline-generator',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

  return (
    <div>
      <SEO
        title="Free Rental Application Tools | UK Property Rental Tools - Luxcity"
        description="Free tools to help you navigate the UK rental application process. Check your readiness, track documents, manage viewings, understand the process, and estimate timelines. No signup required."
        canonical="/tools"
        keywords={[
          'rental application tools',
          'UK rental tools',
          'property rental tools',
          'rental application checklist',
          'rental document tracker',
          'property viewing tracker',
          'rental application process',
          'rental timeline calculator',
          'UK property rental',
          'rental application help',
          'letting agent tools',
          'rental preparation tools',
          'property application tools',
          'rental readiness checker',
          'rental documents UK'
        ]}
        relatedTerms={[
          'rental application process UK',
          'how to apply for rental property',
          'rental application documents',
          'property viewing management',
          'rental application timeline',
          'UK rental market',
          'rental property search',
          'letting agent requirements',
          'rental application checklist UK',
          'property rental preparation'
        ]}
        category="Rental Tools"
      />
      {/* Hero Section */}
      <section className="relative h-[100vh] sm:h-[100vh] md:h-[80vh] overflow-hidden pt-[80px] sm:pt-[80px] md:pt-[120px]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/Person-using-smartphone.jpg)' }}
          aria-label="Person using smartphone for rental application tools"
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[57px] sm:text-[47px] md:text-[70px] lg:text-[85px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 mb-4 sm:mb-6 animate-fade-in">
              Rental Journey Tools
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Free UK rental application tools to help you navigate the property rental process. Check your readiness, track documents, manage viewings, understand the application process, and estimate timelines. No signup required - start using these rental tools today.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <div className="py-16 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Free Rental Application Tools</h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Use these free tools to prepare for your UK rental application. Each tool helps you understand and navigate different aspects of the rental process, from document preparation to timeline expectations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={tool.link}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 hover:border-indigo-200 group"
                >
                  <div className={`inline-flex p-3 rounded-lg ${tool.color} mb-4`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-1 transition-transform">
                    Use tool <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Free UK Rental Application Tools</h2>
            <p className="text-lg text-gray-700 mb-4">
              Navigating the UK rental application process can be challenging, especially when applying to multiple properties. Our free rental application tools help you prepare, organize, and understand every step of the rental process.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Whether you're a first-time renter or have experience with UK property rentals, these tools provide valuable insights into what letting agents check, what documents you need, and how long the rental application process typically takes.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Use These Rental Tools?</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li><strong>Save Time:</strong> Prepare all your rental documents and information before applying to properties</li>
              <li><strong>Stay Organized:</strong> Track multiple property viewings and applications in one place</li>
              <li><strong>Understand the Process:</strong> Learn what happens behind the scenes during rental applications</li>
              <li><strong>Set Realistic Expectations:</strong> Get accurate timeline estimates based on your situation</li>
              <li><strong>No Signup Required:</strong> All tools are free to use without creating an account</li>
            </ul>
            <p className="text-lg text-gray-700">
              These rental application tools are designed to help UK renters navigate the property rental market more effectively. Use them to prepare for your rental applications, track your progress, and understand the rental process from application to decision.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

