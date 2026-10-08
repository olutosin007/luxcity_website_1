import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, ShieldCheck, Waves, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

interface SubtextStage {
  id: number;
  label: string;
  pill: string;
  subtext: string;
  accentColor: string;
  featurePill: string;
}

const STAGES: SubtextStage[] = [
  {
    id: 0,
    label: 'Lifestyle Match',
    pill: '01 • Multimodal Discovery',
    subtext: 'find your ideal rental match based on your lifestyle, commute, and personal preferences.',
    accentColor: '#2F7DB0',
    featurePill: 'Conversational Intent & Computer Vision'
  },
  {
    id: 1,
    label: 'Direct Landlords',
    pill: '02 • Direct Verification',
    subtext: 'connect directly with verified landlords, cutting tenancy search times by more than half.',
    accentColor: '#DC5F12',
    featurePill: 'Instant Vetting & 48h Placement'
  },
  {
    id: 2,
    label: 'Property Intelligence',
    pill: '03 • Spatial Intelligence Layer',
    subtext: 'access deep property intelligence across flood risks, climate resilience, neighborhood safety, and hyper-local GIS data.',
    accentColor: '#10B981',
    featurePill: 'UK Flood Risk Maps & Environmental Audits'
  }
];

// 7 collage card positions matching Noho layout
// Grid: 4 columns x 3 rows
// Row 1: col 1, col 2
// Row 2: col 2, col 3, col 4
// Row 3: col 1, col 2
const COLLAGE_LAYOUT = [
  { row: 1, col: 1, delay: 0 },
  { row: 1, col: 2, delay: 70 },
  { row: 2, col: 2, delay: 140 },
  { row: 2, col: 3, delay: 210 },
  { row: 2, col: 4, delay: 280 },
  { row: 3, col: 1, delay: 350 },
  { row: 3, col: 2, delay: 420 },
];

// Sets of images for each of the 3 stages across all 7 card slots
const STAGE_IMAGES: Record<number, { src: string; alt: string; tag?: string }[]> = {
  0: [
    { src: '/images/proptii-hero/tenant-yellow.jpg', alt: 'Tenant happy in sunlit flat', tag: 'Curated Match' },
    { src: '/images/proptii-hero/man-terracotta.jpg', alt: 'Tenant holding new keys', tag: 'Verified Home' },
    { src: '/images/proptii-hero/friends-lavender.jpg', alt: 'Friends enjoying new space', tag: 'Shared Living' },
    { src: '/images/proptii-hero/woman-rose.jpg', alt: 'Woman relaxed in modern flat', tag: 'Lifestyle Fit' },
    { src: '/images/proptii-hero/tenant-dog-owner.jpg', alt: 'Pet-friendly living space', tag: 'Pet Friendly' },
    { src: '/images/proptii-hero/woman-sage.jpg', alt: 'Tenant drinking morning coffee', tag: 'Quiet Spaces' },
    { src: '/images/proptii-hero/couple-coral.jpg', alt: 'Couple enjoying new home', tag: 'Top Matches' }
  ],
  1: [
    { src: '/images/proptii-hero/couple-moving.jpg', alt: 'Couple unpacking moving boxes', tag: 'Move-in Ready' },
    { src: '/images/proptii-hero/friends-cheer-terra.jpg', alt: 'Friends cheering move-in day', tag: 'Direct Landlord' },
    { src: '/images/proptii-hero/man-terracotta.jpg', alt: 'Quick key handover', tag: 'Instant Sign' },
    { src: '/images/proptii-cover.png', alt: 'Digital lease verification platform', tag: 'Zero Paperwork' },
    { src: '/images/proptii-hero/couple-coral.jpg', alt: 'Verified tenancy confirmed', tag: '100% Certified' },
    { src: '/images/proptii-hero/tenant-yellow.jpg', alt: 'Smooth onboarding experience', tag: 'Fast Move-In' },
    { src: '/images/Modern-home-interior-of-living-room-with-glass-wall.jpg', alt: 'Modern luxury flat', tag: 'Direct Listing' }
  ],
  2: [
    { src: '/images/proptii-hero/woman-green-tablet.jpg', alt: 'Reviewing UK Flood Risk Map on tablet', tag: 'Flood Risk: Low' },
    { src: '/images/proptii-hero/gis-flood-map.jpg', alt: 'Neighborhood resilience 3D map', tag: 'Climate Intel' },
    { src: '/images/proptii-hero/man-blue-tablet.jpg', alt: 'Checking spatial elevation and transit', tag: 'Transit Score: 98' },
    { src: '/images/realistic-image-of-a-clean-and-green-urban.png', alt: 'Green resilient urban district', tag: 'Green Factor' },
    { src: '/images/proptii-hero/woman-sage.jpg', alt: 'Total environmental peace of mind', tag: 'Audited Safety' },
    { src: '/images/proptii-hero/tenant-dog-owner.jpg', alt: 'Protected neighborhood living', tag: 'Air Quality: A+' },
    { src: '/images/Luxcity-City-3.jpg', alt: 'City GIS analytics overlay', tag: 'Spatial Layer' }
  ]
};

