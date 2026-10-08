import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Compass, 
  ArrowRight
} from 'lucide-react';

export default function ProptiiStudioShowcase() {
  return (
    <section id="studio-showcase" className="py-20 sm:py-28 bg-white border-b border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-archivo font-bold text-gray-900 leading-tight">
            Built by the Makers of Council Connect & Nest Quest
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed [text-wrap:balance]">
            Proptii is engineered within <strong className="text-gray-900 font-semibold">Luxcity Technologies</strong>—an applied venture laboratory solving structural challenges across UK municipal governance, higher education, and residential investment.
          </p>
        </div>

        {/* 2 Sister Products Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Council Connect */}
          <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-10 border border-gray-200/90 hover:border-[#AACAFB] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#2F7DB0] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#DC5F12] uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                  Municipal Civic Tech
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-archivo text-gray-900 group-hover:text-[#2F7DB0] transition-colors">
                  Council Connect
                </h3>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                  Automated Public Sector Housing Allocation
                </p>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Deployed across UK local authorities to coordinate vulnerable families with vetted private landlords. Integrates automated compliance checks, cutting caseworker turnaround by 14 days and reducing council emergency housing budgets.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-gray-200/70 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Caseworker Efficiency Lift</span>
                  <span className="font-bold text-emerald-600">+72% Time Saved</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Landlord Vetting Protocol</span>
                  <span className="font-bold text-gray-900">100% Statutory Compliant</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200/70 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Live Enterprise Deployment</span>
              <Link
                to="/case-studies/council-connect-streamlining"
                className="text-xs font-bold text-[#2F7DB0] hover:text-[#DC5F12] flex items-center gap-1 group-hover:underline"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Nest Quest */}
          <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-10 border border-gray-200/90 hover:border-[#AACAFB] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#DC5F12] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-[#2F7DB0] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  Higher Education & PBSA
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold font-archivo text-gray-900 group-hover:text-[#2F7DB0] transition-colors">
                  Nest Quest
                </h3>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
                  Verified Student Accommodation Network
                </p>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Certified university housing portal and student roommate matching engine. Combines university identity verification with automated guarantor checks to eliminate rental deposits fraud and streamline shared tenancies.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-gray-200/70 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Students Matched & Housed</span>
                  <span className="font-bold text-[#DC5F12]">8,500+ Verified Students</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 font-medium">Fraud Incident Rate</span>
                  <span className="font-bold text-emerald-600">0.00% Zero Fraud</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200/70 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500">Live Campus Deployment</span>
              <Link
                to="/case-studies/nest-quest-student-matching"
                className="text-xs font-bold text-[#2F7DB0] hover:text-[#DC5F12] flex items-center gap-1 group-hover:underline"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
