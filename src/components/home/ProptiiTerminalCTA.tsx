import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  Lock
} from 'lucide-react';

export default function ProptiiTerminalCTA() {
  const [emailOrPostcode, setEmailOrPostcode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPostcode.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="signup" className="py-20 sm:py-28 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#2F7DB0]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-[#DC5F12]/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* High-Contrast Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-14 lg:p-16 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-archivo font-bold text-white leading-tight">
              Assess a Property to Get Your Proptii Report
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed [text-wrap:balance]">
              Enter any UK postcode or address to unlock parcel-level statutory compliance, flood risk intelligence, and verified property analytics.
            </p>

            {/* Form */}
            {submitted ? (
              <div className="p-6 bg-[#2F7DB0]/20 border border-[#2F7DB0]/40 rounded-2xl text-center space-y-2 max-w-lg mx-auto">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-archivo">
                  Proptii Report Initiated
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  We are synthesizing the Land Registry, Environment Agency GIS, and property intelligence models for <strong className="text-white">{emailOrPostcode}</strong>. Check your inbox momentarily.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-2.5 bg-slate-950/80 p-2 rounded-2xl border border-slate-700/80 shadow-inner">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      required
                      value={emailOrPostcode}
                      onChange={(e) => setEmailOrPostcode(e.target.value)}
                      placeholder="Enter UK postcode or work email..."
                      className="w-full px-4 py-3.5 bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-0"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-3.5 bg-[#DC5F12] hover:bg-[#c45510] text-white rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#DC5F12]/30 shrink-0 group"
                  >
                    <span>Get Proptii Report</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </form>
            )}

            {/* Reassurance Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>No credit card required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#2F7DB0]" />
                <span>Instant Proptii report</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#DC5F12]" />
                <span>Bank-grade 256-bit AES encryption</span>
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
