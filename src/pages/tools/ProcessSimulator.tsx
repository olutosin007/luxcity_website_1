import { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function ProcessSimulator() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      title: 'Agent Review',
      description: 'The agent reviews your application and initial documents to ensure you meet the basic requirements.',
      details: 'This step exists so agents can reduce risk — not to make renting harder.'
    },
    {
      number: 2,
      title: 'Referencing Checks',
      description: 'Credit checks, employment verification, and previous landlord references are conducted.',
      details: 'Third-party referencing agencies verify your information. This typically takes 3-5 business days.'
    },
    {
      number: 3,
      title: 'Landlord Comparison',
      description: 'If multiple applications are received, the landlord compares applicants based on various factors.',
      details: 'Landlords consider factors like income, references, move-in dates, and rental history.'
    },
    {
      number: 4,
      title: 'Decision',
      description: 'The landlord makes a final decision and the agent communicates the outcome to you.',
      details: 'You\'ll typically receive a response within 1-2 weeks of applying, though this can vary.'
    },
  ];

  const toggleStep = (stepNumber: number) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Rental Application Process Explained | UK Property Rental Process Guide - Luxcity"
        description="Understand what happens after you apply for a rental property in the UK. Learn about agent review, referencing checks, landlord comparison, and decision-making in the rental application process."
        canonical="/tools/process-simulator"
        keywords={[
          'rental application process',
          'UK rental application process',
          'property rental process',
          'rental application steps',
          'what happens after rental application',
          'letting agent process',
          'rental application review',
          'property rental application process',
          'UK rental application guide',
          'rental application workflow',
          'property rental process UK',
          'rental application stages',
          'rental application timeline',
          'property rental application steps',
          'rental application explained'
        ]}
        relatedTerms={[
          'how rental applications work',
          'rental application process UK',
          'what letting agents check',
          'rental application review process',
          'property rental application guide',
          'UK rental application steps',
          'rental application workflow',
          'property rental application explained',
          'rental application stages',
          'rental application timeline UK'
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
            What Happens After You Apply for a Rental Property?
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            Most rental application decisions happen behind the scenes. This guide explains what usually takes place in the UK rental application process, from initial application to final decision.
          </p>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleStep(step.number)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                  {expandedStep === step.number ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedStep === step.number && (
                  <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700">{step.details}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Understanding the Rental Application Process</h3>
            <p className="text-gray-700 mb-3">
              Understanding the UK rental application process won't guarantee you get a rental property offer, but it removes uncertainty and helps you know what to expect at each stage.
            </p>
            <p className="text-gray-700">
              Use this rental application process guide to prepare for what letting agents and landlords typically check during the rental application review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


