import React from 'react';
import { Link } from 'react-router-dom';
import { Send, ArrowUpRight } from 'lucide-react';
import HeroBackground from './HeroBackground';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-gray-300 overflow-hidden">
      <HeroBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/15">
          
          {/* Column 1: Studio Identity & Description (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="https://i.imgur.com/pXKE3pA.png" 
                alt="Luxcity Logo" 
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              Luxcity Technologies develops applied AI platforms, spatial GIS infrastructure, and automated compliance engines transforming modern property ecosystems.
            </p>

            <div className="space-y-1.5 text-xs text-gray-300">
              <div>
                <span className="text-gray-400">Corporate HQ: </span>
                <span className="text-white font-medium">London, United Kingdom</span>
              </div>
              <div>
                <span className="text-gray-400">Inquiries: </span>
                <a 
                  href="mailto:contactus@theluxcity.co.uk" 
                  className="text-white hover:underline transition-colors font-medium"
                >
                  contactus@theluxcity.co.uk
                </a>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-[11px] text-gray-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • ISO 27001 Certified</span>
            </div>
          </div>

          {/* Column 2: Dedicated Sister Products & Ventures (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Products & Sister Ventures
            </h3>
            <p className="text-xs text-gray-300 leading-normal">
              Specialized platforms across the Luxcity property technology portfolio:
            </p>
            <nav className="space-y-3.5 pt-1">
              <div>
                <Link 
                  to="/" 
                  className="group flex flex-col text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white group-hover:text-blue-200 transition-colors flex items-center justify-between">
                    <span>Proptii</span>
                    <span className="text-[10px] bg-white/15 text-white px-2 py-0.5 rounded-full font-normal">Flagship</span>
                  </span>
                  <span className="text-xs text-gray-400">Property discovery & deal underwriting</span>
                </Link>
              </div>

              <div>
                <Link 
                  to="/case-studies/council-connect-streamlining" 
                  className="group flex flex-col text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white group-hover:text-blue-200 transition-colors flex items-center justify-between">
                    <span>Council Connect</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-xs text-gray-400">Municipal housing allocation software</span>
                </Link>
              </div>

              <div>
                <Link 
                  to="/case-studies/nest-quest-student-matching" 
                  className="group flex flex-col text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white group-hover:text-blue-200 transition-colors flex items-center justify-between">
                    <span>Nest Quest</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-xs text-gray-400">University student tenancy & matching</span>
                </Link>
              </div>

              <div>
                <Link 
                  to="/case-studies/kompass-broker-case-management" 
                  className="group flex flex-col text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span className="font-semibold text-white group-hover:text-blue-200 transition-colors flex items-center justify-between">
                    <span>Kompass Broker Platform</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-xs text-gray-400">Case management & digital fact find</span>
                </Link>
              </div>
            </nav>
          </div>

          {/* Column 3: Platform & Research (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Platform & Labs
            </h3>
            <nav className="space-y-2.5 text-sm">
              <div>
                <Link to="/solutions" className="text-gray-300 hover:text-white transition-colors">
                  Solutions Hub
                </Link>
              </div>
              <div>
                <Link to="/labs" className="text-gray-300 hover:text-white transition-colors">
                  Luxcity Labs
                </Link>
              </div>
              <div>
                <Link to="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </div>
              <div>
                <Link to="/insights" className="text-gray-300 hover:text-white transition-colors">
                  Market Insights
                </Link>
              </div>
              <div>
                <Link to="/tools" className="text-gray-300 hover:text-white transition-colors">
                  Assessment Tools
                </Link>
              </div>
            </nav>
          </div>

          {/* Column 4: Governance & Newsletter (3 Cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Company & Governance
              </h3>
              <nav className="space-y-2 text-sm">
                <div>
                  <Link to="/company" className="text-gray-300 hover:text-white transition-colors">
                    About Luxcity
                  </Link>
                </div>
                <div>
                  <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                    Executive Briefings
                  </Link>
                </div>
                <div>
                  <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </div>
                <div>
                  <Link to="/sitemap.xml" className="text-gray-300 hover:text-white transition-colors">
                    Sitemap
                  </Link>
                </div>
              </nav>
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-semibold text-white mb-2">
                Sign up for our newsletter
              </h4>
              <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 text-sm rounded-l-lg bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#DC5F12] hover:bg-[#c45510] rounded-r-lg flex items-center transition-colors text-white"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © {new Date().getFullYear()} Luxcity Technologies Ltd. All rights reserved. Registered in England & Wales.
          </div>
          <div>
            <span className="text-gray-300">
              Next-generation property discovery • A Luxcity Technologies Venture
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}