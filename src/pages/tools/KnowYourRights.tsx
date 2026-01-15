import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, XCircle, Info, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { Helmet } from 'react-helmet-async';

export default function KnowYourRights() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const rightsSections = [
    {
      id: 'before-moving',
      title: 'Before You Move In',
      icon: CheckCircle,
      items: [
        {
          id: 'how-to-rent-guide',
          text: 'You should receive the "How to Rent" guide from your landlord',
          details: 'Landlords are legally required to provide the most current version of this guide at the start of a new tenancy. If they don\'t, they may not be able to serve a valid Section 21 notice.',
          isRight: true
        },
        {
          id: 'right-to-rent-check',
          text: 'You must pass a Right to Rent check',
          details: 'Landlords must check that you have the right to rent in the UK. You\'ll need to provide acceptable identity documents.',
          isRight: true
        },
        {
          id: 'deposit-protection',
          text: 'Your deposit must be protected in a government-approved scheme',
          details: 'Within 30 days of receiving your deposit, your landlord must protect it and provide you with prescribed information about the scheme.',
          isRight: true
        },
        {
          id: 'energy-performance',
          text: 'You should receive an Energy Performance Certificate (EPC)',
          details: 'The property must have a valid EPC rating of E or above (unless exempt). You should receive a copy before signing the tenancy.',
          isRight: true
        },
        {
          id: 'gas-safety',
          text: 'You should receive a current Gas Safety Certificate',
          details: 'If the property has gas appliances, your landlord must provide a valid Gas Safety Certificate before you move in.',
          isRight: true
        }
      ]
    },
    {
      id: 'during-tenancy',
      title: 'During Your Tenancy',
      icon: Shield,
      items: [
        {
          id: 'repairs',
          text: 'Your landlord must keep the property in good repair',
          details: 'Landlords are responsible for repairs to the structure, exterior, heating, hot water, and gas/electricity installations. You must report issues promptly.',
          isRight: true
        },
        {
          id: 'quiet-enjoyment',
          text: 'You have the right to quiet enjoyment of the property',
          details: 'Your landlord cannot enter without permission (except in emergencies). They must give 24 hours notice for inspections.',
          isRight: true
        },
        {
          id: 'rent-increases',
          text: 'Rent increases must follow proper procedures',
          details: 'For periodic tenancies, landlords must use a Section 13 notice. For fixed-term tenancies, increases must be agreed or specified in the contract.',
          isRight: true
        },
        {
          id: 'deposit-return',
          text: 'Your deposit should be returned promptly at the end of tenancy',
          details: 'If there are no disputes, your deposit should be returned within 10 days of agreeing deductions (if any).',
          isRight: true
        },
        {
          id: 'housing-loss-prevention',
          text: 'You can access free legal advice if at risk of losing your home',
          details: 'The Housing Loss Prevention Advice Service offers free legal advice to tenants at risk of eviction or repossession.',
          isRight: true
        }
      ]
    },
    {
      id: 'ending-tenancy',
      title: 'Ending Your Tenancy',
      icon: AlertTriangle,
      items: [
        {
          id: 'section-21-notice',
          text: 'A Section 21 notice must be valid and properly served',
          details: 'For a Section 21 to be valid, your landlord must have protected your deposit, provided the "How to Rent" guide, and given proper notice (usually 2 months).',
          isRight: true
        },
        {
          id: 'section-8-notice',
          text: 'A Section 8 notice requires specific grounds',
          details: 'Landlords can use Section 8 if you breach the tenancy (e.g., rent arrears, damage). Different grounds have different notice periods.',
          isRight: true
        },
        {
          id: 'retaliatory-eviction',
          text: 'You may be protected from retaliatory eviction',
          details: 'If you\'ve complained about poor conditions and your landlord serves a Section 21, it may be invalid if the property has serious hazards.',
          isRight: true
        },
        {
          id: 'notice-period',
          text: 'You must give proper notice if you want to leave',
          details: 'For periodic tenancies, you usually need to give one month\'s notice. Check your tenancy agreement for specific requirements.',
          isRight: false
        }
      ]
    },
    {
      id: 'your-responsibilities',
      title: 'Your Responsibilities',
      icon: Info,
      items: [
        {
          id: 'pay-rent',
          text: 'You must pay rent on time',
          details: 'Rent should be paid as specified in your tenancy agreement. Late payments can lead to eviction proceedings.',
          isRight: false
        },
        {
          id: 'take-care',
          text: 'You must take reasonable care of the property',
          details: 'You\'re responsible for keeping the property clean and reporting any damage or needed repairs promptly.',
          isRight: false
        },
        {
          id: 'not-cause-nuisance',
          text: 'You must not cause nuisance or anti-social behaviour',
          details: 'Your tenancy agreement will prohibit activities that disturb neighbours or cause damage to the property.',
          isRight: false
        },
        {
          id: 'allow-access',
          text: 'You should allow access for repairs (with notice)',
          details: 'You must allow your landlord access for necessary repairs, but they must give reasonable notice (usually 24 hours).',
          isRight: false
        }
      ]
    }
  ];

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const totalItems = rightsSections.reduce((sum, section) => sum + section.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const completionPercentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://luxcity.tech';
  const pageUrl = `${siteUrl}/tools/know-your-rights`;

  // Generate FAQ structured data
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rightsSections.flatMap(section => 
      section.items.map(item => ({
        '@type': 'Question',
        name: item.text,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.details
        }
      }))
    )
  };

  // Generate HowTo structured data
  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Understand Your UK Tenant Rights',
    description: 'Interactive guide to understanding your rights and responsibilities as a tenant in England, based on the official DLUHC How to Rent guide.',
    step: rightsSections.map((section, index) => ({
      '@type': 'HowToSection',
      name: section.title,
      position: index + 1,
      itemListElement: section.items.map((item, itemIndex) => ({
        '@type': 'HowToStep',
        position: itemIndex + 1,
        name: item.text,
        text: item.details
      }))
    }))
  };

  return (
    <article className="min-h-screen bg-gray-50">
      <SEO
        title="Know Your Rights: UK Tenant Rights Guide | Free Interactive Tool - Luxcity"
        description="Interactive guide to help UK tenants understand their rights and responsibilities. Based on the official DLUHC 'How to Rent' guide. Check what you know about deposits, repairs, evictions, and more."
        canonical="/tools/know-your-rights"
        keywords={[
          'tenant rights UK',
          'UK rental rights',
          'tenant rights guide',
          'rental rights and responsibilities',
          'UK tenant rights checklist',
          'how to rent guide',
          'tenant rights interactive',
          'UK rental law',
          'tenant rights and obligations',
          'rental property rights',
          'tenant legal rights UK',
          'rental rights guide',
          'UK housing rights',
          'tenant rights tool'
        ]}
        relatedTerms={[
          'tenant rights and responsibilities UK',
          'what are my rights as a tenant',
          'UK rental law guide',
          'tenant rights deposit protection',
          'section 21 notice rights',
          'tenant rights repairs',
          'UK housing law',
          'rental property rights and obligations',
          'tenant rights eviction',
          'how to rent guide interactive'
        ]}
        category="Rental Tools"
      />
      {/* Additional Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(howToStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Know Your Rights: UK Tenant Rights Guide',
            applicationCategory: 'EducationalApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'GBP'
            },
            description: 'Free interactive tool to help UK tenants understand their rights and responsibilities based on the official DLUHC How to Rent guide.',
            url: pageUrl
          })}
        </script>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/tools" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Tools
        </Link>

        <section className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <header>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Know Your Rights: UK Tenant Rights Guide
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Based on the official DLUHC "How to Rent" guide (October 2023), this interactive tool helps you understand your rights and responsibilities as a tenant in England. Learn about deposit protection, repairs, eviction rights, and more. Check off what you know and discover important aspects of renting in the UK.
            </p>
          </header>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Your Understanding: {checkedCount} of {totalItems} items
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(completionPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Rights Sections */}
          <section className="space-y-6" aria-label="Tenant rights and responsibilities">
            {rightsSections.map((section) => {
              const IconComponent = section.icon;
              const isExpanded = expandedSection === section.id;
              const sectionChecked = section.items.filter(item => checked[item.id]).length;
              const sectionTotal = section.items.length;

              return (
                <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <IconComponent className="h-5 w-5 mr-3 text-indigo-600" />
                      <h2 className="text-xl font-bold text-gray-900">
                        {section.title}
                      </h2>
                      <span className="ml-3 text-sm text-gray-500">
                        ({sectionChecked}/{sectionTotal})
                      </span>
                    </div>
                    <span className="text-gray-400">
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="p-4 space-y-4">
                      {section.items.map((item) => (
                        <div
                          key={item.id}
                          className={`p-4 rounded-lg border-2 transition-colors ${
                            checked[item.id]
                              ? item.isRight
                                ? 'border-green-200 bg-green-50'
                                : 'border-blue-200 bg-blue-50'
                              : 'border-gray-200 bg-white'
                          }`}
                        >
                          <div className="flex items-start">
                            <button
                              onClick={() => toggleCheck(item.id)}
                              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 mt-1 transition-colors ${
                                checked[item.id]
                                  ? item.isRight
                                    ? 'border-green-600 bg-green-600'
                                    : 'border-blue-600 bg-blue-600'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              {checked[item.id] && (
                                item.isRight ? (
                                  <CheckCircle className="h-4 w-4 text-white" />
                                ) : (
                                  <Info className="h-4 w-4 text-white" />
                                )
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                <p className={`font-medium ${
                                  checked[item.id]
                                    ? item.isRight ? 'text-green-800' : 'text-blue-800'
                                    : 'text-gray-900'
                                }`}>
                                  {item.text}
                                </p>
                                {item.isRight && (
                                  <Shield className="h-4 w-4 ml-2 text-indigo-600" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </section>
        </section>

        {/* Information Box */}
        <section className="bg-indigo-50 rounded-xl p-6 border border-indigo-200 mb-8" aria-label="About this guide">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">About This Guide</h2>
          <p className="text-gray-700 mb-3">
            This interactive guide is based on the official DLUHC "How to Rent: The Checklist for Renting in England" guide (October 2023). It covers your key rights and responsibilities as a tenant, including information about tenancy deposits, landlord repairs, eviction notices, and tenant obligations.
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Important:</strong> This tool is for informational purposes only and does not constitute legal advice. If you have specific legal questions or concerns about your tenancy rights, you should seek advice from a qualified legal professional or contact the Housing Loss Prevention Advice Service for free legal advice.
          </p>
          <p className="text-gray-700">
            You can download the full official "How to Rent" guide and other essential rental documents from the <Link to="/tools#documents" className="text-indigo-600 hover:text-indigo-700 underline">Rental Documents section</Link> on the Tools page.
          </p>
        </section>

        {/* Download Link */}
        <section className="bg-white rounded-xl shadow-lg p-6 border border-gray-100" aria-label="Download rental documents">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Need the Full Guide?</h2>
          <p className="text-gray-600 mb-4">
            Download the complete official "How to Rent" guide and other essential rental documents, including Right to Rent guides, deposit protection templates, and health and safety documents.
          </p>
          <Link
            to="/tools#documents"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
            aria-label="View and download rental documents"
          >
            View Rental Documents <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
          </Link>
        </section>

        {/* FAQ Section for SEO */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8 border border-gray-100" aria-label="Frequently asked questions about tenant rights">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions About UK Tenant Rights</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are my rights as a tenant in the UK?</h3>
              <p className="text-gray-700">
                As a tenant in England, you have several important rights including the right to live in a property that's safe and in good repair, the right to quiet enjoyment, protection from illegal eviction, and the right to have your deposit protected in a government-approved scheme. Your landlord must also provide you with the "How to Rent" guide at the start of your tenancy.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What should I receive before moving into a rental property?</h3>
              <p className="text-gray-700">
                Before moving in, you should receive the "How to Rent" guide, a valid Energy Performance Certificate (EPC), a Gas Safety Certificate (if applicable), and information about your protected deposit. You'll also need to pass a Right to Rent check with acceptable identity documents.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What is a Section 21 notice?</h3>
              <p className="text-gray-700">
                A Section 21 notice is a "no-fault" eviction notice that allows landlords to regain possession of their property without giving a reason. However, for it to be valid, your landlord must have protected your deposit, provided the "How to Rent" guide, and given proper notice (usually 2 months). If you've complained about poor conditions, you may be protected from retaliatory eviction.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Who is responsible for repairs in a rental property?</h3>
              <p className="text-gray-700">
                Landlords are responsible for repairs to the structure and exterior of the property, heating and hot water systems, gas and electrical installations, and sanitary fittings. You're responsible for reporting issues promptly and taking reasonable care of the property. Your landlord must give 24 hours notice before entering for repairs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long should my deposit take to be returned?</h3>
              <p className="text-gray-700">
                If there are no disputes, your deposit should be returned within 10 days of agreeing any deductions. Your deposit must be protected in a government-approved scheme within 30 days of receiving it, and you should receive prescribed information about the scheme.
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
