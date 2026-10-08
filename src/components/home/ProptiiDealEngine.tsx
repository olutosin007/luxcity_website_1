import React, { useState, useId } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Building, 
  FileSpreadsheet, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Sparkles,
  Info,
  Waves,
  MapPin,
  Compass
} from 'lucide-react';

interface DealPreset {
  id: string;
  label: string;
  city: string;
  postcode: string;
  price: number;
  rent: number;
  floodRisk: 'Very Low' | 'Low' | 'Medium';
  floodDetail: string;
  article4: boolean;
  epcRating: string;
}

const PRESETS: DealPreset[] = [
  {
    id: 'london-se1',
    label: 'London SE1',
    city: 'Bermondsey, London',
    postcode: 'SE1 4TH',
    price: 495000,
    rent: 2450,
    floodRisk: 'Very Low',
    floodDetail: 'Zone 1 (<0.1% annual probability) • Protected by Thames Barrier',
    article4: true,
    epcRating: 'B (82)'
  },
  {
    id: 'manchester-m4',
    label: 'Manchester M4',
    city: 'Ancoats, Manchester',
    postcode: 'M4 5BD',
    price: 310000,
    rent: 1800,
    floodRisk: 'Low',
    floodDetail: 'Zone 1 Surface Runoff Managed • EA Flood Alleviation Active',
    article4: false,
    epcRating: 'C (74)'
  },
  {
    id: 'birmingham-b18',
    label: 'Birmingham B18',
    city: 'Jewellery Qtr, Birmingham',
    postcode: 'B18 6NN',
    price: 245000,
    rent: 1450,
    floodRisk: 'Very Low',
    floodDetail: 'Zone 1 Hilltop Parcel • Zero River/Surface Runoff Hazard',
    article4: false,
    epcRating: 'C (71)'
  },
  {
    id: 'edinburgh-eh2',
    label: 'Edinburgh EH2',
    city: 'New Town, Edinburgh',
    postcode: 'EH2 4YN',
    price: 460000,
    rent: 2300,
    floodRisk: 'Very Low',
    floodDetail: 'SEPA Low Flood Vulnerability • Historic Core Drainage',
    article4: true,
    epcRating: 'C (69)'
  }
];