export default function ProptiiNohoHero() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [cardsEntered, setCardsEntered] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Grand entrance animation trigger on page mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 80);
    const cardsTimer = setTimeout(() => {
      setCardsEntered(true);
    }, 200);
    return () => {
      clearTimeout(timer);
      clearTimeout(cardsTimer);
    };
  }, []);

  // Subtle 3D mouse parallax for living perspective
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const x = ((clientX / window.innerWidth) - 0.5) * 6; // -3 to +3 deg
    const y = ((clientY / window.innerHeight) - 0.5) * 6; // -3 to +3 deg
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Sticky scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
      
      if (containerHeight <= 0) return;

      // Calculate progress from 0 (top of section) to 1 (bottom of section)
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / containerHeight));

      if (progress < 0.33) {
        setActiveStage(0);
      } else if (progress < 0.67) {
        setActiveStage(1);
      } else {
        setActiveStage(2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStageSelect = (stageIdx: number) => {
    setActiveStage(stageIdx);
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (stageIdx / 2) * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const currentStageData = STAGES[activeStage];

  return (
    <section 
      ref={containerRef}
      className="relative bg-slate-950 text-white min-h-[160vh]"
    >
      {/* Pinned Sticky Viewport with Interactive Mouse Tracking */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden py-6 md:py-10 relative"
      >
        
        {/* Luxcity Signature Gradient Overlay (Matching other page headers & case study cover) */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-blue-900/80 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-0" />

        {/* Ambient Living Radial Depth Glows with Continuous Fluid Drift */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] bg-purple-600/25 rounded-full blur-3xl pointer-events-none z-0 animate-orb-1" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[560px] h-[560px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none z-0 animate-orb-2" />
        <div className="absolute top-1/2 right-1/3 w-[420px] h-[420px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none z-0 animate-pulse" />

        {/* Background Architectural Watermark (Hidden per user request) */}
        {/* 
        <div className="absolute top-2 sm:top-6 right-0 sm:right-4 w-[280px] sm:w-[420px] md:w-[520px] lg:w-[620px] pointer-events-none select-none z-0 overflow-hidden flex justify-end">
          <img 
            src="/images/proptii-hero/proptii-watermark.png" 
            alt="Proptii Architectural Watermark" 
            aria-hidden="true" 
            className="w-full h-auto object-contain object-right-top opacity-25 sm:opacity-30 transition-opacity duration-300"
          />
        </div> 
        */}

        {/* Clean Top Spacing */}
        <div className="w-full pt-14 sm:pt-18 md:pt-20 z-20" />

        {/* Main Hero Split Content (Inspired by Noho) */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center my-auto z-10 py-4">
          
          {/* =========================================================================
              LEFT COLUMN: HERO HEADLINE + PROGRESSIVE SUBTEXTS
             ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-6">
            
            {/* Direct Bottom Insert Headline with Luxcity Header Gradient */}
            <div className="overflow-hidden">
              <h1 
                className={`text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal font-archivo tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 leading-[1.08] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  hasEntered 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-12 opacity-0'
                }`}
              >
                With Proptii,
              </h1>
            </div>

            {/* Dynamic Subtext Area (Smooth Fade & Slide) */}
            <div className="min-h-[140px] sm:min-h-[160px] flex flex-col justify-start">
              <div 
                key={activeStage}
                className="animate-fade-in transition-all duration-500 ease-out space-y-3"
              >
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-200 font-light leading-snug [text-wrap:balance]">
                  {currentStageData.subtext}
                </p>

                <div className="text-xs sm:text-sm font-semibold text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{currentStageData.featurePill}</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={`pt-2 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-150 ${
              hasEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}>
              <Link
                to="/case-studies/proptii-ai-discovery"
                className="px-6 py-3.5 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] font-semibold text-sm transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Proptii</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/solutions#ai-search-section"
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-md rounded-xl font-semibold text-sm transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <span>Enterprise Architecture</span>
                <ArrowUpRight className="w-4 h-4 text-gray-300" />
              </Link>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN: 7-CARD COLLAGE WITH 3D FLIP-IN ENTRANCE & LIVING DRIFT
             ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end items-center">
            
            {/* The Staggered 4-Column x 3-Row Collage Grid (Proportionally Balanced + 3D Mouse Perspective) */}
            <div 
              style={{
                transform: `perspective(1000px) rotateY(${mouseOffset.x}deg) rotateX(${-mouseOffset.y}deg)`,
                transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1)',
              }}
              className="w-full max-w-[520px] sm:max-w-[580px] lg:max-w-[620px] xl:max-w-[660px] grid grid-cols-4 grid-rows-3 gap-3 sm:gap-3.5 md:gap-4 p-2 perspective-1000"
            >
              
              {COLLAGE_LAYOUT.map((pos, idx) => {
                const frontImg = activeStage === 2 ? STAGE_IMAGES[2][idx] : STAGE_IMAGES[0][idx];
                const backImg = STAGE_IMAGES[1][idx];
                
                // Flip rotation: rotates 0deg (stage 0), 180deg (stage 1), 360deg (stage 2)
                const flipRotation = activeStage * 180;
                
                // Staggered floating variation across cards
                const floatClass = idx % 3 === 0 ? 'animate-float-1' : idx % 3 === 1 ? 'animate-float-2' : 'animate-float-3';

                return (
                  <div
                    key={idx}
                    style={{
                      gridRowStart: pos.row,
                      gridColumnStart: pos.col,
                    }}
                    className="aspect-square relative"
                  >
                    {/* Staggered 3D Flip-In Entrance & Living Floating Movement */}
                    <div 
                      className={`w-full h-full relative transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        cardsEntered ? floatClass : ''
                      }`}
                      style={{
                        transform: cardsEntered
                          ? 'rotateY(0deg) rotateX(0deg) translateY(0px) scale(1)'
                          : 'rotateY(-95deg) rotateX(25deg) translateY(65px) scale(0.6)',
                        opacity: cardsEntered ? 1 : 0,
                        filter: cardsEntered ? 'blur(0px)' : 'blur(8px)',
                        transitionDelay: `${cardsEntered ? idx * 85 + 120 : 0}ms`,
                        animationDelay: `${(idx * 0.45).toFixed(1)}s`,
                      }}
                    >
                      {/* 3D Flip Card Container on Scroll */}
                      <div 
                        className="w-full h-full relative group rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/15 hover:ring-white/40 hover:shadow-cyan-500/15 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{
                          transform: `rotateY(${flipRotation}deg)`,
                          transformStyle: 'preserve-3d',
                          transitionDelay: `${pos.delay}ms`,
                        }}
                      >
                        {/* Face 1 (Front: Stage 0 and Stage 2) */}
                        <div 
                          className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900"
                          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                        >
                          <img
                            src={frontImg.src}
                            alt={frontImg.alt}
                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                            loading="eager"
                          />
                          
                          {/* Soft Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Interactive Tag Pill on Card */}
                          {frontImg.tag && (
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider shadow-sm inline-block border border-white/10">
                                {frontImg.tag}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Face 2 (Back: Stage 1) */}
                        <div 
                          className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900"
                          style={{ 
                            backfaceVisibility: 'hidden', 
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)' 
                          }}
                        >
                          <img
                            src={backImg.src}
                            alt={backImg.alt}
                            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                            loading="eager"
                          />
                          
                          {/* Soft Vignette Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Interactive Tag Pill on Card */}
                          {backImg.tag && (
                            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 transform translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                              <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider shadow-sm inline-block border border-white/10">
                                {backImg.tag}
                              </span>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM ANCHOR BAR (Mirroring Noho's "New design from New Zealand")
           ========================================================================= */}
        <div className="w-full border-t border-white/15 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pt-4 text-xs text-gray-300">
            
            {/* User's Exact Anchor Slogan Requirement */}
            <div className="font-archivo font-bold text-white tracking-wide text-xs sm:text-sm">
              A product from Luxcity
            </div>

            {/* Stage Switcher Pills (Replacing scroll prompt text) */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white/10 backdrop-blur-md p-1.5 sm:p-2 rounded-full border border-white/20 shadow-md">
                {STAGES.map((stage) => {
                  const isSelected = activeStage === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleStageSelect(stage.id)}
                      className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
                        isSelected
                          ? 'bg-[#DC5F12] text-white shadow-sm'
                          : 'text-white/75 hover:text-white'
                      }`}
                    >
                      <span>{stage.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Subtle Progress Bar Indicators */}
              <div className="hidden sm:flex items-center gap-1.5">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => handleStageSelect(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeStage === idx 
                        ? 'w-7 bg-[#DC5F12]' 
                        : 'w-2 bg-white/25 hover:bg-white/40'
                    }`}
                    aria-label={`Jump to stage ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
