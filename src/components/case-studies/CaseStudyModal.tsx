import React from 'react';
import { X, ArrowRight, CheckCircle2, TrendingUp, Building, Layers } from 'lucide-react';
import { CaseStudy } from '../../types/caseStudy';
import { Link } from 'react-router-dom';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyModal({ study, onClose }: CaseStudyModalProps) {
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 bg-white/90 hover:bg-white text-gray-700 hover:text-gray-950 rounded-full shadow-md border border-gray-200 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero banner inside modal */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-3xl bg-gray-900">
          <img
            src={study.image}
            alt={study.title}
            className="w-full h-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-semibold uppercase tracking-wider mb-3">
              <Building className="w-3.5 h-3.5" />
              {study.category}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-archivo text-white">
              {study.title}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mt-1">
              Client: {study.client} • {study.year}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gradient-to-br from-indigo-50 to-blue-50/60 p-5 rounded-2xl border border-indigo-100">
            {study.metrics.map((metric, idx) => (
              <div key={idx} className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-indigo-700 font-medium text-xs uppercase tracking-wide mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-[#DC5F12]" />
                  {metric.label}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#2F7DB0]">
                  {metric.value}
                </div>
                {metric.detail && (
                  <p className="text-xs text-gray-600 mt-1">{metric.detail}</p>
                )}
              </div>
            ))}
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 font-archivo mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                The Challenge
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 font-archivo mb-3 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Our Solution
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Outcome & Impact */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-[#2F7DB0] font-archivo mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Measurable Outcome & Impact
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {study.outcome}
            </p>
          </div>

          {/* Testimonial Quote */}
          {study.testimonial && (
            <div className="relative p-6 sm:p-8 bg-[#2F7DB0]/5 border-l-4 border-[#2F7DB0] rounded-r-2xl">
              <blockquote className="text-base sm:text-lg italic text-gray-800 font-medium">
                "{study.testimonial.quote}"
              </blockquote>
              <div className="mt-4">
                <div className="font-semibold text-gray-900 text-sm">
                  {study.testimonial.author}
                </div>
                <div className="text-xs text-gray-600">
                  {study.testimonial.role} — {study.testimonial.organization}
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack & Tags */}
          <div className="pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Technologies:
              </span>
              {study.technologies.map((tech, idx) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#DC5F12] text-white rounded-xl hover:bg-[#c45510] text-sm font-medium transition-all"
            >
              Done Viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
