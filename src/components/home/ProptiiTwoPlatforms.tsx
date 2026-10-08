import React, { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  BarChart3,
  Search,
  FileText
} from 'lucide-react';

export default function ProptiiTwoPlatforms() {
  const [activeTab, setActiveTab] = useState<'tenant' | 'agent'>('tenant');

  return (
    <section id="two-platforms" className="py-20 sm:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-archivo font-normal text-[#2F7DB0] leading-[1.15] tracking-tight">
            Two platforms built on the same intelligence foundation
          </h2>
        </div>

        {/* 2-Option Platform Switcher Toggle */}
        <div className="flex items-center justify-center mb-10 sm:mb-12">
          <div className="inline-flex items-center bg-slate-100 p-1.5 rounded-full text-xs sm:text-sm font-semibold border border-slate-200/80 shadow-2xs">
            <button
              onClick={() => setActiveTab('tenant')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeTab === 'tenant'
                  ? 'bg-[#DC5F12] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-950'
              }`}
            >
              Tenant Dashboard
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeTab === 'agent'
                  ? 'bg-[#DC5F12] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-950'
              }`}
            >
              Agent Analytics
            </button>
          </div>
        </div>

        {/* The Unified Big Visual Container */}
        <div className="bg-[#FAF7F2] rounded-3xl sm:rounded-[36px] border border-stone-300/80 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
          
          {/* Tab 1: Tenant Platform */}
          {activeTab === 'tenant' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Text Header & Feature Pills */}
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2F7DB0]" />
                  <h3 className="text-2xl sm:text-3xl font-bold font-archivo text-gray-900">
                    Proptii for Tenants
                  </h3>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance]">
                  Discover homes tailored to your lifestyle, track referencing progress in real time, store certified tenancy contracts, and schedule viewings with zero friction.
                </p>

                <div className="pt-1 flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                  <span className="px-3.5 py-1.5 bg-white rounded-full border border-stone-200/90 shadow-2xs">
                    Lifestyle Matching
                  </span>
                  <span className="px-3.5 py-1.5 bg-white rounded-full border border-stone-200/90 shadow-2xs">
                    One-Click Referencing
                  </span>
                  <span className="px-3.5 py-1.5 bg-white rounded-full border border-stone-200/90 shadow-2xs">
                    Digital Tenancy Vault
                  </span>
                </div>
              </div>

              {/* Full-Fidelity Tenant Desktop Window */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                {/* Desktop Window Titlebar */}
                <div className="px-4 py-3 bg-slate-50/90 border-b border-gray-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500 ml-2 hidden sm:inline">
                      proptii.com/tenant/dashboard
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#2F7DB0] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    Tenant Portal
                  </span>
                </div>

                {/* Screenshot */}
                <div className="relative overflow-hidden bg-slate-100">
                  <img
                    src="/images/proptii-tenant-dashboard.png"
                    alt="Proptii Tenant Dashboard — Referencing Summary, Saved Listings & Tenancy Documents"
                    className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.005]"
                  />
                </div>

                {/* Card Sub-Bar */}
                <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <UserCheck className="w-3.5 h-3.5 text-[#2F7DB0]" />
                    <span className="font-semibold text-gray-900">40% Referencing Verified</span>
                    <span className="text-gray-300">•</span>
                    <span>Identity, Work, Address & Guarantor</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Active Tenancy Profile
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2: Agent Platform */}
          {activeTab === 'agent' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Text Header & Feature Pills */}
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC5F12]" />
                  <h3 className="text-2xl sm:text-3xl font-bold font-archivo text-gray-900">
                    Proptii for Agents & Landlords
                  </h3>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed [text-wrap:balance]">
                  Monitor portfolio performance, track real-time gross and net revenues, manage unit occupancy rates, and automate applicant vetting through integrated compliance checks.
                </p>

                <div className="pt-1 flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                  <span className="px-3.5 py-1.5 bg-white rounded-full border border-stone-200/90 shadow-2xs">
                    Revenue & Cash Flow Analytics
                  </span>
                  <span className="px-3.5 py-1.5 bg-white rounded-full border border-stone-200/90 shadow-2xs">
                    Occupancy Intelligence
                  </span>
                  <span className="px-3.5 py-1.5 bg-white rounded-full border border-stone-200/90 shadow-2xs">
                    Automated Applicant Screening
                  </span>
                </div>
              </div>

              {/* Full-Fidelity Agent Desktop Window */}
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col">
                {/* Desktop Window Titlebar */}
                <div className="px-4 py-3 bg-slate-50/90 border-b border-gray-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-500 ml-2 hidden sm:inline">
                      proptii.com/agent/analytics
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#DC5F12] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-100">
                    Agent & Landlord Suite
                  </span>
                </div>

                {/* Screenshot */}
                <div className="relative overflow-hidden bg-slate-100">
                  <img
                    src="/images/proptii-agent-analytics.png"
                    alt="Proptii Agent & Landlord Analytics — Monthly Revenue, Occupancy Rate & Unit Breakdown"
                    className="w-full h-auto object-cover object-top transition-transform duration-500 group-hover:scale-[1.005]"
                  />
                </div>

                {/* Card Sub-Bar */}
                <div className="p-4 sm:p-5 bg-white border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-3.5 h-3.5 text-[#DC5F12]" />
                    <span className="font-semibold text-gray-900">Portfolio Ledger</span>
                    <span className="text-gray-300">•</span>
                    <span>Revenue vs. Expenses Breakdown</span>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    Real-time Reporting
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
