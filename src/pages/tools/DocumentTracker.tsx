import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function DocumentTracker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const sections = [
    {
      title: 'Identity',
      items: [
        { id: 'passport', text: 'Passport' },
        { id: 'driving-license', text: 'Driving License' },
        { id: 'birth-certificate', text: 'Birth Certificate' },
      ]
    },
    {
      title: 'Income',
      items: [
        { id: 'payslips', text: 'Payslips (last 3 months)' },
        { id: 'bank-statements', text: 'Bank Statements' },
        { id: 'employment-letter', text: 'Employment Letter' },
      ]
    },
    {
      title: 'Rental History',
      items: [
        { id: 'previous-tenancy', text: 'Previous Tenancy Agreement' },
        { id: 'references', text: 'Landlord References' },
      ]
    },
    {
      title: 'Guarantor',
      items: [
        { id: 'guarantor-id', text: 'Guarantor ID' },
        { id: 'guarantor-income', text: 'Guarantor Proof of Income' },
      ]
    },
  ];

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const totalItems = sections.reduce((sum, section) => sum + section.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const completionPercentage = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Rental Document Tracker | UK Property Rental Documents Checklist - Luxcity"
        description="Track your rental application documents with this free UK rental document tracker. Keep track of ID, proof of income, rental history, and guarantor documents needed for property rental applications."
        canonical="/tools/document-tracker"
        keywords={[
          'rental documents tracker',
          'rental application documents',
          'UK rental documents',
          'property rental documents',
          'rental document checklist',
          'letting agent documents',
          'rental application paperwork',
          'rental documents UK',
          'property rental requirements',
          'rental document organizer',
          'rental application preparation',
          'UK rental paperwork',
          'rental documents list',
          'property rental documents UK',
          'rental application documents checklist'
        ]}
        relatedTerms={[
          'what documents needed for rental',
          'rental application requirements UK',
          'letting agent document requirements',
          'rental application paperwork UK',
          'property rental document checklist',
          'UK rental application documents',
          'rental documents preparation',
          'property rental application requirements',
          'rental application document list',
          'UK property rental documents'
        ]}
        category="Rental Tools"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/tools" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Tools
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Rental Application Documents Tracker
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            UK letting agents often ask for the same rental application documents again and again when you apply to multiple properties. Use this free rental document tracker to tick what you already have and see what you still need for your property rental applications.
          </p>

          <div className="mb-8">
            <div className="bg-indigo-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Completion</span>
                <span className="text-sm font-bold text-indigo-600">
                  {checkedCount} / {totalItems}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked[item.id] || false}
                        onChange={() => toggleCheck(item.id)}
                        className="sr-only"
                      />
                      <div
                        className={`flex-shrink-0 w-6 h-6 border-2 rounded flex items-center justify-center mr-4 ${
                          checked[item.id]
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-gray-300'
                        }`}
                      >
                        {checked[item.id] && (
                          <Check className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-gray-900">{item.text}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              Most UK letting agents will ask for these rental documents separately for each property application — even if you've already sent them to another agent. This rental document tracker helps you stay organized across multiple rental applications.
            </p>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Track Your Rental Documents?</h3>
          <p className="text-gray-700 mb-3">
            Repeating the same document collection process for every rental application gets tiring and time-consuming. This rental document tracker helps you see at a glance what you have ready for your UK property rental applications.
          </p>
          <p className="text-gray-700">
            Save time on your rental applications by keeping all your rental documents organized in one place.
          </p>
        </div>
      </div>
    </div>
  );
}


