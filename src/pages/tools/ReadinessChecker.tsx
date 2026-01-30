import { useState } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { jsPDF } from 'jspdf';

type AssessmentResult = {
  label: string;
  summary: string;
  gaps: string[];
  nextSteps: string[];
  encouragement?: string;
  fromAI: boolean;
};

const questions = [
  { id: 'photo-id', text: 'Do you have valid photo ID?' },
  { id: 'proof-income', text: 'Can you show recent proof of income?' },
  { id: 'rented-before', text: 'Have you rented before in the UK?' },
  { id: 'guarantor', text: 'Would you be able to provide a guarantor if asked?' },
];

export default function ReadinessChecker() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnswer = (id: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    setResult(null);
    setError(null);
  };

  const calculateReadiness = async () => {
    const answered = Object.values(answers).filter(a => a !== null);
    if (answered.length < questions.length) {
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/readiness-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Assessment failed');
      setResult(data as AssessmentResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadChecklist = () => {
    const doc = new jsPDF();
    
    // Set up styling
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin + 20;

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Document Checklist', margin, yPosition);
    yPosition += 15;

    // Introduction text
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const introText = 'To complete your referencing, have these documents ready for upload';
    const introLines = doc.splitTextToSize(introText, maxWidth);
    doc.text(introLines, margin, yPosition);
    yPosition += 20;

    // Checklist items
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    
    const checklistItems = [
      'Your passport or drivers license',
      'Pay slips and employment contract',
      'Your current residence utility bill',
      '6 month\'s bank statement',
      'Your guarantor\'s passport or drivers license'
    ];

    // Draw bullet points and text for each item
    checklistItems.forEach((item) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin + 20;
      }

      // Add bullet point and item text
      doc.setFont('helvetica', 'normal');
      doc.text(`• ${item}`, margin, yPosition);
      
      yPosition += 12;
    });

    // Add footer with date
    const date = new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${date}`, margin, pageHeight - 10);

    // Save the PDF
    doc.save('document-checklist.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Rental Application Readiness Checker | Free UK Property Rental Tool - Luxcity"
        description="Check if you're ready to apply for rental properties in the UK. This free tool takes 2 minutes to assess your rental application readiness, showing what documents and requirements you need before letting agents check."
        canonical="/tools/readiness-checker"
        keywords={[
          'rental application readiness',
          'rental application checker',
          'UK rental application',
          'rental application requirements',
          'property rental readiness',
          'rental application preparation',
          'letting agent requirements',
          'rental application checklist',
          'UK property rental',
          'rental application help',
          'rental readiness test',
          'property application readiness',
          'rental application assessment',
          'UK rental requirements',
          'rental application guide'
        ]}
        relatedTerms={[
          'rental application documents',
          'what do letting agents check',
          'rental application requirements UK',
          'how to prepare for rental application',
          'rental application process UK',
          'property rental application',
          'rental application tips',
          'UK rental market',
          'rental application success',
          'property rental preparation'
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
            Are You Ready to Apply for a Rental Property?
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            UK letting agents check the same requirements every time you apply for a rental property. This free rental application readiness checker takes just 2 minutes and shows what you're missing — before letting agents do their checks. Prepare for your rental application with confidence.
          </p>

          <div className="space-y-6 mb-8">
            {questions.map((question) => (
              <div key={question.id} className="border-b border-gray-200 pb-6">
                <p className="text-lg font-medium text-gray-900 mb-4">
                  {question.text}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleAnswer(question.id, true)}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      answers[question.id] === true
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => handleAnswer(question.id, false)}
                    className={`px-6 py-3 rounded-lg font-medium transition ${
                      answers[question.id] === false
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="mb-4 text-red-600 text-sm" role="alert">{error}</p>
          )}
          <button
            onClick={calculateReadiness}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Assessing…' : 'Check Readiness'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your Rental Application Readiness Assessment
            </h2>
            <div className="text-3xl font-bold text-indigo-600 mb-4">
              {result.label}
            </div>
            <p className="text-gray-600 mb-4">
              {result.summary}
            </p>
            {result.encouragement && (
              <p className="text-gray-700 font-medium mb-4">{result.encouragement}</p>
            )}
            {result.gaps.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Gaps to address</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {result.gaps.map((gap, i) => (
                    <li key={i}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.nextSteps.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Next steps</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {result.nextSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.fromAI && (
              <p className="text-xs text-gray-500 mb-4">
                This assessment was personalised using AI based on your answers.
              </p>
            )}
            <button 
              onClick={downloadChecklist}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Download className="h-5 w-5 mr-2" />
              Download Checklist
            </button>
          </div>
        )}

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Why This Matters</h3>
          <p className="text-gray-700 mb-3">
            When you apply to multiple rental properties in the UK, letting agents repeat the same checks for each application. This rental application readiness checker helps you understand what's typically required, so you can prepare your documents and information in advance.
          </p>
          <p className="text-gray-700">
            Save time on your rental applications by knowing what letting agents will check before you apply.
          </p>
        </div>
      </div>
    </div>
  );
}

