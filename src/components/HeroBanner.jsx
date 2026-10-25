import React, { useState } from 'react';
import { Search, ShieldAlert, FileText, CheckCircle, Clock, ArrowRight, ShieldCheck, Scale, Award } from 'lucide-react';

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-16">
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

            {/* Quick Track Docket Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-white/10 p-1.5 rounded-lg border border-white/20 backdrop-blur-md shadow-elevated">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search className="w-4 h-4 text-institutional-300" />
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Enter Docket ID (e.g., APX-2026-GRV-8194)..."
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

              {/* Sample Docket Quick Links */}
              <div className="mt-3 flex items-center flex-wrap gap-2 text-xs text-institutional-300">
                <span className="font-medium text-institutional-400">Quick Test Dockets:</span>
                {sampleDockets.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onSearchDocket(id)}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-crest-goldLight font-mono text-[11px] transition-colors border border-white/10"
                  >
                    {id}
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
                    Structured 5-step intake with automated classification, evidentiary uploads, and identity protection.
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
                    Inspect committee deliberations, hearing orders, and download certified resolution decrees.
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
                    Statutory regulations on evaluation, hostel welfare, tuition fee reconciliation, and ICC anti-ragging mandates.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Institutional Assurance Strip */}
        <div className="mt-12 pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
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
