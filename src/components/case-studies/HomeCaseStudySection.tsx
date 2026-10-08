import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES } from '../../data/caseStudiesData';

export default function HomeCaseStudySection() {
  const featuredStudies = CASE_STUDIES.filter(s => s.featured).slice(0, 3);
  const mainStudy = featuredStudies[0];
  const sideStudies = featuredStudies.slice(1, 3);

  return (
    <section className="py-20 sm:py-24 bg-slate-50 border-t border-b border-gray-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-[32px] sm:text-[38px] md:text-[42px] font-archivo font-bold text-[#2F7DB0] leading-tight">
            Featured Case Studies
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 [text-wrap:balance]">
            Real-world implementations of Luxcity's AI engines, public sector tools, and property&nbsp;technology.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Primary Flagship Bento Card (7 cols, Full Image Card) */}
          {mainStudy && (
            <Link 
              to={`/case-studies/${mainStudy.slug}`}
              className="lg:col-span-7 rounded-3xl p-7 sm:p-9 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden min-h-[540px] sm:min-h-[580px]"
            >
              {/* Full Background Image with Cinematic Overlays */}
              <div className="absolute inset-0">
                <img
                  src={mainStudy.image}
                  alt={mainStudy.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-blue-900/80" />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              {/* Top Bar: Badge and Arrow */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full uppercase tracking-wider border border-white/20">
                  Flagship Initiative • {mainStudy.category}
                </span>
                <span className="p-2.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-full text-white group-hover:bg-[#DC5F12] group-hover:border-[#DC5F12] transition-colors duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Content: Title, Tagline, Metrics & CTA */}
              <div className="space-y-5 relative z-10 pt-16">
                <div>
                  <span className="text-xs font-semibold text-gray-300 tracking-wider block mb-2">
                    {mainStudy.productName}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-archivo font-bold text-white group-hover:text-blue-200 transition-colors leading-tight">
                    {mainStudy.title}
                  </h3>
                </div>
                
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed max-w-xl">
                  {mainStudy.tagline}
                </p>

                {/* Stat Badges (Glassmorphic) */}
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {mainStudy.metrics.map((m, idx) => (
                    <div 
                      key={idx} 
                      className="px-3.5 py-2 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-sm"
                    >
                      <span className="text-[#DC5F12] font-black mr-1.5">{m.value}</span>
                      <span className="text-white/90">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 flex items-center justify-between border-t border-white/15">
                  <span className="text-xs sm:text-sm font-semibold text-white flex items-center gap-1.5 group-hover:text-[#DC5F12] transition-colors">
                    Click to view full case study page
                    <ArrowRight className="w-4 h-4 text-[#DC5F12] transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Secondary Bento Stack (5 cols, 2 stacked cards) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            {sideStudies.map((study) => (
              <Link
                key={study.id}
                to={`/case-studies/${study.slug}`}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-sm hover:border-[#AACAFB] hover:shadow-[0_12px_30px_#CFD9E8] transition-all duration-300 flex-1 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {study.category}
                    </span>
                    <span className="p-2 bg-gray-50 rounded-full text-gray-400 group-hover:text-white group-hover:bg-[#DC5F12] transition-colors duration-200">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>

                  <h4 className="text-xl font-archivo font-bold text-gray-900 group-hover:text-[#2F7DB0] transition-colors leading-snug">
                    {study.title}
                  </h4>

                  <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {study.tagline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-[#2F7DB0] font-archivo">
                      {study.metrics[0].value}
                    </div>
                    <div className="text-[11px] text-gray-500 font-medium">
                      {study.metrics[0].label}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#DC5F12] group-hover:underline flex items-center gap-1">
                    View Full Page
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Call to Action */}
        <div className="mt-14 text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] font-semibold text-sm transition-all duration-300 shadow-sm hover:shadow"
          >
            Explore the Full Case Studies Hub <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
