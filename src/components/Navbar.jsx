import React from 'react';
import { Shield, Building, FileText, Search, BookOpen, BarChart3, Lock, CheckCircle2, PhoneCall } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, pendingCount = 0 }) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-institutional-200 shadow-sm no-print">
      {/* Top Statutory / Accreditation Strip */}
      <div className="bg-crest-deep text-white text-[11px] font-medium tracking-wide py-1.5 px-4 sm:px-8 border-b border-institutional-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-crest-gold/20 text-crest-goldLight font-semibold text-[10px] tracking-wider uppercase border border-crest-gold/30">
              NAAC 'A++' ACCREDITED
            </span>
            <span className="text-institutional-300">
              UGC Statutory Compliance • Section 12(B) Validated
            </span>
          </div>
          <div className="flex items-center gap-4 text-institutional-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3 text-crest-goldLight" />
              Statutory Anti-Ragging Helpline: <strong className="text-white">1800-180-5522</strong>
            </span>
            <span className="hidden md:inline text-institutional-600">|</span>
            <span className="hidden md:inline hover:text-white transition-colors">
              Grievance Desk: <strong>grievance@apexuniv.edu.in</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main University Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* University Crest & Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3.5 cursor-pointer group"
        >
          {/* Institutional Crest SVG Emblem */}
          <div className="w-12 h-12 rounded-lg bg-crest-navy text-crest-goldLight flex items-center justify-center shadow-seal border border-crest-gold/30 p-2 group-hover:border-crest-gold transition-colors">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full text-current">
              {/* Laurel Wreath */}
              <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
              {/* University Temple / Scales of Justice */}
              <path d="M24 7L10 14V17H38V14L24 7Z" fill="currentColor" opacity="0.9" />
              <rect x="13" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="20" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="25" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="32" y="19" width="3" height="13" rx="0.5" fill="currentColor" />
              <rect x="8" y="34" width="32" height="3" rx="0.5" fill="currentColor" />
              <path d="M24 41L21 38H27L24 41Z" fill="#c59b27" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold font-serif text-crest-navy tracking-tight group-hover:text-crest-blue transition-colors">
                APEX UNIVERSITY
              </h1>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-institutional-100 text-institutional-700 border border-institutional-200">
                ESTD. 1958
              </span>
            </div>
            <p className="text-xs text-institutional-600 font-medium tracking-normal">
              Central Student Grievance Redressal & Resolution Directorate
            </p>
          </div>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'home'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'text-institutional-700 hover:bg-institutional-100'
            }`}
          >
            <Building className="w-4 h-4" />
            Overview
          </button>

          <button
            onClick={() => setActiveTab('submit')}
            className={`px-3.5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'submit'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'bg-crest-gold/15 text-institutional-900 border border-crest-gold/40 hover:bg-crest-gold/25'
            }`}
          >
            <FileText className="w-4 h-4 text-crest-goldDark" />
            Lodge Grievance
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'track'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'text-institutional-700 hover:bg-institutional-100'
            }`}
          >
            <Search className="w-4 h-4" />
            Track Docket
          </button>

          <button
            onClick={() => setActiveTab('policies')}
            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'policies'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'text-institutional-700 hover:bg-institutional-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Charter & Bylaws
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'analytics'
                ? 'bg-crest-navy text-white shadow-sm'
                : 'text-institutional-700 hover:bg-institutional-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Transparency
          </button>

          {/* Committee / Officer Desk Toggle */}
          <button
            onClick={() => setActiveTab('workbench')}
            className={`ml-2 px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border ${
              activeTab === 'workbench'
                ? 'bg-crest-maroon text-white border-crest-maroon shadow-sm'
                : 'bg-institutional-50 text-institutional-800 border-institutional-300 hover:bg-institutional-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-crest-maroon" />
            Officer Desk
            {pendingCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-red-600 text-white rounded-full text-[10px] font-bold">
                {pendingCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
