import React, { useState } from 'react';
import { Search, ShieldAlert, FileText, CheckCircle, Clock, ArrowRight, ShieldCheck, Scale, Award, HelpCircle, Sparkles } from 'lucide-react';

export default function HeroBanner({ onSearchDocket, onNavigate, grievances = [] }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchDocket(searchInput.trim().toUpperCase());
    }
  };

  const sampleDockets = grievances.slice(0, 3).map(g => g.id);

  return (
    <div className="relative bg-crest-navy text-white overflow-hidden border-b border-crest-gold/20">
      {/* Background Architectural Texture with Deep Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Decorative Classical Lattice Borders */}
      <div className="absolute inset-0 bg-gradient-to-r from-crest-deep via-crest-navy/95 to-crest-deep/90 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-14">
        
        {/* Simple How-It-Works Visual Guide Bar (For First-time Users & Evaluators) */}
        <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2 pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-crest-goldLight flex items-center gap-1.5 font-mono">
              <HelpCircle className="w-4 h-4 text-crest-gold" />
              How This Redressal System Works (In 3 Simple Steps)
            </span>
            <span className="text-[11px] text-institutional-300">
              Guaranteed by UGC Regulations, 2023
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
              <span className="w-6 h-6 rounded-full bg-crest-gold text-crest-deep font-bold flex items-center justify-center shrink-0 text-xs">1</span>
              <div>
                <strong className="text-white block text-xs">Lodge Complaint (2 Mins)</strong>
                <p className="text-[11px] text-institutional-300 mt-0.5">
                  State your issue & upload proof. Toggle <em>Whistleblower Shield</em> to keep your name 100% hidden.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
              <span className="w-6 h-6 rounded-full bg-crest-gold text-crest-deep font-bold flex items-center justify-center shrink-0 text-xs">2</span>
              <div>
                <strong className="text-white block text-xs">Automated Policy Triage</strong>
                <p className="text-[11px] text-institutional-300 mt-0.5">
                  The system routes your docket to the right Dean/Controller and sets a strict 24h–48h deadline.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-white/5 p-2.5 rounded-lg border border-white/10">
              <span className="w-6 h-6 rounded-full bg-crest-gold text-crest-deep font-bold flex items-center justify-center shrink-0 text-xs">3</span>
              <div>
                <strong className="text-white block text-xs">Signed Resolution Order</strong>
                <p className="text-[11px] text-institutional-300 mt-0.5">
                  Receive a legally certified, printable university decree order with official seals and directives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Institutional Mission & Intake Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crest-gold/15 border border-crest-gold/40 text-crest-goldLight text-xs font-semibold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-crest-gold" />
              Statutory Directorate of Student Grievance Redressal
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
              Fair, Transparent & Expedited Student Justice.
            </h1>

            <p className="text-institutional-200 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Apex University adheres to the <strong className="text-white font-medium">UGC Redressal of Grievances Regulations</strong>. All academic, financial, residential, and evaluative petitions are processed through our automated statutory triage system with legally binding resolution orders.
            </p>

            {/* Quick Track Docket Search Bar with Simple Guidance */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 p-1.5 rounded-lg border border-white/20 backdrop-blur-md shadow-elevated">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search className="w-4 h-4 text-institutional-300 shrink-0" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter Docket ID (e.g., APX-2026-GRV-8194) or PIN..."
                    className="w-full bg-transparent text-white placeholder-institutional-300 text-sm focus:outline-none py-2"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-crest-gold hover:bg-crest-goldLight text-crest-deep font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  Track Docket
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sample Docket Quick Links with Explanation */}
              <div className="mt-3 flex items-center flex-wrap gap-2 text-xs text-institutional-300">
                <span className="font-semibold text-white">Try a Live Demo Case in 1-Click:</span>
                {sampleDockets.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSearchDocket(id)}
                    className="px-2.5 py-1 rounded bg-white/15 hover:bg-crest-gold hover:text-crest-deep text-crest-goldLight font-mono text-[11px] font-bold transition-all border border-white/20 shadow-sm"
                    title={`Click to immediately open and inspect docket ${id}`}
                  >
                    🔍 {id}
                  </button>
                ))}
              </div>
            </form>
          </div>

          {/* Right Column: Key Action Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
            
            {/* Card 1: Submit Grievance */}
            <div 
              onClick={() => onNavigate('submit')}
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-4 transition-all cursor-pointer backdrop-blur-md group hover:border-crest-gold/50 shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-crest-gold/20 text-crest-goldLight flex items-center justify-center shrink-0 border border-crest-gold/30 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5 text-crest-gold" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-crest-goldLight transition-colors flex items-center gap-1.5">
                    Lodge Formal Grievance
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-institutional-200 mt-1 leading-normal">
                    Simple 5-step form with automatic department routing, file proof uploads, and identity protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Track & Appellate */}
            <div 
              onClick={() => onNavigate('track')}
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-4 transition-all cursor-pointer backdrop-blur-md group hover:border-crest-gold/50 shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    Track Docket & Official Orders
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-institutional-200 mt-1 leading-normal">
                    Check live progress, see time left in SLA deadline, and download signed resolution orders.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Statutory Code */}
            <div 
              onClick={() => onNavigate('policies')}
              className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl p-4 transition-all cursor-pointer backdrop-blur-md group hover:border-crest-gold/50 shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-500/30 group-hover:scale-105 transition-transform">
                  <Scale className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-white group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    Student Charter & Bylaws
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-institutional-200 mt-1 leading-normal">
                    Know your legal rights on re-evaluations, fee refunds, hostel standards, and anti-ragging protection.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Institutional Assurance Strip */}
        <div className="mt-10 pt-5 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-bold text-white">96.4% Redressal Rate</p>
              <p className="text-[11px] text-institutional-300">Under UGC Regulations</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-crest-gold shrink-0" />
            <div>
              <p className="font-bold text-white">24h – 48h Expedited SLA</p>
              <p className="text-[11px] text-institutional-300">For Critical & Examination Cases</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <div>
              <p className="font-bold text-white">Zero Tolerance</p>
              <p className="text-[11px] text-institutional-300">Anti-Ragging & Harassment Cell</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-blue-300 shrink-0" />
            <div>
              <p className="font-bold text-white">Legally Certified Orders</p>
              <p className="text-[11px] text-institutional-300">Digitally Verified Decrees</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
