import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudiesData';
import { CaseStudy } from '../types/caseStudy';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const isThrottledRef = useRef(false);
  const touchStartYRef = useRef(0);

  const studyIndex = CASE_STUDIES.findIndex(
    (s) => s.slug === slug || (slug === 'rentintel-pricing-intelligence' && s.id === 'kompass-broker-intelligence')
  );
  const study = studyIndex !== -1 ? CASE_STUDIES[studyIndex] : null;

  const prevStudy = studyIndex > 0 ? CASE_STUDIES[studyIndex - 1] : CASE_STUDIES[CASE_STUDIES.length - 1];
  const nextStudy = studyIndex < CASE_STUDIES.length - 1 ? CASE_STUDIES[studyIndex + 1] : CASE_STUDIES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentSlideIndex(0);
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold font-archivo text-gray-900 mb-3">Case Study Not Found</h1>
          <p className="text-gray-600 mb-6">The requested case study could not be located.</p>
          <Link
            to="/case-studies"
            className="px-6 py-3 bg-[#DC5F12] text-white rounded-xl font-semibold hover:bg-[#c45510] inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const slides = [
    { id: 'overview', label: 'THE OVERVIEW' },
    { id: 'challenge', label: 'THE CHALLENGE' },
    { id: 'solution', label: 'THE SOLUTION' },
    { id: 'metrics', label: 'KEY METRICS' },
    { id: 'testimonial', label: 'TESTIMONIAL' },
    { id: 'impact', label: 'IMPACT & NEXT' },
  ];

  // Lock body overflow and handle native non-passive wheel events to prevent page scrolling
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (isThrottledRef.current) return;
      if (Math.abs(e.deltaY) > 15) {
        if (e.deltaY > 0) {
          setCurrentSlideIndex((prev) => {
            if (prev < slides.length - 1) {
              isThrottledRef.current = true;
              setTimeout(() => {
                isThrottledRef.current = false;
              }, 750);
              return prev + 1;
            }
            return prev;
          });
        } else if (e.deltaY < 0) {
          setCurrentSlideIndex((prev) => {
            if (prev > 0) {
              isThrottledRef.current = true;
              setTimeout(() => {
                isThrottledRef.current = false;
              }, 750);
              return prev - 1;
            }
            return prev;
          });
        }
      }
    };

    window.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('wheel', handleWheelNative);
    };
  }, [slides.length]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    if (Math.abs(deltaY) > 40) {
      if (deltaY > 0 && currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex((prev) => prev + 1);
      } else if (deltaY < 0 && currentSlideIndex > 0) {
        setCurrentSlideIndex((prev) => prev - 1);
      }
    }
  };

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  return (
    <div className="h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] mt-[56px] md:mt-[64px] bg-white overflow-hidden flex items-center">
      <Helmet>
        <title>{study.title} | Luxcity Case Study</title>
        <meta name="description" content={study.tagline} />
      </Helmet>

      <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* =========================================================================
              LEFT COLUMN: EDITORIAL NAVIGATION (Exact match to reference design)
             ========================================================================= */}
          <aside className="lg:col-span-3 py-4 flex flex-col justify-between h-auto lg:h-[calc(100vh-120px)] max-h-[820px]">
            
            {/* Top Back Link & Identity */}
            <div className="space-y-3">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#DC5F12] transition-colors group mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                All Case Studies
              </Link>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#2F7DB0] block mb-1">
                  {study.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-archivo text-gray-900 tracking-tight leading-snug">
                  {study.productName}
                </h2>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {study.client} • {study.year}
                </p>
              </div>
            </div>

            {/* Navigation List (Inspired by reference screenshot) */}
            <nav className="my-8 space-y-3">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-4">
                Section Index
              </span>
              
              {slides.map((s, idx) => {
                const isActive = currentSlideIndex === idx;
                const num = String(idx + 1).padStart(2, '0');

                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`w-full text-left py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'text-[#2F7DB0] font-black'
                        : 'text-gray-400 hover:text-gray-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[11px] transition-colors ${
                        isActive ? 'text-[#DC5F12]' : 'text-gray-300 group-hover:text-gray-500'
                      }`}>
                        {num}
                      </span>
                      <span>{s.label}</span>
                    </div>

                    {/* Active indicator dot from reference image */}
                    <span className={`w-2 h-2 rounded-full transition-all ${
                      isActive 
                        ? 'bg-[#DC5F12] scale-100 shadow-sm' 
                        : 'bg-transparent scale-0 group-hover:bg-gray-200 group-hover:scale-75'
                    }`} />
                  </button>
                );
              })}
            </nav>

            {/* Bottom Metadata */}
            <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-400 space-y-1">
              <div>LUXCITY CASE STUDY DEPLOYMENT</div>
              <div>© {study.year} LUXCITY TECHNOLOGIES</div>
            </div>

          </aside>

          {/* =========================================================================
              RIGHT COLUMN: FIXED PRESENTATION CANVAS WITH QUICK FADE-IN
             ========================================================================= */}
          <main className="lg:col-span-9">
            
            <div 
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="h-[620px] sm:h-[680px] md:h-[calc(100vh-120px)] max-h-[820px] min-h-[580px] w-full rounded-[36px] overflow-hidden relative border border-gray-200/90 bg-slate-950 shadow-2xl"
            >
              
              {/* =====================================================================
                  PERSISTENT STATIC BACKGROUND (Fixed across all slides)
                 ===================================================================== */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/85 via-indigo-900/85 to-blue-900/85" />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              
              {/* =====================================================================
                  SLIDE 01: THE OVERVIEW (HERO)
                 ===================================================================== */}
              <div 
                key="slide-0"
                className={`absolute inset-0 h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
                  currentSlideIndex === 0
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-2 scale-[0.99] pointer-events-none z-0'
                }`}
              >
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center font-archivo font-extrabold text-white text-sm shadow-inner">
                    01
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    {study.category}
                  </span>
                </div>

                {/* Headline & Description */}
                <div className="relative z-10 my-auto max-w-3xl space-y-5">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-archivo leading-[1.15] tracking-tight text-white drop-shadow-md">
                    {study.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-blue-100 font-light leading-relaxed max-w-2xl">
                    {study.tagline}
                  </p>
                </div>

                {/* Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/20 text-xs text-blue-200">
                  <button
                    onClick={() => setCurrentSlideIndex(1)}
                    className="inline-flex items-center gap-1.5 uppercase tracking-widest font-extrabold hover:text-white transition-colors group cursor-pointer"
                  >
                    SCROLL DOWN <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1 animate-bounce" />
                  </button>

                  <span className="text-xs text-blue-200/90 font-medium">
                    Client: {study.client} • {study.year}
                  </span>
                </div>
              </div>

              {/* =====================================================================
                  SLIDE 02: THE CHALLENGE
                 ===================================================================== */}
              <div 
                key="slide-1"
                className={`absolute inset-0 h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
                  currentSlideIndex === 1
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-2 scale-[0.99] pointer-events-none z-0'
                }`}
              >
                {/* Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center font-archivo font-extrabold text-white text-sm shadow-inner">
                    02
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    The Challenge
                  </span>
                </div>

                {/* Body Content */}
                <div className="relative z-10 my-auto max-w-3xl space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC5F12] block">
                    Problem Identification
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-archivo text-white leading-tight">
                    Friction and Fragmentation in the Status Quo
                  </h2>
                  <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed">
                    {study.challenge}
                  </p>

                  <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg max-w-xl">
                    <div className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-1">
                      Primary Bottleneck
                    </div>
                    <div className="text-sm text-white font-medium">
                      Static listing portals and manual vetting lead to delayed transactions and high operational overhead.
                    </div>
                  </div>
                </div>

                {/* Slide Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/20 text-xs text-blue-200">
                  <button
                    onClick={() => setCurrentSlideIndex(2)}
                    className="inline-flex items-center gap-1.5 uppercase tracking-widest font-extrabold hover:text-[#DC5F12] transition-colors cursor-pointer text-white"
                  >
                    NEXT: THE SOLUTION <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-blue-200/90 font-medium">Section 2 of 6</span>
                </div>
              </div>

              {/* =====================================================================
                  SLIDE 03: THE SOLUTION & ARCHITECTURE
                 ===================================================================== */}
              <div 
                key="slide-2"
                className={`absolute inset-0 h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
                  currentSlideIndex === 2
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-2 scale-[0.99] pointer-events-none z-0'
                }`}
              >
                {/* Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center font-archivo font-extrabold text-white text-sm shadow-inner">
                    03
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    The Solution
                  </span>
                </div>

                {/* Body Content */}
                <div className="relative z-10 my-auto max-w-3xl space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F7DB0] block">
                    Engineering & Delivery
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-archivo text-white leading-tight">
                    How Luxcity Engineered the Resolution
                  </h2>
                  <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed">
                    {study.solution}
                  </p>

                  {/* Tech stack badges */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-200 block mb-2.5">
                      Core Technology Stack:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {study.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-xs font-semibold text-white shadow-xs flex items-center gap-2"
                        >
                          <Layers className="w-3.5 h-3.5 text-[#DC5F12]" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Slide Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/20 text-xs text-blue-200">
                  <button
                    onClick={() => setCurrentSlideIndex(3)}
                    className="inline-flex items-center gap-1.5 uppercase tracking-widest font-extrabold hover:text-[#DC5F12] transition-colors cursor-pointer text-white"
                  >
                    NEXT: KEY METRICS <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-blue-200/90 font-medium">Section 3 of 6</span>
                </div>
              </div>

              {/* =====================================================================
                  SLIDE 04: KEY METRICS
                 ===================================================================== */}
              <div 
                key="slide-3"
                className={`absolute inset-0 h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
                  currentSlideIndex === 3
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-2 scale-[0.99] pointer-events-none z-0'
                }`}
              >
                {/* Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center font-archivo font-extrabold text-white text-sm shadow-inner">
                    04
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    Validated Performance
                  </span>
                </div>

                {/* Metrics Content */}
                <div className="relative z-10 my-auto space-y-8 w-full max-w-4xl">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-archivo text-white leading-tight">
                      Measurable ROI & Outcomes
                    </h2>
                    <p className="text-sm sm:text-base text-gray-200 font-light mt-1">
                      Real results achieved following deployment.
                    </p>
                  </div>

                  {/* 3 Metric Cards inside Canvas */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {study.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between shadow-lg hover:bg-white/15 transition-all"
                      >
                        <div className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC5F12]"></span>
                          {metric.label}
                        </div>
                        <div>
                          <div className="text-4xl sm:text-5xl font-black font-archivo text-white">
                            {metric.value}
                          </div>
                          {metric.detail && (
                            <p className="text-xs text-gray-200 mt-2 leading-relaxed font-light">
                              {metric.detail}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/20 text-xs text-blue-200">
                  <button
                    onClick={() => setCurrentSlideIndex(4)}
                    className="inline-flex items-center gap-1.5 uppercase tracking-widest font-extrabold hover:text-[#DC5F12] transition-colors cursor-pointer text-white"
                  >
                    NEXT: TESTIMONIAL <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-blue-200/90 font-medium">Section 4 of 6</span>
                </div>
              </div>

              {/* =====================================================================
                  SLIDE 05: CLIENT TESTIMONIAL
                 ===================================================================== */}
              <div 
                key="slide-4"
                className={`absolute inset-0 h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
                  currentSlideIndex === 4
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-2 scale-[0.99] pointer-events-none z-0'
                }`}
              >
                {/* Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center font-archivo font-extrabold text-white text-sm shadow-inner">
                    05
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    Stakeholder Feedback
                  </span>
                </div>

                {/* Quote Body */}
                <div className="relative z-10 my-auto max-w-3xl space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#DC5F12] block">
                    Partner Validation
                  </span>
                  
                  {study.testimonial && (
                    <blockquote className="text-2xl sm:text-3xl md:text-4xl font-archivo font-medium italic text-white leading-relaxed">
                      "{study.testimonial.quote}"
                    </blockquote>
                  )}

                  {study.testimonial && (
                    <div className="pt-2 border-l-2 border-[#DC5F12] pl-4">
                      <div className="font-bold text-lg text-white font-archivo">
                        {study.testimonial.author}
                      </div>
                      <div className="text-xs sm:text-sm text-blue-200 font-medium">
                        {study.testimonial.role} — {study.testimonial.organization}
                      </div>
                    </div>
                  )}
                </div>

                {/* Slide Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/20 text-xs text-blue-200">
                  <button
                    onClick={() => setCurrentSlideIndex(5)}
                    className="inline-flex items-center gap-1.5 uppercase tracking-widest font-extrabold hover:text-[#DC5F12] transition-colors cursor-pointer text-white"
                  >
                    NEXT: IMPACT & CONCLUSION <ChevronDown className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-blue-200/90 font-medium">Section 5 of 6</span>
                </div>
              </div>

              {/* =====================================================================
                  SLIDE 06: OUTCOMES & NEXT ACTIONS
                 ===================================================================== */}
              <div 
                key="slide-5"
                className={`absolute inset-0 h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 overflow-hidden text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform] ${
                  currentSlideIndex === 5
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 translate-y-2 scale-[0.99] pointer-events-none z-0'
                }`}
              >
                {/* Top Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center font-archivo font-extrabold text-white text-sm shadow-inner">
                    06
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                    Impact & Conclusion
                  </span>
                </div>

                {/* Body Content */}
                <div className="relative z-10 my-auto max-w-3xl space-y-6">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#2F7DB0] block">
                    Operational Realization
                  </span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-archivo text-white leading-tight">
                    Long-Term Value Creation
                  </h2>
                  <p className="text-base sm:text-lg text-gray-200 font-light leading-relaxed">
                    {study.outcome}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <Link
                      to={`/case-studies/${nextStudy.slug}`}
                      className="px-6 py-3.5 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] font-semibold text-sm transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                    >
                      Next Project: {nextStudy.productName}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      to="/contact"
                      className="px-6 py-3.5 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 font-semibold text-sm transition-all shadow-xs cursor-pointer backdrop-blur-md"
                    >
                      Schedule Discovery Call
                    </Link>
                  </div>
                </div>

                {/* Slide Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/20 text-xs text-blue-200">
                  <button
                    onClick={() => setCurrentSlideIndex(0)}
                    className="inline-flex items-center gap-1.5 uppercase tracking-widest font-extrabold hover:text-[#DC5F12] transition-colors cursor-pointer text-white"
                  >
                    RETURN TO OVERVIEW <ChevronUp className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-blue-200/90 font-medium">Complete Presentation</span>
                </div>
              </div>

            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
