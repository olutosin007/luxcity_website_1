import { Download, FileText, Shield, AlertCircle, FileCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function RentalDocuments() {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://luxcity.tech';
  const documents = [
    {
      id: 'how-to-rent',
      title: 'How to Rent: The Checklist for Renting in England',
      description: 'Official government guide covering your rights and responsibilities as a tenant, including information on deposits, repairs, evictions, and the Housing Loss Prevention Advice Service.',
      file: '/rental_documents/DLUHC_How_to_rent_Oct2023.pdf',
      icon: FileText,
      category: 'Tenant Guide',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'right-to-rent',
      title: 'Right to Rent Checks: A Guide to Immigration Documents',
      description: 'Comprehensive guide explaining Right to Rent checks for tenants and landlords, including which documents are acceptable and what to expect during the process.',
      file: '/rental_documents/Right to Rent Checks_ A guide to immigration documents for tenants and landlords.pdf',
      icon: Shield,
      category: 'Legal Requirements',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'right-to-rent-easy-read',
      title: 'Right to Rent User Guide (Easy Read)',
      description: 'Easy-to-understand guide from the Home Office explaining Right to Rent checks in simple language with clear visuals.',
      file: '/rental_documents/3286 Home Office Right to Rent User Guide Easy Read v3.pdf',
      icon: AlertCircle,
      category: 'Easy Read Guide',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'prescribed-information',
      title: 'Prescribed Information Template (Tenancy Deposit Scheme)',
      description: 'Template for providing prescribed information about tenancy deposits when using a custodial deposit scheme.',
      file: '/rental_documents/1tds-ew-custodial-prescribed-information-template.docx',
      icon: FileCheck,
      category: 'Deposit Template',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'legionella-assessment',
      title: 'Legionella Risk Assessment Template',
      description: 'Template for conducting and documenting legionella risk assessments in rental properties, as required by health and safety regulations.',
      file: '/rental_documents/legionella_Risk_Assessment_template.pdf',
      icon: AlertCircle,
      category: 'Health & Safety',
      color: 'bg-red-50 text-red-600'
    }
  ];

  // Generate HowTo structured data for downloading rental documents
  const howToStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Download Essential UK Rental Documents',
    description: 'Step-by-step guide to downloading official UK rental documents including the How to Rent guide, Right to Rent checks, deposit protection templates, and health and safety documents.',
    step: documents.map((doc, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Download ${doc.title}`,
      text: doc.description,
      url: `${siteUrl}${doc.file}`
    }))
  };

  // Generate ItemList structured data
  const itemListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Essential UK Rental Documents',
    description: 'Official government guides and templates for UK tenants and landlords',
    itemListElement: documents.map((doc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'DigitalDocument',
        name: doc.title,
        description: doc.description,
        url: `${siteUrl}${doc.file}`,
        fileFormat: doc.file.split('.').pop()?.toUpperCase() || 'PDF'
      }
    }))
  };

  return (
    <section>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(howToStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(itemListStructuredData)}
        </script>
      </Helmet>
      <header className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Essential Rental Documents</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Download official government guides and templates to help you navigate the UK rental process. These essential documents cover your tenant rights, responsibilities, legal requirements, deposit protection, and health and safety obligations when renting in England.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" role="list">
        {documents.map((doc) => {
          const IconComponent = doc.icon;
          const fileExtension = doc.file.split('.').pop()?.toUpperCase();
          
          return (
            <article
              key={doc.id}
              className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow p-6"
              role="listitem"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`inline-flex p-3 rounded-lg ${doc.color} mb-2`} aria-hidden="true">
                  <IconComponent className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded" aria-label={`File format: ${fileExtension}`}>
                  {fileExtension}
                </span>
              </div>
              
              <div className="mb-2">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                  {doc.category}
                </span>
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {doc.title}
              </h2>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {doc.description}
              </p>
              
              <a
                href={doc.file}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                aria-label={`Download ${doc.title} - ${fileExtension} file`}
              >
                <Download className="h-5 w-5 mr-2" aria-hidden="true" />
                Download Document
              </a>
            </article>
          );
        })}
      </div>

      <section className="bg-indigo-50 rounded-xl p-6 border border-indigo-200" aria-label="About rental documents">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">About These Documents</h2>
        <p className="text-gray-700 mb-3">
          These documents are provided to help you understand your rights and responsibilities as a tenant in England. The "How to Rent" guide is legally required to be provided by landlords at the start of a new tenancy. If your landlord fails to provide it, they may not be able to serve a valid Section 21 eviction notice.
        </p>
        <p className="text-gray-700 mb-3">
          All documents are official government publications from the Department for Levelling Up, Housing and Communities (DLUHC), Home Office, or approved templates designed to help both tenants and landlords navigate the UK rental process more effectively and comply with legal requirements.
        </p>
        <p className="text-gray-700">
          For more interactive tools to help with your rental journey, visit our <Link to="/tools" className="text-indigo-600 hover:text-indigo-700 underline font-medium">Rental Application Tools</Link> page, including our <Link to="/tools/know-your-rights" className="text-indigo-600 hover:text-indigo-700 underline font-medium">Know Your Rights interactive guide</Link>.
        </p>
      </section>
    </section>
  );
}
