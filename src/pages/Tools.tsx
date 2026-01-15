import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Calendar, HelpCircle, Clock, Download, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import RentalDocuments from './tools/RentalDocuments';

export default function Tools() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'tools' | 'documents'>('tools');

  // Check URL hash on mount and when location changes
  useEffect(() => {
    const hash = location.hash.slice(1); // Remove the # symbol
    if (hash === 'documents') {
      setActiveTab('documents');
    } else {
      setActiveTab('tools');
    }
  }, [location]);

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
    },
    {
      id: 'know-your-rights',
      title: 'Know Your Rights',
      icon: Shield,
      description: 'Interactive guide to UK tenant rights and responsibilities. Based on the official DLUHC "How to Rent" guide.',
      link: '/tools/know-your-rights',
      color: 'bg-teal-50 text-teal-600'
    }
  ];

  return (
    <div>
      <SEO
        title="Free Rental Application Tools | UK Property Rental Tools - Luxcity"
        description="Free UK rental application tools to help you navigate the property rental process. Check your readiness, track documents, manage viewings, understand tenant rights, and estimate timelines. Download official rental guides. No signup required."
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
          'rental documents UK',
          'tenant rights UK',
          'UK tenant rights guide',
          'how to rent guide',
          'rental application readiness',
          'UK rental application process'
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
          'property rental preparation',
          'tenant rights and responsibilities',
          'UK rental law',
          'deposit protection UK',
          'section 21 notice',
          'right to rent check'
        ]}
        category="Rental Tools"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'UK Rental Application Tools',
            applicationCategory: 'UtilityApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'GBP'
            },
            description: 'Free UK rental application tools to help tenants navigate the property rental process, check readiness, track documents, manage viewings, understand tenant rights, and estimate timelines.',
            url: typeof window !== 'undefined' ? window.location.href : 'https://luxcity.tech/tools',
            featureList: tools.map(tool => tool.title),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5',
              ratingCount: '1'
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'UK Rental Application Tools',
            description: 'List of free tools for UK rental applications',
            itemListElement: tools.map((tool, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: tool.title,
                description: tool.description,
                url: typeof window !== 'undefined' ? `${window.location.origin}${tool.link}` : `https://luxcity.tech${tool.link}`,
                applicationCategory: 'UtilityApplication',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'GBP'
                }
              }
            }))
          })}
        </script>
      </Helmet>
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

      {/* Tabs and Content */}
      <div className="py-16 sm:py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => {
                  setActiveTab('tools');
                  window.history.replaceState(null, '', '/tools');
                }}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'tools'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Interactive Tools
              </button>
              <button
                onClick={() => {
                  setActiveTab('documents');
                  window.history.replaceState(null, '', '/tools#documents');
                }}
                className={`px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === 'documents'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Download className="inline h-4 w-4 mr-2" />
                Rental Documents
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'tools' && (
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Free Rental Application Tools</h2>
              <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                Use these free UK rental application tools to prepare for your property rental journey. Each interactive tool helps you understand and navigate different aspects of the rental process, from document preparation and readiness checks to timeline expectations and viewing management.
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
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                        {tool.title}
                      </h3>
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
            </section>
          )}

          {activeTab === 'documents' && <RentalDocuments />}

          {/* SEO Content Section */}
          <section className="mt-16 mb-16" aria-label="About rental application tools">
            <div className="prose prose-lg max-w-none text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-left">About UK Rental Application Tools</h2>
              <p className="text-lg text-gray-700 mb-4 text-left">
                Navigating the UK rental application process can be challenging, especially when applying to multiple properties. Our free rental application tools help you prepare, organize, and understand every step of the rental process, from initial property search to securing your tenancy.
              </p>
              <p className="text-lg text-gray-700 mb-4 text-left">
                Whether you're a first-time renter or have experience with UK property rentals, these tools provide valuable insights into what letting agents check, what documents you need, and how long the rental application process typically takes. All tools are based on real-world rental application processes and UK rental law.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-left">Why Use These Rental Tools?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 text-left">
                <li><strong>Save Time:</strong> Prepare all your rental documents and information before applying to properties, reducing delays in your application process</li>
                <li><strong>Stay Organized:</strong> Track multiple property viewings and applications in one place, preventing important details from getting lost</li>
                <li><strong>Understand the Process:</strong> Learn what happens behind the scenes during rental applications, including referencing checks and decision-making timelines</li>
                <li><strong>Set Realistic Expectations:</strong> Get accurate timeline estimates based on your situation, helping you plan your move effectively</li>
                <li><strong>Know Your Rights:</strong> Understand your tenant rights and responsibilities with our interactive guide based on the official DLUHC "How to Rent" guide</li>
                <li><strong>No Signup Required:</strong> All tools are free to use without creating an account - start using them immediately</li>
              </ul>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-left">What Rental Tools Are Available?</h3>
              <p className="text-lg text-gray-700 mb-4 text-left">
                Our suite of rental application tools includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 text-left">
                <li><strong>Readiness Checker:</strong> Assess your rental application readiness and identify missing documents or requirements before letting agents check</li>
                <li><strong>Document Tracker:</strong> Track which rental documents you already have, helping you see the repetition before automation is introduced</li>
                <li><strong>Viewing Tracker:</strong> Keep track of multiple property viewings and agent communications in one organized place</li>
                <li><strong>Process Simulator:</strong> Understand what happens after you apply, turning the black box into a clear system</li>
                <li><strong>Timeline Generator:</strong> Get realistic timeline estimates based on your specific rental situation</li>
                <li><strong>Know Your Rights:</strong> Interactive guide to UK tenant rights and responsibilities based on official government guidance</li>
              </ul>
              <p className="text-lg text-gray-700 text-left">
                These rental application tools are designed to help UK renters navigate the property rental market more effectively. Use them to prepare for your rental applications, track your progress, understand your tenant rights, and make informed decisions throughout the rental process from application to decision.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

