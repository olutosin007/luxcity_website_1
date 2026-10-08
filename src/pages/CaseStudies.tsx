import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, ArrowUpRight, TrendingUp, Layers, CheckCircle, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { CaseStudy } from '../types/caseStudy';
import { Link } from 'react-router-dom';

export default function CaseStudies() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStudyIndex, setActiveStudyIndex] = useState<number>(0);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const categories = ['All', 'AI & PropTech', 'Public Sector', 'Student Housing', 'Market Intelligence'];

  const filteredStudies = selectedCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((s) => s.category === selectedCategory);

  // Ensure active index is within bounds of filtered studies
  const currentIndex = Math.min(activeStudyIndex, Math.max(0, filteredStudies.length - 1));
  const activeStudy = filteredStudies[currentIndex] || CASE_STUDIES[0];

  return (
    <div className="min-h-screen bg-[#FBFBFC]">
      <Helmet>
        <title>Case Studies & Deployments | Luxcity</title>
        <meta 
          name="description" 
          content="Explore real-world case studies of Luxcity's AI platforms and software solutions across real estate and public sector." 
        />
      </Helmet>

      {/* Video Hero Section (Replicating Solutions & Labs) */}
      <section className="relative h-[100vh] sm:h-[100vh] md:h-[80vh] overflow-hidden pt-[80px] sm:pt-[80px] md:pt-[120px]">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/team-discussion-720.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[57px] sm:text-[47px] md:text-[70px] lg:text-[85px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 mb-4 sm:mb-6 animate-fade-in">
              Proven Results & Deployments
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explore how Luxcity applies multimodal AI, real-time analytics, and automated platforms to solve tangible challenges across residential, public sector, and student accommodation.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Filter Toolbar */}
      <div className="sticky top-[56px] md:top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-[#DC5F12] rounded-full inline-block"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-900 font-archivo">
              Filter By Domain
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveStudyIndex(0);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#2F7DB0] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Split Section: Visual on Left, Index List on Right */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* =========================================================================
                LEFT COLUMN: PRESENTATION CONTENT INDEX LIST
               ========================================================================= */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Index Header */}
              <div className="pb-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#DC5F12] rounded-full inline-block"></span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 font-archivo">
                    Case Study Index
                  </h3>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {filteredStudies.length} projects
                </span>
              </div>

              {/* Index Items */}
              <div className="space-y-1">
                {filteredStudies.map((study, index) => {
                  const isActive = study.id === activeStudy.id;
                  const itemNumber = String(index + 1).padStart(2, '0');

                  return (
                    <Link
                      key={study.id}
                      to={`/case-studies/${study.slug}`}
                      onMouseEnter={() => setActiveStudyIndex(index)}
                      className={`group py-6 px-4 sm:px-5 rounded-2xl cursor-pointer transition-all duration-200 border-b border-gray-200/80 last:border-b-0 block ${
                        isActive
                          ? 'bg-[#E7F2FF] border-transparent'
                          : 'bg-transparent hover:bg-[#E7F2FF] hover:border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1 pr-2">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
                            {study.category}
                          </span>

                          <h4 className={`text-2xl sm:text-3xl font-normal font-archivo tracking-tight transition-colors ${
                            isActive
                              ? 'text-[#2F7DB0]'
                              : 'text-gray-900 group-hover:text-[#2F7DB0]'
                          }`}>
                            {study.productName}
                          </h4>

                          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                            {study.tagline}
                          </p>
                        </div>

                        {/* Number on right */}
                        <div className="text-right flex-shrink-0 pt-1">
                          <span className={`text-2xl sm:text-3xl font-archivo font-extrabold transition-colors ${
                            isActive
                              ? 'text-[#DC5F12]'
                              : 'text-gray-300 group-hover:text-[#DC5F12]'
                          }`}>
                            {itemNumber}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

            </div>

            {/* =========================================================================
                RIGHT COLUMN: FULL PICTURE VISUAL PANEL WITH 2 METRIC CARDS & VIEW BUTTON
               ========================================================================= */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <div className="bg-gray-950 rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden relative min-h-[600px] flex flex-col justify-between group">
                
                {/* Full Background Image */}
                <img
                  key={activeStudy.id}
                  src={activeStudy.image}
                  alt={activeStudy.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 transform group-hover:scale-105 opacity-90"
                />
                
                {/* Dark Contrast Overlay for optimal legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/75 to-gray-950/35" />
                <div className="absolute inset-0 bg-black/40" />

                {/* Top Badge */}
                <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/30 shadow-sm">
                    {activeStudy.category}
                  </span>
                </div>

                {/* Bottom Content, Metrics & CTA */}
                <div className="relative z-10 p-6 sm:p-8 space-y-6">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-archivo text-white leading-tight">
                      {activeStudy.title}
                    </h2>
                    <p className="mt-2 text-gray-200 text-sm sm:text-base leading-relaxed">
                      {activeStudy.tagline}
                    </p>
                  </div>

                  {/* 2 Floating Metric Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {activeStudy.metrics.slice(0, 2).map((metric, idx) => (
                      <div 
                        key={idx}
                        className="bg-black/45 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all hover:bg-black/60 hover:border-white/35"
                      >
                        <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC5F12]"></span>
                          {metric.label}
                        </div>
                        <div>
                          <div className="text-3xl sm:text-4xl font-black font-archivo text-white">
                            {metric.value}
                          </div>
                          {metric.detail && (
                            <div className="text-[11px] text-gray-300 mt-1 line-clamp-1">
                              {metric.detail}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar: View Case Study Button & Tags */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-white/15">
                    <Link
                      to={`/case-studies/${activeStudy.slug}`}
                      className="px-6 py-3.5 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2 group/btn"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {activeStudy.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 bg-white/15 backdrop-blur-md text-white/90 border border-white/20 rounded-md text-xs font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-archivo text-gray-900 mb-4">
            Have a project or deployment in mind?
          </h2>
          <p className="text-gray-600 text-base mb-8 max-w-xl mx-auto">
            From municipal housing automation to AI recommendation engines, our team builds solutions that transform property workflows.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] font-semibold text-sm transition-all"
          >
            Schedule a Discovery Call <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
