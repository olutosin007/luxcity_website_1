import { useState } from 'react';
import { ArrowLeft, Download, CheckCircle, AlertCircle, Info, Home, ShoppingBag, Key } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { jsPDF } from 'jspdf';
import DataCollectionForm from '../../components/DataCollectionForm';
import { TOOL_SUBMISSION_URL } from '../../config/toolSubmission';

interface ComplianceItem {
  id: string;
  title: string;
  category: 'must-have' | 'nice-to-have';
  description: string;
  action: string;
  propertyType: 'all' | 'rental' | 'purchase' | 'current-home';
}

const complianceItems: ComplianceItem[] = [
  // Must-haves for Rental
  {
    id: 'epc-rental',
    title: 'Energy Performance Certificate (EPC)',
    category: 'must-have',
    description: 'Valid EPC rating of E or above required for rental properties. Must be renewed every 10 years.',
    action: 'Obtain EPC from accredited assessor if missing or expired. Display certificate to tenants.',
    propertyType: 'rental'
  },
  {
    id: 'gas-safety',
    title: 'Gas Safety Certificate',
    category: 'must-have',
    description: 'Annual gas safety check required for all rental properties with gas appliances. Must be completed by Gas Safe registered engineer.',
    action: 'Schedule annual gas safety inspection. Provide copy to tenants within 28 days of check.',
    propertyType: 'rental'
  },
  {
    id: 'electrical-safety',
    title: 'Electrical Installation Condition Report (EICR)',
    category: 'must-have',
    description: 'EICR required every 5 years for rental properties. Must be completed by qualified electrician.',
    action: 'Arrange EICR inspection if due or missing. Address any issues identified.',
    propertyType: 'rental'
  },
  {
    id: 'right-to-rent',
    title: 'Right to Rent Checks',
    category: 'must-have',
    description: 'Must verify tenant immigration status before tenancy begins. Check original documents and keep copies.',
    action: 'Conduct checks before signing tenancy agreement. Keep records for at least 1 year after tenancy ends.',
    propertyType: 'rental'
  },
  {
    id: 'deposit-protection',
    title: 'Deposit Protection',
    category: 'must-have',
    description: 'Tenancy deposits must be protected in government-approved scheme within 30 days of receipt.',
    action: 'Register deposit with approved scheme (DPS, TDS, or MyDeposits). Provide prescribed information to tenant.',
    propertyType: 'rental'
  },
  {
    id: 'fire-safety-rental',
    title: 'Fire Safety Requirements',
    category: 'must-have',
    description: 'Working smoke alarms on every floor. Carbon monoxide alarms in rooms with solid fuel appliances. Fire risk assessment for HMOs.',
    action: 'Install and test smoke/CO alarms. Complete fire risk assessment if HMO. Keep records.',
    propertyType: 'rental'
  },
  {
    id: 'hmo-licensing',
    title: 'HMO Licensing',
    category: 'must-have',
    description: 'Mandatory licensing for HMOs with 5+ occupants from 2+ households. Additional licensing may apply locally.',
    action: 'Check if property requires HMO license. Apply to local authority if needed. Display license in property.',
    propertyType: 'rental'
  },
  {
    id: 'how-to-rent',
    title: 'How to Rent Guide',
    category: 'must-have',
    description: 'Must provide current version of government "How to Rent" guide to tenants at start of tenancy.',
    action: 'Download latest version from gov.uk and provide to tenant before or at start of tenancy.',
    propertyType: 'rental'
  },
  // Must-haves for Purchase
  {
    id: 'epc-purchase',
    title: 'Energy Performance Certificate (EPC)',
    category: 'must-have',
    description: 'EPC required when selling property. Must be available to potential buyers before marketing.',
    action: 'Obtain EPC if missing. Include in property listing. Valid for 10 years.',
    propertyType: 'purchase'
  },
  {
    id: 'title-deeds',
    title: 'Title Deeds & Land Registry',
    category: 'must-have',
    description: 'Proof of ownership required. Property must be registered with Land Registry.',
    action: 'Verify property registration. Obtain official copies of title deeds if needed.',
    propertyType: 'purchase'
  },
  {
    id: 'planning-permissions',
    title: 'Planning Permissions & Building Regulations',
    category: 'must-have',
    description: 'All extensions, conversions, and major works must have proper planning permission and building regulations approval.',
    action: 'Check planning history. Obtain certificates of completion for building works. Resolve any outstanding issues.',
    propertyType: 'purchase'
  },
  {
    id: 'leasehold-info',
    title: 'Leasehold Information (if applicable)',
    category: 'must-have',
    description: 'If leasehold, provide lease details, ground rent, service charges, and management company information.',
    action: 'Gather lease documents. Calculate service charges. Provide full leasehold information pack.',
    propertyType: 'purchase'
  },
  // Must-haves for Current Home
  {
    id: 'epc-current',
    title: 'Energy Performance Certificate',
    category: 'must-have',
    description: 'EPC required if selling or renting. Good to have for understanding energy efficiency.',
    action: 'Obtain EPC if planning to sell/rent. Use to identify energy efficiency improvements.',
    propertyType: 'current-home'
  },
  {
    id: 'insurance',
    title: 'Building & Contents Insurance',
    category: 'must-have',
    description: 'Adequate insurance coverage for property and contents. Mortgage lenders require buildings insurance.',
    action: 'Review insurance coverage. Ensure adequate protection. Update if property value changed.',
    propertyType: 'current-home'
  },
  // Nice-to-haves
  {
    id: 'legionella-assessment',
    title: 'Legionella Risk Assessment',
    category: 'nice-to-have',
    description: 'Recommended for rental properties, especially HMOs. Assesses risk of Legionella bacteria in water systems.',
    action: 'Commission risk assessment from qualified assessor. Implement control measures if needed.',
    propertyType: 'rental'
  },
  {
    id: 'asbestos-survey',
    title: 'Asbestos Survey',
    category: 'nice-to-have',
    description: 'Recommended for properties built before 2000. Identifies asbestos-containing materials.',
    action: 'Commission survey if property pre-2000. Manage or remove asbestos as required.',
    propertyType: 'all'
  },
  {
    id: 'damp-survey',
    title: 'Damp & Timber Survey',
    category: 'nice-to-have',
    description: 'Identifies damp issues, rot, and woodworm. Particularly important for older properties.',
    action: 'Arrange survey if concerns. Address any issues before they worsen.',
    propertyType: 'all'
  },
  {
    id: 'energy-improvements',
    title: 'Energy Efficiency Improvements',
    category: 'nice-to-have',
    description: 'Improvements like insulation, double glazing, efficient heating can increase property value and reduce costs.',
    action: 'Assess current energy efficiency. Plan improvements based on cost-benefit analysis.',
    propertyType: 'all'
  }
];

