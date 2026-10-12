import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';

interface ShowcaseProduct {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  caseStudyUrl: string;
  image: string;
}

const PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'council-connect',
    name: 'Council Connect',
    subtitle: 'Automated Public Sector Housing Allocation',
    description: 'Deployed across UK local authorities to coordinate vulnerable families with vetted private landlords. Integrates automated compliance checks, cutting caseworker turnaround by 14 days and reducing emergency council housing budgets.',
    caseStudyUrl: '/case-studies/council-connect-streamlining',
    image: '/images/council-connect-cover.png',
  },
  {
    id: 'nest-quest',
    name: 'Nest Quest',
    subtitle: 'Verified Student Accommodation Network',
    description: 'Certified university housing portal and student roommate matching engine. Combines university identity verification with automated guarantor checks to eliminate rental deposits fraud and streamline shared tenancies.',
    caseStudyUrl: '/case-studies/nest-quest-student-matching',
    image: '/images/nest-quest-cover.png',
  },
  {
    id: 'kompass',
    name: 'Kompass',
    subtitle: 'Broker Case Management & Product Sourcing',
    description: 'Empowers mortgage and commercial finance brokers to manage active client cases, conduct digital fact find, generate audit-ready suitability reports, and discover optimal financial products.',
    caseStudyUrl: '/case-studies/kompass-broker-case-management',
    image: '/images/proptii-agent-analytics.png',
  }
];

export default function ProptiiStudioShowcase() {
  // All cards closed by default
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="studio-showcase" className="py-20 sm:py-28 bg-[#FCFAF7] border-b border-stone-200/80 relative overflow-hidden">
      {/* Hidden SVG ClipPath for 100% opaque, sharp house silhouette clipping */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="house-clip-shape" clipPathUnits="objectBoundingBox">
            <path d="M 0.46 0.022 Q 0.50 0.0 0.54 0.022 L 0.975 0.284 Q 1.0 0.298 1.0 0.328 L 1.0 0.96 Q 1.0 1.0 0.951 1.0 L 0.049 1.0 Q 0.0 1.0 0.0 0.96 L 0.0 0.328 Q 0.0 0.298 0.025 0.284 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2F7DB0]/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DC5F12]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-[46px] font-archivo font-normal text-[#2F7DB0] leading-[1.15] tracking-tight">
            Built by the Makers of Council Connect & Nest Quest
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed [text-wrap:balance]">
            Proptii is engineered within <strong className="text-gray-900 font-semibold">Luxcity Technologies</strong>—an applied venture laboratory solving structural challenges across UK municipal governance, higher education, and residential investment.
          </p>
        </div>

        {/* Expandable Accordion Showcase Row (Locked height on desktop prevents vertical jumps) */}
        <div 
          onMouseLeave={() => setActiveIndex(null)}
          className="flex flex-col md:flex-row items-stretch gap-4 sm:gap-6 min-h-[460px] md:h-[460px]"
        >
          {PRODUCTS.map((product, index) => {
            const isExpanded = activeIndex === index;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`group relative rounded-3xl sm:rounded-[32px] border transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden min-h-[440px] md:min-h-0 md:h-full ${
                  isExpanded
                    ? 'md:flex-[2.8] border-indigo-700/60 shadow-2xl ring-1 ring-white/10'
                    : 'md:flex-1 bg-[#FAF7F2] hover:bg-white border-stone-200/90 hover:border-stone-300 shadow-xs cursor-pointer'
                }`}
              >
                {/* Hero gradient background (purple to indigo to blue) active on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 transition-opacity duration-500 ease-out pointer-events-none ${
                    isExpanded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Collapsed State View */}
                <div
                  className={`absolute inset-0 p-7 sm:p-8 flex flex-col justify-between z-10 transition-all duration-300 ${
                    isExpanded 
                      ? 'opacity-0 pointer-events-none invisible' 
                      : 'opacity-100 pointer-events-auto visible'
                  }`}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold font-archivo text-gray-900 group-hover:text-[#2F7DB0] transition-colors leading-snug">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium line-clamp-2">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Collapsed Bottom Action */}
                  <div className="pt-8 flex items-center justify-between border-t border-stone-200/70 mt-6">
                    <span className="text-xs font-semibold text-gray-700">
                      Read More
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white border border-stone-200 shadow-xs flex items-center justify-center text-gray-600 group-hover:bg-[#2F7DB0] group-hover:text-white group-hover:border-[#2F7DB0] transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded State View */}
                <div
                  className={`absolute inset-0 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 z-10 transition-all duration-500 ${
                    isExpanded 
                      ? 'opacity-100 pointer-events-auto visible' 
                      : 'opacity-0 pointer-events-none invisible'
                  }`}
                >
                  {/* Left Column: Product Information & Read More CTA */}
                  <div className="flex-1 space-y-4 sm:space-y-5 w-full min-w-0">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold font-archivo text-white leading-tight">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-[#ffdbcc] mt-1">
                        {product.subtitle}
                      </p>
                    </div>

                    <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed line-clamp-4 md:line-clamp-none">
                      {product.description}
                    </p>

                    {/* Bottom CTA Row: Read More button */}
                    <div className="pt-2 flex items-center gap-4">
                      <Link
                        to={product.caseStudyUrl}
                        className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white hover:bg-[#ffdbcc] text-gray-900 text-xs sm:text-sm font-bold shadow-md transition-all duration-300 group/btn"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: House-Shaped Image Container (100% Vibrant, Sharp & Crisp) */}
                  <div className="relative w-44 sm:w-48 md:w-52 lg:w-60 aspect-[0.81] shrink-0 self-center flex items-center justify-center my-2 md:my-0 drop-shadow-[0_16px_30px_rgba(0,0,0,0.45)]">
                    {/* Crisp House-Shaped Image with zero fade or dimming */}
                    <div
                      className="w-full h-full relative overflow-hidden bg-white/10 transition-transform duration-500 hover:scale-[1.02]"
                      style={{
                        clipPath: 'url(#house-clip-shape)',
                        WebkitClipPath: 'url(#house-clip-shape)',
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Studio Footer Link */}
        <div className="mt-12 text-center">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#2F7DB0] transition-colors group"
          >
            <span>Explore all deployments across the Luxcity Venture Lab</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
