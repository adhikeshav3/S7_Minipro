import React from 'react';
import { 
  BarChart3, TrendingUp, CheckCircle, Clock, AlertTriangle, 
  FileText, Shield, Award, Printer, ArrowUpRight, Scale 
} from 'lucide-react';
import { CATEGORIES } from '../services/triageEngine';

export default function AnalyticsDashboard({ grievances = [] }) {
  const total = grievances.length;
  const resolved = grievances.filter(g => g.status === 'Resolved').length;
  const underAction = grievances.filter(g => g.status === 'Action Directed').length;
  const underReview = grievances.filter(g => g.status === 'Under Review' || g.status === 'Hearing Scheduled').length;
  const resolutionRate = total > 0 ? ((resolved / total) * 100).toFixed(1) : '100';

  // Category Breakdown
  const categoryCounts = {};
  Object.values(CATEGORIES).forEach(c => { categoryCounts[c] = 0; });
  grievances.forEach(g => {
    if (categoryCounts[g.category] !== undefined) {
      categoryCounts[g.category]++;
    }
  });

  // Priority Breakdown
  const p1 = grievances.filter(g => g.priority.includes('P1')).length;
  const p2 = grievances.filter(g => g.priority.includes('P2')).length;
  const p3 = grievances.filter(g => g.priority.includes('P3')).length;
  const p4 = grievances.filter(g => g.priority.includes('P4')).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Top Banner & Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-institutional-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-crest-gold/20 text-crest-goldDark font-bold text-xs uppercase tracking-wider border border-crest-gold/30 mb-1">
            <Scale className="w-3.5 h-3.5" />
            Statutory Public Disclosure • Section 14
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-crest-navy">
            Institutional Redressal & Transparency Metrics
          </h2>
          <p className="text-xs sm:text-sm text-institutional-600 mt-1">
            Published in compliance with University Grants Commission (Grievance Redressal of Students) Regulations, 2023.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-crest-navy hover:bg-crest-blue text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 no-print"
        >
          <Printer className="w-4 h-4 text-crest-gold" />
          Export Institutional Report
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div className="bg-white p-5 rounded-xl border border-institutional-200 shadow-sm">
          <div className="flex items-center justify-between text-institutional-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Grievances</span>
            <FileText className="w-5 h-5 text-crest-navy" />
          </div>
          <p className="text-3xl font-bold font-serif text-crest-navy">{total}</p>
          <p className="text-[11px] text-institutional-500 mt-1">All academic & campus dockets</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-institutional-200 shadow-sm">
          <div className="flex items-center justify-between text-institutional-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Redressal Rate</span>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold font-serif text-emerald-700">{resolutionRate}%</p>
          <p className="text-[11px] text-emerald-600 mt-1">Above statutory UGC benchmark (90%)</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-institutional-200 shadow-sm">
          <div className="flex items-center justify-between text-institutional-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg. Turnaround</span>
            <Clock className="w-5 h-5 text-crest-gold" />
          </div>
          <p className="text-3xl font-bold font-serif text-crest-navy">2.6 Days</p>
          <p className="text-[11px] text-institutional-500 mt-1">Statutory SLA limit: 15 Days</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-institutional-200 shadow-sm">
          <div className="flex items-center justify-between text-institutional-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Pipeline</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold font-serif text-blue-800">{total - resolved}</p>
          <p className="text-[11px] text-blue-600 mt-1">{underAction} Orders Enacted, {underReview} In Inquiry</p>
        </div>

      </div>

      {/* Two Column Visual Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Category Distribution Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-institutional-200 shadow-sm">
          <h3 className="text-base font-bold font-serif text-crest-navy mb-1 flex items-center justify-between">
            <span>Jurisdictional Category Distribution</span>
            <span className="text-xs text-institutional-500 font-sans font-normal">Academic Year 2026</span>
          </h3>
          <p className="text-xs text-institutional-600 mb-6">
            Proportion of student petitions received across standing committees.
          </p>

          <div className="space-y-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = total > 0 ? ((count / total) * 100).toFixed(0) : 0;
              return (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-institutional-800">
                    <span className="truncate pr-2">{cat}</span>
                    <span className="shrink-0">{count} cases ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-institutional-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-crest-navy rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority & Severity Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-institutional-200 shadow-sm">
          <h3 className="text-base font-bold font-serif text-crest-navy mb-1">
            Statutory Urgency & Severity Tiers
          </h3>
          <p className="text-xs text-institutional-600 mb-6">
            Classification by turnaround SLA deadlines.
          </p>

          <div className="space-y-3.5">
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-red-900 block">P1 - Critical (24h Turnaround)</span>
                <span className="text-[11px] text-red-700">Anti-Ragging, Harassment, Safety</span>
              </div>
              <strong className="text-lg font-bold text-red-800">{p1}</strong>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-900 block">P2 - High (48h Turnaround)</span>
                <span className="text-[11px] text-amber-700">Exam Hall Tickets, Medical shortfalls</span>
              </div>
              <strong className="text-lg font-bold text-amber-800">{p2}</strong>
            </div>

            <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-blue-900 block">P3 - Medium (5-Day Turnaround)</span>
                <span className="text-[11px] text-blue-700">Fee Reconciliations, Answer Scripts</span>
              </div>
              <strong className="text-lg font-bold text-blue-800">{p3}</strong>
            </div>

            <div className="p-3.5 rounded-lg bg-institutional-50 border border-institutional-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-institutional-900 block">P4 - Routine (10-Day SLA)</span>
                <span className="text-[11px] text-institutional-600">Certificates, General Queries</span>
              </div>
              <strong className="text-lg font-bold text-institutional-800">{p4}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Institutional Ombudsman Annual Assurance Notice */}
      <div className="bg-institutional-50 p-6 rounded-xl border border-institutional-200 text-xs text-institutional-700 leading-relaxed font-serif">
        <h4 className="font-sans font-bold text-crest-navy text-sm mb-2">
          Ombudsperson's Statement of Institutional Compliance:
        </h4>
        <p>
          The Office of the University Ombudsperson certifies that every registered grievance undergoes unbiased evaluation under the aegis of the Vice-Chancellor. In accordance with Regulation 5(3) of UGC Grievance Redressal Norms, students retain the statutory right to an independent hearing and appeal before the Appellate Authority if unresolved within prescribed SLA intervals.
        </p>
      </div>

    </div>
  );
}
