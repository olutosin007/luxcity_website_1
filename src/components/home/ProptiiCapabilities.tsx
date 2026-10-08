import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  UserCheck, 
  PenTool, 
  Database, 
  Building2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

export default function ProptiiCapabilities() {
  const capabilities = [
    {
      id: 'search',
      title: 'Intelligent Property Search',
      description: 'Multimodal AI that understands natural language queries, lifestyle criteria, spatial room geometry, and micro-commute dynamics.',
      icon: Search,
    },
    {
      id: 'referencing',
      title: 'Online Tenant Referencing',
      description: 'Thorough referencing completed 100% online, conducted by specialists with digital identity checks, Open Banking income verification, and credit diligence.',
      icon: UserCheck,
    },
    {
      id: 'contracts',
      title: 'Digital Contract Signage',
      description: 'Legally compliant AST agreements generated dynamically with tamper-proof e-signatures and automated deposit protection (DPS) lodging.',
      icon: PenTool,
    },
    {
      id: 'data',
      title: 'Statutory Government Data',
      description: 'Direct real-time feeds from HM Land Registry, UK Environment Agency GIS flood layers, EPC registers, and 317 Local Planning Authorities.',
      icon: Database,
    },
    {
      id: 'management',
      title: 'Property & Tenancy Management',
      description: 'Automated rent reconciliation via Direct Debit, statutory safety renewals including Gas Safe and EICR, and proactive maintenance lifecycle tracking.',
      icon: Building2,
    },
    {
      id: 'communication',
      title: 'Two-Way Communication',
      description: 'Direct in-app messaging between agents and tenants with automated maintenance triage, contractor dispatch, and live status updates.',
      icon: MessageSquare,
    },
  ];

  return (
    <section id="how-proptii-works" className="py-20 sm:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline (Styled matching 'Two platforms built on the same intelligence foundation') */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-archivo font-normal text-[#2F7DB0] leading-[1.15] tracking-tight">
            How Proptii Works
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed [text-wrap:balance]">
            Intelligent infrastructure for every stage of the rental lifecycle, from AI-driven discovery and online referencing to digital contracts, government statutory data, and two-way management.
          </p>
        </div>

        {/* Unified Visual Container (Matching the container holding Proptii for Tenants / Agents) */}
        <div className="bg-[#FAF7F2] rounded-3xl sm:rounded-[36px] border border-stone-300/80 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
          
          {/* 6-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.id}
                  className="group relative rounded-3xl p-7 sm:p-8 bg-white border border-stone-200/90 shadow-2xs hover:shadow-2xl transition-all duration-500 ease-out flex flex-col justify-between min-h-[290px] sm:min-h-[310px] overflow-hidden cursor-default -translate-y-0 hover:-translate-y-1.5"
                >
                  {/* Hover Gradient Background Overlay (Hero Gradient: Purple to Indigo to Blue) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none" />

                  {/* Top: Icon in Rounded Box */}
                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-2xs flex items-center justify-center text-gray-900 group-hover:bg-white/15 group-hover:border-white/25 group-hover:text-white transition-all duration-300 backdrop-blur-md">
                      <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Bottom: Title & Description */}
                  <div className="relative z-10 pt-8 sm:pt-12 space-y-2.5">
                    <h3 className="text-xl sm:text-[22px] font-archivo font-bold text-gray-900 group-hover:text-white transition-colors duration-300 tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-gray-600 group-hover:text-blue-100/90 transition-colors duration-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Explore Proptii Button Beneath the Container */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            to="/case-studies/proptii-ai-discovery"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-orange-500/25 group cursor-pointer"
          >
            <span>Explore Proptii</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