export default function RegulatoryComplianceChecker() {
  const [propertyType, setPropertyType] = useState<'rental' | 'purchase' | 'current-home' | null>(null);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);

  const handleDataSubmit = async (formData: any) => {
    // Additional tool data to include in submission
    const toolData = {
      propertyType: propertyType,
      complianceScore: complianceScore,
      mustHavesCompleted: checkedMustHaves.length,
      mustHavesTotal: mustHaves.length,
      niceToHavesCompleted: niceToHaves.filter(item => checkedItems[item.id]).length,
      niceToHavesTotal: niceToHaves.length,
      checkedItems: checkedItems
    };

    try {
      // Send to Google Sheets Apps Script with tool-specific data.
      // Use no-cors and no custom headers so the browser doesn't block the request.
      await fetch(TOOL_SUBMISSION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          ...formData,
          toolName: 'Regulatory Compliance Checker',
          toolData: toolData,
        }),
      });
    } catch (error) {
      console.error('Error submitting tool data:', error);
    }

    setDataSubmitted(true);
    setShowDataForm(false);
    setShowResults(true);
  };

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getRelevantItems = () => {
    if (!propertyType) return [];
    return complianceItems.filter(item => 
      item.propertyType === propertyType || item.propertyType === 'all'
    );
  };

  const getMustHaves = () => {
    return getRelevantItems().filter(item => item.category === 'must-have');
  };

  const getNiceToHaves = () => {
    return getRelevantItems().filter(item => item.category === 'nice-to-have');
  };

  const calculateCompliance = () => {
    setShowDataForm(true);
  };

  const generatePDF = () => {
    if (!propertyType) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin + 20;

    const propertyTypeLabel = propertyType === 'rental' ? 'Rental Property' 
      : propertyType === 'purchase' ? 'Property Purchase' 
      : 'Current Home';

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Regulatory Compliance Checklist', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Property Type: ${propertyTypeLabel}`, margin, yPosition);
    yPosition += 15;

    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${date}`, margin, yPosition);
    yPosition += 20;

    // Must-Haves Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Must-Have Requirements', margin, yPosition);
    yPosition += 10;

    const mustHaves = getMustHaves();
    mustHaves.forEach((item, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin + 20;
      }

      const isChecked = checkedItems[item.id];
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${item.title} ${isChecked ? '✓' : '✗'}`, margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(item.description, maxWidth);
      doc.text(descLines, margin + 5, yPosition);
      yPosition += descLines.length * 5 + 3;

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      const actionLines = doc.splitTextToSize(`Action: ${item.action}`, maxWidth - 10);
      doc.text(actionLines, margin + 5, yPosition);
      yPosition += actionLines.length * 5 + 8;
      doc.setTextColor(0, 0, 0);
    });

    yPosition += 10;

    // Nice-to-Haves Section
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = margin + 20;
    }

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Nice-to-Have Recommendations', margin, yPosition);
    yPosition += 10;

    const niceToHaves = getNiceToHaves();
    niceToHaves.forEach((item, index) => {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin + 20;
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${item.title}`, margin, yPosition);
      yPosition += 8;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const descLines = doc.splitTextToSize(item.description, maxWidth);
      doc.text(descLines, margin + 5, yPosition);
      yPosition += descLines.length * 5 + 3;

      doc.setFont('helvetica', 'italic');
      doc.setTextColor(100, 100, 100);
      const actionLines = doc.splitTextToSize(`Action: ${item.action}`, maxWidth - 10);
      doc.text(actionLines, margin + 5, yPosition);
      yPosition += actionLines.length * 5 + 8;
      doc.setTextColor(0, 0, 0);
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('LuxCity Regulatory Compliance Checker', margin, pageHeight - 10);

    doc.save('compliance-checklist.pdf');
  };

  const mustHaves = getMustHaves();
  const niceToHaves = getNiceToHaves();
  const checkedMustHaves = mustHaves.filter(item => checkedItems[item.id]);
  const complianceScore = mustHaves.length > 0 
    ? (checkedMustHaves.length / mustHaves.length) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Regulatory Compliance Checker | UK Property Compliance Tool - Luxcity"
        description="Ensure full compliance with UK property regulations. Free compliance checker for rental properties, property purchases, and current homes. Get your compliance checklist today."
        canonical="/tools/regulatory-compliance-checker"
        keywords={[
          'property compliance checker',
          'UK rental compliance',
          'property regulations UK',
          'rental compliance checklist',
          'property compliance requirements',
          'UK property law compliance',
          'rental property compliance',
          'property compliance tool'
        ]}
        category="B2B Tools"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 md:pt-28">
        <Link 
          to="/tools" 
          className="inline-flex items-center px-4 py-2 bg-[#2e70b3] text-white rounded-lg hover:bg-[#2565a0] transition-colors mb-8 shadow-sm font-archivo"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span className="font-archivo">Back to Tools</span>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-archivo">
            Regulatory Compliance Checker
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-archivo">
            Ensure full compliance with UK property regulations. This checklist helps you identify 
            must-have requirements and nice-to-have recommendations for your property situation.
          </p>

          {/* Property Type Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-archivo">Select Your Property Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setPropertyType('rental')}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  propertyType === 'rental'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <Key className="h-8 w-8 text-indigo-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-archivo">Rental Property</h3>
                <p className="text-sm text-gray-600 font-archivo">Properties you let to tenants</p>
              </button>
              <button
                onClick={() => setPropertyType('purchase')}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  propertyType === 'purchase'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="h-8 w-8 text-indigo-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-archivo">Property Purchase</h3>
                <p className="text-sm text-gray-600 font-archivo">Properties you're buying or selling</p>
              </button>
              <button
                onClick={() => setPropertyType('current-home')}
                className={`p-6 rounded-lg border-2 text-left transition-all ${
                  propertyType === 'current-home'
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <Home className="h-8 w-8 text-indigo-600 mb-3" />
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-archivo">Current Home</h3>
                <p className="text-sm text-gray-600 font-archivo">Your own residential property</p>
              </button>
            </div>
          </div>

          {/* Must-Have Checklist */}
          {propertyType && (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center font-archivo">
                    <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
                    Must-Have Requirements
                  </h2>
                  <span className="text-sm text-gray-600 font-archivo">
                    {checkedMustHaves.length} of {mustHaves.length} completed
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mustHaves.map((item) => (
                    <div
                      key={item.id}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        checkedItems[item.id]
                          ? 'border-green-500 bg-green-50'
                          : 'border-red-200 bg-red-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                            checkedItems[item.id]
                              ? 'bg-green-600 border-green-600'
                              : 'border-gray-300'
                          }`}
                        >
                          {checkedItems[item.id] && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2 font-archivo">{item.title}</h3>
                          <p className="text-sm text-gray-700 mb-3 font-archivo">{item.description}</p>
                          <div className="bg-white rounded p-3 border-l-4 border-indigo-500">
                            <p className="text-sm font-medium text-gray-900 mb-1 font-archivo">What to do next:</p>
                            <p className="text-sm text-gray-700 font-archivo">{item.action}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nice-to-Have Checklist */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center font-archivo">
                  <Info className="h-6 w-6 text-blue-600 mr-2" />
                  Nice-to-Have Recommendations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {niceToHaves.map((item) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-4 bg-blue-50 border-blue-200"
                    >
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition ${
                            checkedItems[item.id]
                              ? 'bg-blue-600 border-blue-600'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {checkedItems[item.id] && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </button>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-sm text-gray-700 mb-3">{item.description}</p>
                          <div className="bg-white rounded p-3 border-l-4 border-blue-500">
                            <p className="text-sm font-medium text-gray-900 mb-1">What to do next:</p>
                            <p className="text-sm text-gray-700">{item.action}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={calculateCompliance}
                className="w-full bg-[#2e70b3] text-white py-3 rounded-lg font-medium hover:bg-[#2565a0] transition font-archivo"
              >
                Get My Compliance Report
              </button>
            </>
          )}
        </div>

        {/* Data Collection Form Modal */}
        <DataCollectionForm 
          onSubmit={handleDataSubmit}
          toolName="Regulatory Compliance Checker"
          isOpen={showDataForm && !dataSubmitted}
          onClose={() => setShowDataForm(false)}
        />

        {/* Results */}
        {showResults && dataSubmitted && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-archivo">Your Compliance Report</h2>
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl font-bold font-archivo ${
                    complianceScore >= 100 ? 'text-green-600' :
                    complianceScore >= 75 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {complianceScore.toFixed(0)}%
                  </div>
                  <div className="text-lg text-gray-600 font-archivo">
                    {complianceScore >= 100 ? 'Fully Compliant' :
                     complianceScore >= 75 ? 'Mostly Compliant' : 'Needs Attention'}
                  </div>
                </div>
              </div>
              <button
                onClick={generatePDF}
                className="inline-flex items-center px-6 py-3 bg-[#2e70b3] text-white rounded-lg hover:bg-[#2565a0] transition font-archivo"
              >
                <Download className="h-5 w-5 mr-2" />
                <span className="font-archivo">Download PDF Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 font-archivo">Must-Have Requirements</h3>
                <p className="text-2xl font-bold text-indigo-600 font-archivo">
                  {checkedMustHaves.length} / {mustHaves.length}
                </p>
                <p className="text-sm text-gray-600 mt-2 font-archivo">Completed</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 font-archivo">Nice-to-Have Items</h3>
                <p className="text-2xl font-bold text-blue-600 font-archivo">
                  {niceToHaves.filter(item => checkedItems[item.id]).length} / {niceToHaves.length}
                </p>
                <p className="text-sm text-gray-600 mt-2 font-archivo">Completed</p>
              </div>
            </div>

            {complianceScore < 100 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2 font-archivo">Action Required</h3>
                <p className="text-sm text-gray-700 font-archivo">
                  You have {mustHaves.length - checkedMustHaves.length} must-have requirement(s) 
                  that need attention. Address these items to ensure full compliance and avoid 
                  potential fines or legal issues.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-archivo">Why This Matters</h3>
          <p className="text-gray-700 mb-3 font-archivo">
            Non-compliance with UK property regulations can result in significant fines, 
            legal issues, and inability to serve notice to tenants. This checklist helps 
            you stay ahead of requirements and protect your business.
          </p>
          <p className="text-gray-700 font-archivo">
            Regular compliance checks ensure you're always ready for inspections and 
            maintain your reputation as a responsible property owner.
          </p>
        </div>
      </div>
    </div>
  );
}
