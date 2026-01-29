import { useState } from 'react';
import { ArrowLeft, Download, Info, TrendingUp, Zap, Database, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { jsPDF } from 'jspdf';
import DataCollectionForm from '../../components/DataCollectionForm';
import { TOOL_SUBMISSION_URL } from '../../config/toolSubmission';

interface CapabilityScore {
  technology: number;
  data: number;
  team: number;
  budget: number;
}

interface GrowthStage {
  id: string;
  name: string;
  range: string;
  description: string;
}

const growthStages: GrowthStage[] = [
  { id: 'starter', name: 'Starter/Small Business', range: '1-10 properties', description: 'Early-stage operations, building processes' },
  { id: 'growing', name: 'Growing', range: '11-100 properties', description: 'Scaling operations, need efficiency gains' },
  { id: 'established', name: 'Established', range: '101-1000 properties', description: 'Mature operations, optimization focus' },
  { id: 'enterprise', name: 'Enterprise', range: '1000+ properties', description: 'Large-scale operations, transformation opportunities' }
];

const capabilityLabels = {
  technology: { label: 'Technology Infrastructure', icon: Zap, description: 'Current tech stack, integration capabilities, automation level' },
  data: { label: 'Data Maturity', icon: Database, description: 'Data collection, storage, quality, and analytics capabilities' },
  team: { label: 'Team Readiness', icon: Users, description: 'Team skills, AI awareness, change management readiness' },
  budget: { label: 'Budget & Resources', icon: DollarSign, description: 'Available budget, resources, and investment capacity' }
};

export default function AIReadinessAssessment() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<CapabilityScore>({
    technology: 50,
    data: 50,
    team: 50,
    budget: 50
  });
  const [showResults, setShowResults] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [activeContext, setActiveContext] = useState<keyof CapabilityScore | null>(null);

  const calculateReadiness = () => {
    if (!selectedStage) return;
    
    // If data was already submitted, skip the form and show results directly
    if (dataSubmitted) {
      setShowResults(true);
      return;
    }
    
    // First time - show data collection form
    setShowDataForm(true);
  };

  const adjustParameters = () => {
    // Hide results and allow user to adjust parameters
    setShowResults(false);
  };

  const handleDataSubmit = async (formData: any) => {
    // Additional tool data to include in submission
    const toolData = {
      growthStage: selectedStage,
      capabilities: capabilities,
      avgScore: avgScore,
      readinessLevel: readinessLevel
    };

    try {
      // Send to Google Sheets Apps Script with tool-specific data.
      // Use no-cors and no custom headers so the browser doesn't block the request.
      await fetch(TOOL_SUBMISSION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          ...formData,
          toolName: 'AI Readiness Assessment',
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

  // Generate dynamic recommendations based on growth stage, capabilities, and readiness level
  const generateRecommendations = () => {
    if (!selectedStage) return { quickWins: [], pilots: [], transformation: [] };

    const stage = growthStages.find(s => s.id === selectedStage);
    const lowestCapability = Object.entries(capabilities).reduce((min, [key, value]) => 
      value < min.value ? { key, value } : min, 
      { key: 'technology', value: capabilities.technology }
    );

    const quickWins: string[] = [];
    const pilots: string[] = [];
    const transformation: string[] = [];

    const avgScore = (capabilities.technology + capabilities.data + capabilities.team + capabilities.budget) / 4;
    const readinessLevel = avgScore >= 75 ? 'High' : avgScore >= 50 ? 'Medium' : 'Low';

    // Quick Wins - based on readiness level and lowest capability
    if (readinessLevel === 'Low') {
      if (lowestCapability.key === 'technology') {
        quickWins.push('Start with simple automation tools (email templates, calendar scheduling)');
        quickWins.push('Use existing property management software AI features');
        quickWins.push('Implement basic chatbots for common tenant queries');
      } else if (lowestCapability.key === 'data') {
        quickWins.push('Begin collecting basic property data in a centralized spreadsheet');
        quickWins.push('Set up simple tracking for maintenance requests and tenant communications');
        quickWins.push('Document your current processes to identify data collection opportunities');
      } else if (lowestCapability.key === 'team') {
        quickWins.push('Provide team training on basic AI concepts and property tech tools');
        quickWins.push('Start with user-friendly AI tools that require minimal training');
        quickWins.push('Create a simple guide for your team on available AI tools');
      } else {
        quickWins.push('Explore free or low-cost AI tools (ChatGPT, Google Workspace AI features)');
        quickWins.push('Start with tools that offer free trials or freemium models');
        quickWins.push('Focus on AI tools that replace manual tasks to show immediate ROI');
      }
    } else if (readinessLevel === 'Medium') {
      if (selectedStage === 'starter' || selectedStage === 'growing') {
        quickWins.push('Implement AI-powered document processing for rental applications');
        quickWins.push('Set up automated tenant communication chatbots');
        quickWins.push('Deploy predictive maintenance scheduling based on property age and history');
      } else {
        quickWins.push('Automate routine tenant communications and follow-ups');
        quickWins.push('Implement AI-driven document classification and storage');
        quickWins.push('Set up automated rent collection reminders and payment tracking');
      }
    } else { // High readiness
      quickWins.push('Deploy AI-powered tenant screening and application processing');
      quickWins.push('Implement intelligent maintenance request routing and prioritization');
      quickWins.push('Set up automated compliance checking and certificate renewal alerts');
    }

    // 3-Month Pilots - based on growth stage and capability strengths
    if (selectedStage === 'starter') {
      pilots.push('Pilot AI-powered property listing optimization');
      pilots.push('Test automated tenant onboarding workflows');
      pilots.push('Try AI-driven market analysis for rental pricing');
    } else if (selectedStage === 'growing') {
      if (capabilities.technology >= 60) {
        pilots.push('Pilot AI-driven rental pricing optimization across your portfolio');
        pilots.push('Test automated compliance checking systems');
        pilots.push('Explore AI-powered tenant screening tools');
      } else {
        pilots.push('Pilot integration of AI tools with your existing property management system');
        pilots.push('Test AI-powered reporting and analytics dashboards');
        pilots.push('Explore automated document generation for tenancy agreements');
      }
    } else if (selectedStage === 'established') {
      pilots.push('Pilot predictive analytics for portfolio optimization');
      pilots.push('Test AI-driven maintenance cost forecasting');
      pilots.push('Explore automated tenant retention and satisfaction analysis');
    } else { // Enterprise
      pilots.push('Pilot enterprise AI platform integration');
      pilots.push('Test advanced predictive analytics for portfolio management');
      pilots.push('Explore AI-driven market intelligence and competitive analysis');
    }

    // 12-Month Transformation - based on growth stage and readiness
    if (selectedStage === 'starter' && readinessLevel === 'Low') {
      transformation.push('Build a basic AI-enhanced property management workflow');
      transformation.push('Establish data collection and storage processes');
      transformation.push('Create a roadmap for gradual AI adoption as you grow');
    } else if (selectedStage === 'starter' || selectedStage === 'growing') {
      transformation.push('Build comprehensive AI-powered property management platform');
      transformation.push('Implement predictive analytics for maintenance and tenant management');
      transformation.push('Develop AI-driven market intelligence capabilities');
    } else if (selectedStage === 'established') {
      transformation.push('Build enterprise-grade AI-powered property management ecosystem');
      transformation.push('Implement advanced predictive analytics for portfolio optimization');
      transformation.push('Develop AI-driven market intelligence and competitive analysis tools');
      transformation.push('Create automated workflows for all routine property management tasks');
    } else { // Enterprise
      transformation.push('Build comprehensive AI transformation platform across all operations');
      transformation.push('Implement advanced AI-driven portfolio optimization and market intelligence');
      transformation.push('Develop custom AI solutions tailored to your specific business needs');
      transformation.push('Create AI-powered predictive models for investment and divestment decisions');
    }

    // Add capability-specific recommendations
    if (capabilities.technology < 50) {
      quickWins.push('Assess your current tech stack and identify integration opportunities');
    }
    if (capabilities.data < 50) {
      quickWins.push('Start collecting and organizing your property data systematically');
    }
    if (capabilities.team < 50) {
      quickWins.push('Invest in team training on AI tools and property technology');
    }
    if (capabilities.budget < 50) {
      quickWins.push('Focus on free or low-cost AI tools initially to demonstrate value');
    }

    return { quickWins, pilots, transformation };
  };

  const generatePDF = () => {
    if (!selectedStage) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin + 20;

    const stage = growthStages.find(s => s.id === selectedStage);
    const avgScore = (capabilities.technology + capabilities.data + capabilities.team + capabilities.budget) / 4;
    const readinessLevel = avgScore >= 75 ? 'High' : avgScore >= 50 ? 'Medium' : 'Low';

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Readiness Assessment Report', margin, yPosition);
    yPosition += 15;

    // Date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.text(`Generated on ${date}`, margin, yPosition);
    yPosition += 20;

    // Growth Stage
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Growth Stage Assessment', margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    if (stage) {
      doc.text(`Stage: ${stage.name} (${stage.range})`, margin, yPosition);
      yPosition += 8;
      const stageLines = doc.splitTextToSize(stage.description, maxWidth);
      doc.text(stageLines, margin, yPosition);
      yPosition += 15;
    }

    // Capability Scores
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Capability Assessment', margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    Object.entries(capabilities).forEach(([key, value]) => {
      const label = capabilityLabels[key as keyof CapabilityScore].label;
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin + 20;
      }
      doc.text(`${label}: ${value}%`, margin, yPosition);
      yPosition += 10;
    });

    yPosition += 10;

    // Overall Readiness
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Overall AI Readiness', margin, yPosition);
    yPosition += 10;
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Level: ${readinessLevel} (${avgScore.toFixed(0)}%)`, margin, yPosition);
    yPosition += 15;

    // Recommendations
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Next Steps', margin, yPosition);
    yPosition += 10;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    // Generate recommendations for PDF
    const pdfRecommendations = generateRecommendations();
    const allRecs = [
      ...pdfRecommendations.quickWins.map(r => `Quick Win: ${r}`),
      ...pdfRecommendations.pilots.map(r => `3-Month Pilot: ${r}`),
      ...pdfRecommendations.transformation.map(r => `12-Month Plan: ${r}`)
    ];

    allRecs.forEach((rec, index) => {
      if (yPosition > pageHeight - 30) {
        doc.addPage();
        yPosition = margin + 20;
      }
      doc.text(`${index + 1}. ${rec}`, margin, yPosition);
      yPosition += 10;
    });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('LuxCity AI Readiness Assessment Tool', margin, pageHeight - 10);

    doc.save('ai-readiness-assessment.pdf');
  };

  const avgScore = selectedStage 
    ? (capabilities.technology + capabilities.data + capabilities.team + capabilities.budget) / 4 
    : 0;
  const readinessLevel = avgScore >= 75 ? 'High' : avgScore >= 50 ? 'Medium' : 'Low';

  const recommendations = generateRecommendations();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="AI Readiness Assessment Tool | Free PropTech Assessment - Luxcity"
        description="Assess your property business's AI readiness. Get a personalized roadmap for AI adoption based on your growth stage and capabilities. Free assessment tool for property businesses."
        canonical="/tools/ai-readiness-assessment"
        keywords={[
          'AI readiness assessment',
          'property AI assessment',
          'PropTech AI tool',
          'AI adoption roadmap',
          'property business AI',
          'real estate AI readiness',
          'AI capability assessment',
          'property technology assessment'
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

        {!showResults && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 font-archivo">
              AI Readiness Assessment
            </h1>
            <p className="text-lg text-gray-600 mb-8 font-archivo">
              Identify the best ways to use AI based on your growth journey and current capabilities. 
              Get a personalized roadmap to avoid costly wrong investments and prioritize high-ROI AI initiatives.
            </p>

          {/* Growth Stage Selection */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-archivo">1. Select Your Growth Stage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {growthStages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`p-6 rounded-lg border-2 text-left transition-all ${
                    selectedStage === stage.id
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900 font-archivo">{stage.name}</h3>
                    {selectedStage === stage.id && (
                      <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-indigo-600 font-medium mb-2 font-archivo">{stage.range}</p>
                  <p className="text-sm text-gray-600 font-archivo">{stage.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Capability Assessment with Sliders */}
          {selectedStage && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 font-archivo">2. Assess Your Capabilities</h2>
              <div className="space-y-6">
                {Object.entries(capabilityLabels).map(([key, { label, icon: Icon, description }]) => {
                  const value = capabilities[key as keyof CapabilityScore];
                  return (
                    <div 
                      key={key}
                      className="border rounded-lg p-6 hover:border-indigo-300 transition-colors"
                      onMouseEnter={() => setActiveContext(key as keyof CapabilityScore)}
                      onMouseLeave={() => setActiveContext(null)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-indigo-600" />
                          <h3 className="text-lg font-semibold text-gray-900 font-archivo">{label}</h3>
                          <button
                            onClick={() => setActiveContext(activeContext === key ? null : key as keyof CapabilityScore)}
                            className="ml-2 text-indigo-600 hover:text-indigo-700"
                          >
                            <Info className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-2xl font-bold text-indigo-600 font-archivo">{value}%</span>
                      </div>
                      
                      {activeContext === key && (
                        <div className="mb-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
                          <p className="text-sm text-gray-700 font-archivo">{description}</p>
                        </div>
                      )}

                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => setCapabilities({
                          ...capabilities,
                          [key]: parseInt(e.target.value)
                        })}
                        className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2 font-archivo">
                        <span>Low</span>
                        <span>Medium</span>
                        <span>High</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {selectedStage && (
            <button
              onClick={calculateReadiness}
              className="w-full bg-[#2e70b3] text-white py-3 rounded-lg font-medium hover:bg-[#2565a0] transition font-archivo"
            >
              {dataSubmitted ? 'Recalculate My AI Readiness' : 'Calculate My AI Readiness'}
            </button>
          )}
          </div>
        )}

        {/* Data Collection Form Modal */}
        <DataCollectionForm 
          onSubmit={handleDataSubmit}
          toolName="AI Readiness Assessment"
          isOpen={showDataForm && !dataSubmitted}
          onClose={() => setShowDataForm(false)}
        />

        {/* Results */}
        {showResults && dataSubmitted && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 font-archivo">Your AI Readiness Assessment</h2>
                <div className="flex items-center space-x-4">
                  <div className={`text-4xl font-bold font-archivo ${
                    readinessLevel === 'High' ? 'text-green-600' :
                    readinessLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {readinessLevel}
                  </div>
                  <div className="text-2xl text-gray-600 font-archivo">
                    {avgScore.toFixed(0)}% Ready
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={adjustParameters}
                  className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-archivo"
                >
                  <span className="font-archivo">Adjust Parameters</span>
                </button>
                <button
                  onClick={generatePDF}
                  className="inline-flex items-center px-6 py-3 bg-[#2e70b3] text-white rounded-lg hover:bg-[#2565a0] transition font-archivo"
                >
                  <Download className="h-5 w-5 mr-2" />
                  <span className="font-archivo">Download PDF Report</span>
                </button>
              </div>
            </div>

            {/* Capability Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(capabilityLabels).map(([key, { label, icon: Icon }]) => {
                const value = capabilities[key as keyof CapabilityScore];
                return (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-indigo-600" />
                        <span className="font-medium text-gray-900 font-archivo">{label}</span>
                      </div>
                      <span className="text-lg font-bold text-indigo-600 font-archivo">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recommendations */}
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center font-archivo">
                <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
                Recommended Next Steps
              </h3>
              <p className="text-sm text-gray-600 mb-4 font-archivo">
                Based on your {selectedStage && growthStages.find(s => s.id === selectedStage)?.name} stage, 
                {readinessLevel} readiness level ({avgScore.toFixed(0)}%), and capability assessment.
              </p>
              <div className="space-y-4">
                {recommendations.quickWins.length > 0 && (
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 font-archivo">Immediate Quick Wins</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 font-archivo">
                      {recommendations.quickWins.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {recommendations.pilots.length > 0 && (
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 font-archivo">3-Month Pilot Opportunities</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 font-archivo">
                      {recommendations.pilots.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {recommendations.transformation.length > 0 && (
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2 font-archivo">12-Month Transformation Plan</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 font-archivo">
                      {recommendations.transformation.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-archivo">Why This Matters</h3>
          <p className="text-gray-700 mb-3 font-archivo">
            AI investments can be costly if not aligned with your business stage and capabilities. 
            This assessment helps you prioritize AI initiatives that deliver real value and avoid 
            costly mistakes.
          </p>
          <p className="text-gray-700 font-archivo">
            Get a personalized roadmap based on your specific situation, not generic advice.
          </p>
        </div>
      </div>
    </div>
  );
}
