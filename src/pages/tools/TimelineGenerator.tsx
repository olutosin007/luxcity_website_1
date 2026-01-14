import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function TimelineGenerator() {
  const [employmentType, setEmploymentType] = useState<string>('');
  const [hasGuarantor, setHasGuarantor] = useState<boolean | null>(null);
  const [timeline, setTimeline] = useState<{ min: number; max: number; bottlenecks: string[] } | null>(null);

  const calculateTimeline = () => {
    if (!employmentType || hasGuarantor === null) return;

    let min = 7;
    let max = 14;
    const bottlenecks: string[] = [];

    if (employmentType === 'self-employed') {
      min = 10;
      max = 21;
      bottlenecks.push('Self-employment verification takes longer');
    } else if (employmentType === 'student') {
      min = 10;
      max = 18;
      bottlenecks.push('Student income verification');
    }

    if (!hasGuarantor && employmentType === 'student') {
      min = Math.max(min, 14);
      max = Math.max(max, 21);
      bottlenecks.push('Guarantor checks required');
    }

    if (hasGuarantor) {
      min += 3;
      max += 5;
      bottlenecks.push('Guarantor verification');
    }

    setTimeline({ min, max, bottlenecks });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Rental Application Timeline Calculator | UK Property Rental Timeline Estimator - Luxcity"
        description="Calculate how long your UK rental application will take. Get realistic timeline estimates based on your employment type, guarantor status, and situation. Free rental application timeline calculator."
        canonical="/tools/timeline-generator"
        keywords={[
          'rental application timeline',
          'rental application time',
          'UK rental application timeline',
          'property rental timeline',
          'rental application duration',
          'rental application estimate',
          'property rental timeline calculator',
          'rental application timeline UK',
          'how long rental application',
          'rental application processing time',
          'property rental application time',
          'rental application timeline calculator',
          'UK rental timeline',
          'rental application wait time',
          'property rental application duration'
        ]}
        relatedTerms={[
          'how long does rental application take',
          'rental application processing time UK',
          'property rental application timeline',
          'rental application duration UK',
          'how long rental application process',
          'UK rental application time',
          'rental application wait time',
          'property rental application estimate',
          'rental application timeline guide',
          'rental application processing duration'
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
            How Long Will Your Rental Application Take?
          </h1>
          <p className="text-lg text-gray-600 mb-12">
            UK rental application timelines vary based on your situation. This free rental application timeline calculator gives you a realistic estimate based on your employment type, guarantor status, and other factors.
          </p>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Employment Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['employed', 'self-employed', 'student'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setEmploymentType(type)}
                    className={`px-6 py-4 rounded-lg font-medium transition ${
                      employmentType === type
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-900 mb-4">
                Do you have a guarantor?
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => setHasGuarantor(true)}
                  className={`px-6 py-4 rounded-lg font-medium transition ${
                    hasGuarantor === true
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setHasGuarantor(false)}
                  className={`px-6 py-4 rounded-lg font-medium transition ${
                    hasGuarantor === false
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>

            <button
              onClick={calculateTimeline}
              disabled={!employmentType || hasGuarantor === null}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Calculate Timeline
            </button>
          </div>

          {timeline && (
            <div className="bg-indigo-50 rounded-xl p-8 border border-indigo-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Expected Timeline
              </h2>
              <div className="mb-6">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {timeline.min} - {timeline.max} days
                </div>
                <p className="text-gray-600">
                  Estimated time from application to decision
                </p>
              </div>

              {timeline.bottlenecks.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Potential Delays
                  </h3>
                  <ul className="space-y-2">
                    {timeline.bottlenecks.map((bottleneck, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-yellow-600 mr-2">•</span>
                        <span className="text-gray-700">{bottleneck}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-600">
                  Rental application delays usually come from missing documents or third-party referencing checks. Make sure you have all required rental documents ready to avoid timeline delays.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Managing Multiple Rental Applications</h3>
          <p className="text-gray-700 mb-3">
            When you're applying to multiple UK rental properties, timelines become hard to manage and track. This rental application timeline calculator helps you set realistic expectations for each application.
          </p>
          <p className="text-gray-700">
            Use this tool to understand how long your rental application process might take based on your specific situation and employment status.
          </p>
        </div>
      </div>
    </div>
  );
}


