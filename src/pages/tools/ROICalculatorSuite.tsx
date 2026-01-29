import { useState } from 'react';
import { ArrowLeft, Download, TrendingUp, GitCompare, Calculator, Lightbulb, Home, Zap, Droplets, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import { jsPDF } from 'jspdf';
import DataCollectionForm from '../../components/DataCollectionForm';
import { TOOL_SUBMISSION_URL } from '../../config/toolSubmission';

interface ROIScenario {
  id: string;
  name: string;
  category: string;
  icon: any;
  cost: number;
  rentalIncrease: number;
  valueIncrease: number;
  paybackPeriod: number;
  annualROI: number;
  description: string;
}

const defaultScenarios: ROIScenario[] = [
  {
    id: 'kitchen-renovation',
    name: 'Kitchen Renovation',
    category: 'improvement',
    icon: Home,
    cost: 15000,
    rentalIncrease: 200,
    valueIncrease: 20000,
    paybackPeriod: 0,
    annualROI: 0,
    description: 'Modern kitchen with new appliances, cabinets, and worktops'
  },
  {
    id: 'bathroom-upgrade',
    name: 'Bathroom Upgrade',
    category: 'improvement',
    icon: Droplets,
    cost: 8000,
    rentalIncrease: 150,
    valueIncrease: 12000,
    paybackPeriod: 0,
    annualROI: 0,
    description: 'New bathroom suite, tiling, and fixtures'
  },
  {
    id: 'energy-efficiency',
    name: 'Energy Efficiency Upgrades',
    category: 'improvement',
    icon: Zap,
    cost: 5000,
    rentalIncrease: 50,
    valueIncrease: 8000,
    paybackPeriod: 0,
    annualROI: 0,
    description: 'Insulation, double glazing, efficient heating system'
  },
  {
    id: 'garden-improvement',
    name: 'Garden & Outdoor Space',
    category: 'improvement',
    icon: Home,
    cost: 3000,
    rentalIncrease: 100,
    valueIncrease: 5000,
    paybackPeriod: 0,
    annualROI: 0,
    description: 'Landscaping, decking, outdoor furniture area'
  },
  {
    id: 'smart-home',
    name: 'Smart Home Technology',
    category: 'improvement',
    icon: Zap,
    cost: 2000,
    rentalIncrease: 75,
    valueIncrease: 3000,
    paybackPeriod: 0,
    annualROI: 0,
    description: 'Smart thermostats, lighting, security systems'
  },
  {
    id: 'property-extension',
    name: 'Property Extension',
    category: 'improvement',
    icon: Home,
    cost: 50000,
    rentalIncrease: 500,
    valueIncrease: 75000,
    paybackPeriod: 0,
    annualROI: 0,
    description: 'Single-storey extension adding living space'
  }
];

function calculateROI(scenario: ROIScenario): ROIScenario {
  const annualRentalIncome = scenario.rentalIncrease * 12;
  const totalValueGain = scenario.valueIncrease;
  const totalReturn = annualRentalIncome + (totalValueGain / 10); // Value gain amortized over 10 years
  const annualROI = ((totalReturn / scenario.cost) * 100);
  const paybackPeriod = scenario.cost / annualRentalIncome;

  return {
    ...scenario,
    annualROI: Math.round(annualROI * 10) / 10,
    paybackPeriod: Math.round(paybackPeriod * 10) / 10
  };
}

export default function ROICalculatorSuite() {
  const [scenarios, setScenarios] = useState<ROIScenario[]>(
    defaultScenarios.map(calculateROI)
  );
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showDataForm, setShowDataForm] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [editingScenario, setEditingScenario] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ cost: number; rentalIncrease: number; valueIncrease: number } | null>(null);

  const handleDataSubmit = async (formData: any) => {
    // Additional tool data to include in submission
    const comparedScenarios = scenarios.filter(s => selectedScenarios.includes(s.id));
    const toolData = {
      selectedScenarios: selectedScenarios,
      scenarioCount: selectedScenarios.length,
      topScenario: comparedScenarios.length > 0 
        ? comparedScenarios.sort((a, b) => b.annualROI - a.annualROI)[0]
        : null,
      allScenarios: scenarios.map(s => ({
        id: s.id,
        name: s.name,
        cost: s.cost,
        annualROI: s.annualROI,
        paybackPeriod: s.paybackPeriod
      }))
    };

    try {
      // Send to Google Sheets Apps Script with tool-specific data.
      // Use no-cors and no custom headers so the browser doesn't block the request.
      await fetch(TOOL_SUBMISSION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          ...formData,
          toolName: 'ROI Calculator Suite',
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

  const toggleScenario = (id: string) => {
    setSelectedScenarios(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const updateScenario = (id: string, updates: Partial<ROIScenario>) => {
    setScenarios(prev => prev.map(s => {
      if (s.id === id) {
        const updated = { ...s, ...updates };
        return calculateROI(updated);
      }
      return s;
    }));
    setEditingScenario(null);
    setEditValues(null);
  };

  const startEdit = (scenario: ROIScenario) => {
    setEditingScenario(scenario.id);
    setEditValues({
      cost: scenario.cost,
      rentalIncrease: scenario.rentalIncrease,
      valueIncrease: scenario.valueIncrease
    });
  };

  const saveEdit = (id: string) => {
    if (editValues) {
      updateScenario(id, editValues);
    }
  };

  const compareScenarios = () => {
    if (selectedScenarios.length < 2) {
      alert('Please select at least 2 scenarios to compare');
      return;
    }
    setShowDataForm(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin + 20;

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('ROI Calculator Suite Report', margin, yPosition);
    yPosition += 15;

    const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated on ${date}`, margin, yPosition);
    yPosition += 20;

    // All Scenarios
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Investment Scenarios Analysis', margin, yPosition);
    yPosition += 10;

    scenarios.forEach((scenario, index) => {
      if (yPosition > pageHeight - 60) {
        doc.addPage();
        yPosition = margin + 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${scenario.name}`, margin, yPosition);
      yPosition += 10;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.text(`Cost: £${scenario.cost.toLocaleString()}`, margin, yPosition);
      yPosition += 8;
      doc.text(`Monthly Rental Increase: £${scenario.rentalIncrease}`, margin, yPosition);
      yPosition += 8;
      doc.text(`Property Value Increase: £${scenario.valueIncrease.toLocaleString()}`, margin, yPosition);
      yPosition += 8;
      doc.text(`Annual ROI: ${scenario.annualROI}%`, margin, yPosition);
      yPosition += 8;
      doc.text(`Payback Period: ${scenario.paybackPeriod} years`, margin, yPosition);
      yPosition += 12;
    });

    // Comparison Section
    if (selectedScenarios.length >= 2) {
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = margin + 20;
      }

      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Scenario Comparison', margin, yPosition);
      yPosition += 10;

      const compared = scenarios.filter(s => selectedScenarios.includes(s.id));
      compared.sort((a, b) => b.annualROI - a.annualROI);

      compared.forEach((scenario, index) => {
        if (yPosition > pageHeight - 50) {
          doc.addPage();
          yPosition = margin + 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`${index + 1}. ${scenario.name} - ${scenario.annualROI}% ROI`, margin, yPosition);
        yPosition += 8;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Payback: ${scenario.paybackPeriod} years | Cost: £${scenario.cost.toLocaleString()}`, margin, yPosition);
        yPosition += 12;
      });
    }

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('LuxCity ROI Calculator Suite', margin, pageHeight - 10);

    doc.save('roi-calculator-report.pdf');
  };

  const comparedScenarios = scenarios.filter(s => selectedScenarios.includes(s.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="ROI Calculator Suite | Property Investment ROI Tool - Luxcity"
        description="Calculate ROI for property improvements and investments. Compare scenarios, analyze payback periods, and make data-driven investment decisions. Free ROI calculator for property investors."
        canonical="/tools/roi-calculator-suite"
        keywords={[
          'property ROI calculator',
          'rental yield calculator',
          'property investment ROI',
          'property improvement ROI',
          'rental property calculator',
          'property ROI analysis',
          'investment ROI calculator',
          'property return calculator'
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
            ROI Calculator Suite
          </h1>
          <p className="text-lg text-gray-600 mb-8 font-archivo">
            Calculate return on investment for property improvements and investments. Compare multiple 
            scenarios side-by-side to make informed financial decisions before spending a single pound.
          </p>

          {/* Scenarios Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-archivo">Investment Scenarios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarios.map((scenario) => {
                const Icon = scenario.icon;
                const isSelected = selectedScenarios.includes(scenario.id);
                const isEditing = editingScenario === scenario.id;

                return (
                  <div
                    key={scenario.id}
                    className={`border-2 rounded-lg p-4 transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Icon className="h-5 w-5 text-indigo-600" />
                        <h3 className="font-bold text-gray-900 font-archivo">{scenario.name}</h3>
                      </div>
                      <button
                        onClick={() => toggleScenario(scenario.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? 'bg-[#2e70b3] border-[#2e70b3]'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                      </button>
                    </div>

                    {isEditing && editValues ? (
                      <div className="space-y-2">
                        <div>
                          <label className="text-xs text-gray-600 font-archivo">Cost (£)</label>
                          <input
                            type="number"
                            value={editValues.cost}
                            onChange={(e) => setEditValues({ ...editValues, cost: parseFloat(e.target.value) || 0 })}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 font-archivo">Monthly Rental Increase (£)</label>
                          <input
                            type="number"
                            value={editValues.rentalIncrease}
                            onChange={(e) => setEditValues({ ...editValues, rentalIncrease: parseFloat(e.target.value) || 0 })}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-600 font-archivo">Property Value Increase (£)</label>
                          <input
                            type="number"
                            value={editValues.valueIncrease}
                            onChange={(e) => setEditValues({ ...editValues, valueIncrease: parseFloat(e.target.value) || 0 })}
                            className="w-full px-2 py-1 border rounded text-sm"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => saveEdit(scenario.id)}
                            className="flex-1 bg-[#2e70b3] text-white text-xs py-1 rounded"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingScenario(null);
                              setEditValues(null);
                            }}
                            className="flex-1 bg-gray-200 text-gray-700 text-xs py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 mb-3 font-archivo">{scenario.description}</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 font-archivo">Cost:</span>
                            <span className="font-semibold font-archivo">£{scenario.cost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 font-archivo">Monthly Rental Increase:</span>
                            <span className="font-semibold font-archivo">£{scenario.rentalIncrease}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 font-archivo">Value Increase:</span>
                            <span className="font-semibold font-archivo">£{scenario.valueIncrease.toLocaleString()}</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600 font-archivo">Annual ROI:</span>
                              <span className={`text-lg font-bold font-archivo ${
                                scenario.annualROI >= 20 ? 'text-green-600' :
                                scenario.annualROI >= 10 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {scenario.annualROI}%
                              </span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1 font-archivo">
                              <span>Payback:</span>
                              <span>{scenario.paybackPeriod} years</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => startEdit(scenario)}
                          className="mt-3 text-xs text-indigo-600 hover:text-indigo-700"
                        >
                          Edit Values
                        </button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {selectedScenarios.length >= 2 && (
            <button
              onClick={compareScenarios}
              className="w-full bg-[#2e70b3] text-white py-3 rounded-lg font-medium hover:bg-[#2565a0] transition flex items-center justify-center font-archivo"
            >
              <GitCompare className="h-5 w-5 mr-2" />
              <span className="font-archivo">Compare Selected Scenarios</span>
            </button>
          )}
        </div>

        {/* Data Collection Form Modal */}
        <DataCollectionForm 
          onSubmit={handleDataSubmit}
          toolName="ROI Calculator Suite"
          isOpen={showDataForm && !dataSubmitted}
          onClose={() => setShowDataForm(false)}
        />

        {/* Results - Comparison View */}
        {showResults && dataSubmitted && comparedScenarios.length >= 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center font-archivo">
                  <GitCompare className="h-6 w-6 mr-2 text-indigo-600" />
                  Scenario Comparison
                </h2>
                <p className="text-gray-600 font-archivo">Ranked by Annual ROI</p>
              </div>
              <button
                onClick={generatePDF}
                className="inline-flex items-center px-6 py-3 bg-[#2e70b3] text-white rounded-lg hover:bg-[#2565a0] transition font-archivo"
              >
                <Download className="h-5 w-5 mr-2" />
                <span className="font-archivo">Download PDF Report</span>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {comparedScenarios
                .sort((a, b) => b.annualROI - a.annualROI)
                .map((scenario, index) => {
                  const Icon = scenario.icon;
                  const rating = index === 0 ? 'Best ROI' : index === 1 ? 'Good ROI' : 'Consider';
                  
                  return (
                    <div
                      key={scenario.id}
                      className={`border-2 rounded-lg p-6 ${
                        index === 0
                          ? 'border-green-500 bg-green-50'
                          : index === 1
                          ? 'border-yellow-500 bg-yellow-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-green-600' :
                            index === 1 ? 'bg-yellow-600' : 'bg-gray-600'
                          }`}>
                            <span className="text-white font-bold font-archivo">{index + 1}</span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <Icon className="h-5 w-5 text-indigo-600" />
                              <h3 className="text-xl font-bold text-gray-900 font-archivo">{scenario.name}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1 font-archivo">{scenario.description}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold font-archivo ${
                          index === 0 ? 'bg-green-600 text-white' :
                          index === 1 ? 'bg-yellow-600 text-white' : 'bg-gray-600 text-white'
                        }`}>
                          {rating}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-gray-600 mb-1 font-archivo">Annual ROI</p>
                          <p className={`text-2xl font-bold font-archivo ${
                            scenario.annualROI >= 20 ? 'text-green-600' :
                            scenario.annualROI >= 10 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {scenario.annualROI}%
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1 font-archivo">Payback Period</p>
                          <p className="text-2xl font-bold text-gray-900 font-archivo">{scenario.paybackPeriod} years</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1 font-archivo">Investment Cost</p>
                          <p className="text-2xl font-bold text-gray-900 font-archivo">£{scenario.cost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1 font-archivo">Monthly Increase</p>
                          <p className="text-2xl font-bold text-gray-900 font-archivo">£{scenario.rentalIncrease}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center font-archivo">
                <Lightbulb className="h-5 w-5 mr-2 text-indigo-600" />
                Recommendation
              </h3>
              <p className="text-sm text-gray-700 font-archivo">
                Based on your comparison, <strong>{comparedScenarios.sort((a, b) => b.annualROI - a.annualROI)[0].name}</strong> offers 
                the best return on investment with {comparedScenarios.sort((a, b) => b.annualROI - a.annualROI)[0].annualROI}% annual ROI 
                and a payback period of {comparedScenarios.sort((a, b) => b.annualROI - a.annualROI)[0].paybackPeriod} years. 
                Consider this option first if budget allows.
              </p>
            </div>
          </div>
        )}


        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-archivo">Why This Matters</h3>
          <p className="text-gray-700 mb-3 font-archivo">
            Property improvements can be expensive, and not all investments pay off equally. 
            This calculator helps you compare different scenarios before spending money, 
            ensuring you prioritize investments with the best returns.
          </p>
          <p className="text-gray-700 font-archivo">
            Make data-driven decisions by understanding ROI, payback periods, and comparing 
            multiple options side-by-side.
          </p>
        </div>
      </div>
    </div>
  );
}
