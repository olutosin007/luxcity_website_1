import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export default function ProptiiSocialProof() {
  const complianceBadges = [
    {
      title: 'UK Environment Agency',
      tag: 'Direct GIS API',
      description: 'Live ingestion of 2026 Flood Maps for Planning, surface water runoff contours, and sea barrier resilience.'
    },
    {
      title: 'HM Land Registry',
      tag: 'Title Boundaries',
      description: 'Automated polygon parsing and verified historical Price Paid dataset synchronization across England & Wales.'
    },
    {
      title: 'RICS Aligned Standards',
      tag: 'Red Book Calibrated',
      description: 'Cash-flow and valuation algorithms calibrated to Royal Institution of Chartered Surveyors standards.'
    },
    {
      title: 'ISO 27001 & SOC 2 Compliant',
      tag: 'Bank-Grade Security',
      description: 'End-to-end 256-bit AES encryption, granular role-based permissions, and enterprise audit logging.'
    }
  ];

  return (
    <section id="validation" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-archivo font-normal text-[#2F7DB0] leading-[1.15] tracking-tight">
            Institutional Trust Backed by Ground-Truth Data
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed [text-wrap:balance]">
            Proptii powers acquisition decisions for active residential landlords, family offices, and build-to-rent operators with verified statutory datasets.
          </p>
        </div>

        {/* Data & Compliance Authority Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-[#DC5F12] uppercase tracking-widest block mb-1">
              Data Provenance & Compliance
            </span>
            <h3 className="text-2xl font-bold font-archivo text-gray-900">
              Direct Government & Statutory Integrations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceBadges.map((badge, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-stone-50/70 border border-stone-200/80 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#2F7DB0] uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                      {badge.tag}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <h4 className="text-sm font-bold font-archivo text-gray-900">
                    {badge.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed mt-1">
                    {badge.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Feed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
