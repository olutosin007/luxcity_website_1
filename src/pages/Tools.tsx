import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
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
      id: 'ai-readiness-assessment',
      title: 'AI Readiness Assessment',
      icon: '/images/rediness checker icon.png',
      description: 'Identify the best ways to use AI based on your growth journey. Get a personalized roadmap with ROI projections and case studies.',
      link: '/tools/ai-readiness-assessment',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'regulatory-compliance-checker',
      title: 'Regulatory Compliance Checker',
      icon: '/images/compliance checker icon.png',
      description: 'Ensure full compliance with UK property regulations. Clear checklist for rental, purchase, or current home properties.',
      link: '/tools/regulatory-compliance-checker',
      color: 'bg-red-50 text-red-600'
    },
    {
      id: 'roi-calculator-suite',
      title: 'ROI Calculator Suite',
      icon: '/images/roi calculator icon.png',
      description: 'Calculate ROI for property improvements. Compare scenarios, analyze payback periods, and make data-driven investment decisions.',
      link: '/tools/roi-calculator-suite',
      color: 'bg-green-50 text-green-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="B2B Property Tools | Free PropTech Assessment Tools - Luxcity"
        description="Free B2B property tools for landlords, property managers, and real estate professionals. AI readiness assessment, regulatory compliance checker, and ROI calculator suite. Make data-driven property decisions."
        canonical="/tools"
        keywords={[
          'B2B property tools',
          'PropTech tools',
          'property management tools',
          'AI readiness assessment',
          'property compliance checker',
          'property ROI calculator',
          'real estate tools',
          'property investment tools',
          'landlord tools',
          'property manager tools',
          'property assessment tools',
          'UK property compliance',
          'property ROI analysis',
          'property technology assessment',
          'real estate ROI calculator'
        ]}
        relatedTerms={[
          'property business tools',
          'PropTech solutions',
          'property management software',
          'real estate technology',
          'property investment analysis',
          'UK property regulations',
          'property compliance requirements',
          'property ROI analysis',
          'AI for property management',
          'property technology assessment'
        ]}
        category="B2B Tools"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'B2B Property Tools',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'GBP'
            },
            description: 'Free B2B property tools for landlords, property managers, and real estate professionals. AI readiness assessment, regulatory compliance checker, and ROI calculator suite.',
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
            name: 'B2B Property Tools',
            description: 'List of free B2B tools for property professionals',
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
              B2B Property Tools
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in font-archivo" style={{ animationDelay: '0.2s' }}>
              Free B2B property tools for landlords, property managers, and real estate professionals. Assess your AI readiness, ensure regulatory compliance, and calculate ROI for property investments. Make data-driven decisions with our PropTech toolkit.
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
                className={`px-6 py-3 rounded-md font-medium transition-all font-archivo ${
                  activeTab === 'tools'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="font-archivo">Interactive Tools</span>
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
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center font-archivo">Free B2B Property Tools</h2>
              <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto font-archivo">
                Professional property tools designed for landlords, property managers, and real estate businesses. 
                Assess your capabilities, ensure compliance, and make informed investment decisions with our comprehensive PropTech toolkit.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool) => {
                  return (
                    <Link
                      key={tool.id}
                      to={tool.link}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 hover:border-indigo-200 group"
                    >
                      <div className={`inline-flex p-2 rounded-lg ${tool.color} mb-4`}>
                        <img 
                          src={tool.icon} 
                          alt={`${tool.title} icon`}
                          className="h-16 w-16 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors font-archivo">
                        {tool.title}
                      </h3>
                      <p className="text-gray-600 mb-6 font-archivo">
                        {tool.description}
                      </p>
                      <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-1 transition-transform font-archivo">
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
          <section className="mt-16 mb-16" aria-label="About B2B property tools">
            <div className="prose prose-lg max-w-none text-left font-archivo">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-left font-archivo">About B2B Property Tools</h2>
              <p className="text-lg text-gray-700 mb-4 text-left font-archivo">
                Managing property portfolios and making informed investment decisions requires data-driven insights and comprehensive assessments. Our free B2B property tools help landlords, property managers, and real estate professionals assess capabilities, ensure compliance, and optimize investments.
              </p>
              <p className="text-lg text-gray-700 mb-4 text-left font-archivo">
                Whether you're a small landlord with a few properties or managing a large portfolio, these tools provide valuable insights into AI readiness, regulatory compliance, and investment ROI. All tools are based on real-world property management practices and UK property regulations.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-left font-archivo">Why Use These B2B Property Tools?</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 text-left font-archivo">
                <li><strong>AI Readiness Assessment:</strong> Identify the best AI opportunities for your business stage and avoid costly wrong investments</li>
                <li><strong>Regulatory Compliance:</strong> Ensure full compliance with UK property regulations and avoid fines or legal issues</li>
                <li><strong>ROI Analysis:</strong> Compare multiple investment scenarios before spending money, prioritizing highest-return improvements</li>
                <li><strong>Data-Driven Decisions:</strong> Make informed property management and investment decisions based on comprehensive analysis</li>
                <li><strong>Save Time & Money:</strong> Identify gaps and opportunities quickly, reducing manual assessment time</li>
                <li><strong>Professional Reports:</strong> Download detailed PDF reports with actionable recommendations and next steps</li>
              </ul>
              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4 text-left font-archivo">What B2B Property Tools Are Available?</h3>
              <p className="text-lg text-gray-700 mb-4 text-left font-archivo">
                Our suite of B2B property tools includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 text-left font-archivo">
                <li><strong>AI Readiness Assessment:</strong> Assess your technology infrastructure, data maturity, team readiness, and budget to get a personalized AI adoption roadmap with ROI projections</li>
                <li><strong>Regulatory Compliance Checker:</strong> Comprehensive checklist for rental properties, property purchases, and current homes with must-have requirements and nice-to-have recommendations</li>
                <li><strong>ROI Calculator Suite:</strong> Calculate and compare ROI for property improvements including kitchen renovations, energy efficiency upgrades, smart home technology, and more</li>
              </ul>
              <p className="text-lg text-gray-700 text-left font-archivo">
                These B2B property tools are designed to help property professionals make better decisions, ensure compliance, and optimize investments. Use them to assess your current state, identify opportunities, and plan strategic improvements for your property portfolio.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