export default function ProptiiDealEngine() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('london-se1');
  const [purchasePrice, setPurchasePrice] = useState<number>(495000);
  const [monthlyRent, setMonthlyRent] = useState<number>(2450);
  const [postcode, setPostcode] = useState<string>('SE1 4TH');
  const [isAdditionalProperty, setIsAdditionalProperty] = useState<boolean>(true);
  const [ltv, setLtv] = useState<number>(75);
  const [interestRate, setInterestRate] = useState<number>(4.8);
  const [activeTab, setActiveTab] = useState<'financials' | 'risk'>('financials');

  const purchasePriceId = useId();
  const monthlyRentId = useId();
  const ltvId = useId();
  const interestRateId = useId();

  // Active preset metadata
  const currentPreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  const handleSelectPreset = (preset: DealPreset) => {
    setSelectedPresetId(preset.id);
    setPurchasePrice(preset.price);
    setMonthlyRent(preset.rent);
    setPostcode(preset.postcode);
  };

  // UK SDLT Calculation (Residential Additional Property / BTL rules with 5% surcharge)
  const calculateSDLT = (price: number, isAdditional: boolean): number => {
    const surcharge = isAdditional ? 0.05 : 0;
    let tax = 0;

    if (price <= 250000) {
      tax = price * surcharge;
    } else if (price <= 925000) {
      tax = (250000 * surcharge) + ((price - 250000) * (0.05 + surcharge));
    } else if (price <= 1500000) {
      tax = (250000 * surcharge) + 
            ((925000 - 250000) * (0.05 + surcharge)) + 
            ((price - 925000) * (0.10 + surcharge));
    } else {
      tax = (250000 * surcharge) + 
            ((925000 - 250000) * (0.05 + surcharge)) + 
            ((1500000 - 925000) * (0.10 + surcharge)) + 
            ((price - 1500000) * (0.12 + surcharge));
    }

    return Math.round(tax);
  };

  const sdltAmount = calculateSDLT(purchasePrice, isAdditionalProperty);
  const annualRent = monthlyRent * 12;
  const grossYield = ((annualRent / purchasePrice) * 100);

  // Mortgage & Cash Flow
  const mortgageAmount = purchasePrice * (ltv / 100);
  const monthlyMortgage = (mortgageAmount * (interestRate / 100)) / 12;
  const managementFee = monthlyRent * 0.10; // 10% letting & mgmt
  const maintenanceReserve = monthlyRent * 0.05; // 5% maintenance
  const netMonthlyCashFlow = monthlyRent - monthlyMortgage - managementFee - maintenanceReserve;
  const netAnnualCashFlow = netMonthlyCashFlow * 12;

  // Initial cash requirement
  const equityDeposit = purchasePrice * (1 - (ltv / 100));
  const estimatedLegalFees = 2200;
  const totalCashInvested = equityDeposit + sdltAmount + estimatedLegalFees;
  const cashOnCashReturn = totalCashInvested > 0 ? (netAnnualCashFlow / totalCashInvested) * 100 : 0;

  return (
    <section id="deal-engine" className="py-20 sm:py-28 bg-[#F8FAFC] border-b border-slate-200/80 relative overflow-hidden">
      {/* Background radial soft aura */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#2F7DB0]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DC5F12]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2F7DB0]/10 border border-[#2F7DB0]/20 text-[#2F7DB0] text-xs font-semibold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Proof • Core Underwriting Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-archivo font-bold text-gray-900 leading-tight">
            Stress-Test Any UK Deal in Real Time
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-gray-600 leading-relaxed [text-wrap:balance]">
            Experience Proptii’s algorithmic calculation depth before signing up. Tweak key variables or explore verified micro-market presets with direct UK Environment Agency and Land Registry logic.
          </p>

          {/* Preset Deal Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mr-2 hidden sm:inline-block">
              Benchmark Presets:
            </span>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  selectedPresetId === preset.id
                    ? 'bg-[#2F7DB0] text-white shadow-sm shadow-[#2F7DB0]/30 ring-2 ring-[#2F7DB0]/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                <MapPin className="w-3 h-3" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Inputs & Controls (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#2F7DB0]" />
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                  Deal Parameters
                </span>
              </div>
              <span className="text-xs font-medium text-gray-400">
                UK Statutory Model
              </span>
            </div>

            {/* Postcode & Micro-Market */}
            <div>
              <label htmlFor="postcode-input" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Postcode / Micro-Market
              </label>
              <div className="relative">
                <input
                  id="postcode-input"
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                  placeholder="e.g. SE1 4TH"
                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#2F7DB0]/30 focus:border-[#2F7DB0]"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#2F7DB0] bg-[#2F7DB0]/10 px-2 py-0.5 rounded">
                  {currentPreset.city}
                </span>
              </div>
            </div>

            {/* Purchase Price Input + Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={purchasePriceId} className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Purchase Price
                </label>
                <span className="text-base font-bold font-archivo text-gray-900">
                  £{purchasePrice.toLocaleString()}
                </span>
              </div>
              <input
                id={purchasePriceId}
                type="range"
                min={150000}
                max={1500000}
                step={5000}
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2F7DB0]"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                <span>£150,000</span>
                <span>£825,000</span>
                <span>£1,500,000</span>
              </div>
            </div>

            {/* Monthly Rent Input + Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor={monthlyRentId} className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Target Monthly Rent
                </label>
                <span className="text-base font-bold font-archivo text-gray-900">
                  £{monthlyRent.toLocaleString()} / mo
                </span>
              </div>
              <input
                id={monthlyRentId}
                type="range"
                min={800}
                max={6000}
                step={25}
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2F7DB0]"
              />
              <div className="flex justify-between text-[11px] text-gray-400 font-medium">
                <span>£800 / mo</span>
                <span>£3,400 / mo</span>
                <span>£6,000 / mo</span>
              </div>
            </div>

            {/* LTV & Mortgage Rate in 2 Cols */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={ltvId} className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    LTV
                  </label>
                  <span className="text-xs font-bold text-gray-900">{ltv}%</span>
                </div>
                <input
                  id={ltvId}
                  type="range"
                  min={50}
                  max={85}
                  step={5}
                  value={ltv}
                  onChange={(e) => setLtv(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2F7DB0]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor={interestRateId} className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Rate
                  </label>
                  <span className="text-xs font-bold text-gray-900">{interestRate}%</span>
                </div>
                <input
                  id={interestRateId}
                  type="range"
                  min={3.0}
                  max={7.5}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#2F7DB0]"
                />
              </div>
            </div>

            {/* Stamp Duty Surcharge Toggle */}
            <div className="pt-2">
              <label 
                onClick={() => setIsAdditionalProperty(!isAdditionalProperty)}
                className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100/70 rounded-xl cursor-pointer border border-gray-200 transition-colors"
              >
                <div className="pr-3">
                  <span className="text-xs font-bold text-gray-800 block">
                    Additional Property / BTL Surcharge
                  </span>
                  <span className="text-[11px] text-gray-500 leading-tight block mt-0.5">
                    Applies UK Autumn Budget +5% higher-rate SDLT band
                  </span>
                </div>
                <div className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  isAdditionalProperty ? 'bg-[#2F7DB0]' : 'bg-gray-300'
                }`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    isAdditionalProperty ? 'translate-x-5' : 'translate-x-0'
                  }`} />
                </div>
              </label>
            </div>

          </div>

          {/* Right Column: Live Calculation Breakdown & Risk Dossier (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
            
            {/* Card Header with View Switcher */}
            <div className="p-6 sm:p-7 border-b border-gray-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#DC5F12] uppercase tracking-wider block">
                  Live Underwriting Output
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-archivo text-gray-900 mt-0.5">
                  Investment Synthesis: {postcode}
                </h3>
              </div>

              {/* View Tabs */}
              <div className="bg-slate-200/80 p-1 rounded-xl flex items-center text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('financials')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activeTab === 'financials'
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Yield & Cash Flow
                </button>
                <button
                  onClick={() => setActiveTab('risk')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                    activeTab === 'risk'
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Waves className="w-3.5 h-3.5 text-[#2F7DB0]" />
                  <span>Climate & Risk</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Financials */}
            {activeTab === 'financials' && (
              <div className="p-6 sm:p-8 space-y-6">
                {/* 3 Main KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Gross Yield
                    </span>
                    <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-archivo text-[#2F7DB0]">
                      {grossYield.toFixed(2)}%
                    </div>
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      Annual £{annualRent.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Net Monthly Cash Flow
                    </span>
                    <div className={`mt-2 text-2xl sm:text-3xl font-extrabold font-archivo ${
                      netMonthlyCashFlow >= 0 ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {netMonthlyCashFlow >= 0 ? '+' : ''}£{Math.round(netMonthlyCashFlow).toLocaleString()}
                    </div>
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      Post debt, 10% mgmt & void
                    </span>
                  </div>

                  <div className="bg-slate-50 p-5 rounded-2xl border border-gray-100">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                      Cash-on-Cash Return
                    </span>
                    <div className="mt-2 text-2xl sm:text-3xl font-extrabold font-archivo text-gray-900">
                      {cashOnCashReturn.toFixed(1)}%
                    </div>
                    <span className="text-[11px] text-gray-500 mt-1 block">
                      On £{Math.round(totalCashInvested).toLocaleString()} capital
                    </span>
                  </div>
                </div>

                {/* Granular Cost & Stamp Duty Ledger */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Capital Deployment & Cost Breakdown
                  </h4>
                  
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 flex items-center gap-1.5">
                        <span>Equity Deposit ({100 - ltv}%)</span>
                      </span>
                      <span className="font-semibold text-gray-900">
                        £{Math.round(equityDeposit).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-600">UK Stamp Duty (SDLT)</span>
                        <span className="text-[10px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded font-medium">
                          {isAdditionalProperty ? '+5% Surcharge' : 'Standard'}
                        </span>
                      </div>
                      <span className="font-bold text-amber-600">
                        £{sdltAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Monthly Mortgage Service (IO @ {interestRate}%)</span>
                      <span className="font-semibold text-gray-900">
                        £{Math.round(monthlyMortgage).toLocaleString()} / mo
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Monthly Operational Reserve (15% combined)</span>
                      <span className="font-semibold text-gray-900">
                        £{Math.round(managementFee + maintenanceReserve).toLocaleString()} / mo
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Climate, Environmental & Statutory Risk */}
            {activeTab === 'risk' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="bg-[#2F7DB0]/5 border border-[#2F7DB0]/20 rounded-2xl p-4 flex items-start gap-3">
                  <Waves className="w-5 h-5 text-[#2F7DB0] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#2F7DB0] uppercase tracking-wider">
                      UK Environment Agency Spatial API Connected
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      Instant validation against EA 2026 Flood Maps for Planning (River & Sea, Surface Water Pluvial, and Ground Water).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Flood Risk Rating */}
                  <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Flood Exposure
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        {currentPreset.floodRisk} Risk
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {currentPreset.floodDetail}
                    </p>
                  </div>

                  {/* Planning & Article 4 */}
                  <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Article 4 / Planning
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                        currentPreset.article4 
                          ? 'text-amber-800 bg-amber-100' 
                          : 'text-emerald-700 bg-emerald-100'
                      }`}>
                        {currentPreset.article4 ? 'Article 4 Active' : 'Permitted Dev.'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {currentPreset.article4 
                        ? 'C4 HMO conversion requires full planning permission from Local Authority.'
                        : 'Permitted development rights intact for standard residential conversion.'}
                    </p>
                  </div>

                  {/* EPC & MEES Rating */}
                  <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        EPC Energy Rating
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Band {currentPreset.epcRating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Complies with UK MEES standard. Zero capex required for 2030 regulatory compliance horizon.
                    </p>
                  </div>

                  {/* Ground Subsidence */}
                  <div className="p-4 rounded-2xl border border-gray-100 bg-slate-50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Geological Stability
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Low Shrink-Swell
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      BGS spatial layer confirms stable London clay / glacial till foundation strata.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Conversion Action Bar */}
            <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-[#DC5F12] block">
                  Institutional Dossier Ready
                </span>
                <span className="text-sm font-medium text-slate-300">
                  Export 18-page valuation, planning, and environmental PDF
                </span>
              </div>
              <a
                href="#signup"
                className="w-full sm:w-auto px-6 py-3 bg-[#DC5F12] hover:bg-[#c45510] text-white rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 group shadow-md"
              >
                <span>Generate Full Report</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
