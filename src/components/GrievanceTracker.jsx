import React, { useState, useEffect } from 'react';
import { 
  Search, Shield, Clock, FileText, CheckCircle2, AlertTriangle, Scale, 
  ArrowRight, Download, Star, MessageSquare, AlertCircle, Building, User, Calendar, ExternalLink
} from 'lucide-react';

export default function GrievanceTracker({ 
  grievances = [], 
  selectedDocketId = null,
  onViewOrder,
  onOpenFeedback,
  onOpenAppeal
}) {
  const [searchQuery, setSearchQuery] = useState(selectedDocketId || '');
  const [activeGrievance, setActiveGrievance] = useState(null);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'triage' | 'evidence' | 'timeline'

  // Update active grievance when list or selected docket changes
  useEffect(() => {
    if (selectedDocketId) {
      const found = grievances.find(g => g.id.toLowerCase() === selectedDocketId.toLowerCase());
      if (found) {
        setActiveGrievance(found);
        setSearchQuery(found.id);
        return;
      }
    }
    if (!activeGrievance && grievances.length > 0) {
      setActiveGrievance(grievances[0]);
      setSearchQuery(grievances[0].id);
    }
  }, [selectedDocketId, grievances]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = grievances.find(
      g => g.id.toLowerCase() === query || 
           (g.rollNumber && g.rollNumber.toLowerCase() === query) ||
           (g.trackingPin && g.trackingPin === query)
    );

    if (found) {
      setActiveGrievance(found);
    } else {
      alert(`No active grievance docket found matching "${searchQuery}". Please verify the Docket ID.`);
    }
  };

  const selectDocket = (g) => {
    setActiveGrievance(g);
    setSearchQuery(g.id);
  };

  if (!activeGrievance) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-institutional-500">Loading docket records...</p>
      </div>
    );
  }

  // Calculate SLA countdown
  const now = new Date();
  const deadline = new Date(activeGrievance.slaDeadline);
  const hoursRemaining = Math.round((deadline - now) / (1000 * 60 * 60));
  const isOverdue = hoursRemaining < 0 && activeGrievance.status !== 'Resolved';

  // Compute status stepper stage
  const getStageIndex = (status) => {
    switch (status) {
      case 'Submitted': return 1;
      case 'Under Review': return 2;
      case 'Hearing Scheduled': return 3;
      case 'Action Directed': return 4;
      case 'Resolved': return 5;
      case 'Appealed to Ombudsperson': return 3;
      default: return 2;
    }
  };

  const currentStage = getStageIndex(activeGrievance.status);

  const stages = [
    { label: 'Intake Registered', desc: 'Docket verified & logged' },
    { label: 'Policy Triaged', desc: 'Rules & SLA assigned' },
    { label: 'Committee Review', desc: 'Deliberation & inquiry' },
    { label: 'Resolution Enacted', desc: 'Statutory order issued' },
    { label: 'Redressal Closed', desc: 'Remedy executed' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Search Bar Header */}
      <div className="bg-white p-5 rounded-xl border border-institutional-200 shadow-sm mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-institutional-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Docket ID (e.g. APX-2026-GRV-8194), Roll Number, or PIN..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-institutional-300 text-sm focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-crest-navy hover:bg-crest-blue text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search Docket
          </button>
        </form>

        {/* Quick Docket Selection Pills */}
        <div className="mt-4 pt-3 border-t border-institutional-100 flex items-center flex-wrap gap-2 text-xs">
          <span className="text-institutional-500 font-medium">Quick Inspection Dockets:</span>
          {grievances.map((g) => (
            <button
              key={g.id}
              onClick={() => selectDocket(g)}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-all border ${
                activeGrievance.id === g.id
                  ? 'bg-crest-navy text-white border-crest-navy font-bold shadow-sm'
                  : 'bg-institutional-50 hover:bg-institutional-100 text-institutional-700 border-institutional-200'
              }`}
            >
              {g.id} ({g.category.split(' ')[0]})
            </button>
          ))}
        </div>
      </div>

      {/* Main Docket Display Card */}
      <div className="bg-white rounded-xl border border-institutional-200 shadow-elevated overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-crest-navy text-white p-6 sm:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-crest-gold/30">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-xs sm:text-sm font-bold text-crest-goldLight bg-white/10 px-3 py-1 rounded border border-white/20">
                DOCKET: {activeGrievance.id}
              </span>
              <span className="text-xs text-institutional-300 bg-black/20 px-2 py-0.5 rounded font-mono">
                PIN: {activeGrievance.trackingPin}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                activeGrievance.status === 'Resolved'
                  ? 'bg-emerald-600 text-white'
                  : activeGrievance.status === 'Hearing Scheduled'
                  ? 'bg-amber-600 text-white'
                  : activeGrievance.status === 'Appealed to Ombudsperson'
                  ? 'bg-purple-700 text-white'
                  : 'bg-blue-600 text-white'
              }`}>
                {activeGrievance.status}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mt-2 leading-tight">
              {activeGrievance.subject}
            </h2>

            <div className="flex items-center gap-4 mt-2 text-xs text-institutional-200 flex-wrap">
              <span>Category: <strong className="text-white">{activeGrievance.category}</strong></span>
              <span>•</span>
              <span>Registered: <strong className="text-white">{new Date(activeGrievance.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</strong></span>
            </div>
          </div>

          {/* SLA Counter Badge */}
          <div className="bg-white/10 p-3.5 rounded-lg border border-white/15 text-right shrink-0">
            <div className="flex items-center gap-2 justify-end text-xs text-institutional-200 font-medium">
              <Clock className="w-3.5 h-3.5 text-crest-gold" />
              <span>Statutory Turnaround SLA</span>
            </div>
            <p className="text-base font-bold text-white mt-0.5">
              {activeGrievance.priority}
            </p>
            <p className={`text-[11px] font-semibold mt-0.5 ${
              isOverdue ? 'text-red-300 font-bold' : 'text-crest-goldLight'
            }`}>
              {activeGrievance.status === 'Resolved' 
                ? 'Case Successfully Closed'
                : isOverdue 
                ? `Breached by ${Math.abs(hoursRemaining)}h (Auto-Escalated)` 
                : `${hoursRemaining}h Remaining in Statutory SLA`
              }
            </p>
          </div>
        </div>

        {/* Visual 5-Stage Institutional Progress Stepper */}
        <div className="bg-institutional-50/80 p-6 border-b border-institutional-200">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {stages.map((stg, i) => {
                const stepNum = i + 1;
                const isCompleted = currentStage >= stepNum;
                const isCurrent = currentStage === stepNum;

                return (
                  <div key={i} className="flex flex-col items-center text-center">
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs mb-2 transition-all ${
                        isCompleted 
                          ? 'bg-crest-navy text-white shadow-sm ring-2 ring-crest-navy/20'
                          : 'bg-white border-2 border-institutional-300 text-institutional-400'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5 text-crest-goldLight" /> : stepNum}
                    </div>
                    <p className={`text-xs font-bold ${
                      isCurrent ? 'text-crest-navy' : isCompleted ? 'text-institutional-800' : 'text-institutional-400'
                    }`}>
                      {stg.label}
                    </p>
                    <p className="text-[10px] text-institutional-500 hidden sm:block mt-0.5">
                      {stg.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-institutional-200 px-6 flex items-center gap-2 overflow-x-auto bg-white">
          {[
            { id: 'summary', label: 'Case Dossier & Statement', icon: FileText },
            { id: 'triage', label: 'Policy Triage & Jurisprudence', icon: Scale },
            { id: 'evidence', label: `Attached Proofs (${activeGrievance.attachments.length})`, icon: Download },
            { id: 'timeline', label: `Audit Trail (${activeGrievance.timeline.length})`, icon: Clock }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-crest-navy text-crest-navy'
                    : 'border-transparent text-institutional-600 hover:text-institutional-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 sm:p-8">
          
          {/* TAB 1: Summary & Statement */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              
              {/* Applicant Particulars Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-institutional-50 border border-institutional-200 text-xs">
                <div>
                  <span className="text-institutional-500 block mb-0.5">Applicant Name:</span>
                  <strong className="text-institutional-900 text-sm">
                    {activeGrievance.studentName}
                  </strong>
                  <span className="block text-[11px] text-institutional-500 font-mono mt-0.5">
                    Roll: {activeGrievance.rollNumber}
                  </span>
                </div>
                <div>
                  <span className="text-institutional-500 block mb-0.5">School / Department:</span>
                  <strong className="text-institutional-900">{activeGrievance.department}</strong>
                  <span className="block text-[11px] text-institutional-500 mt-0.5">
                    {activeGrievance.semester}
                  </span>
                </div>
                <div>
                  <span className="text-institutional-500 block mb-0.5">Assigned Standing Authority:</span>
                  <strong className="text-institutional-900">{activeGrievance.committee.name}</strong>
                  <span className="block text-[11px] text-institutional-500 mt-0.5">
                    Officer: {activeGrievance.committee.officer}
                  </span>
                </div>
              </div>

              {/* Statement of Grievance */}
              <div>
                <h3 className="text-xs font-bold text-institutional-700 uppercase tracking-wider mb-2">
                  Official Statement of Grievance
                </h3>
                <div className="p-5 rounded-xl bg-white border border-institutional-200 text-sm text-institutional-900 leading-relaxed whitespace-pre-line font-serif">
                  {activeGrievance.statement}
                </div>
              </div>

              {/* Incident Details Bar */}
              <div className="flex items-center gap-6 text-xs text-institutional-600 border-t border-institutional-200 pt-4">
                <span>Incident Date: <strong className="text-institutional-800">{activeGrievance.incidentDate}</strong></span>
                <span>•</span>
                <span>Anonymity Protection: <strong className="text-institutional-800">{activeGrievance.isAnonymous ? 'Strict Whistleblower Protocol' : 'Standard Docket'}</strong></span>
                <span>•</span>
                <span>Committee Office: <strong className="text-institutional-800">{activeGrievance.committee.office}</strong></span>
              </div>
            </div>
          )}

          {/* TAB 2: Automated Policy Triage & Jurisprudence */}
          {activeTab === 'triage' && (
            <div className="space-y-6">
              <div className="bg-crest-navy/5 border border-crest-navy/20 p-5 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-crest-navy text-white shrink-0 mt-0.5">
                    <Scale className="w-5 h-5 text-crest-gold" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-serif text-crest-navy">
                      Automated Policy Triage & Jurisdictional Analysis
                    </h3>
                    <p className="text-xs text-institutional-700 mt-0.5 leading-relaxed">
                      Our institutional policy engine automatically evaluated the factual narrative, identified statutory regulatory categories, assigned priority turnaround SLA, and cross-referenced pertinent university statutes.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-3 border-t border-crest-navy/15">
                  <div>
                    <span className="text-institutional-600 block">Classified Category:</span>
                    <strong className="text-crest-navy font-semibold">{activeGrievance.triageInfo.detectedCategory}</strong>
                  </div>
                  <div>
                    <span className="text-institutional-600 block">NLP Confidence:</span>
                    <strong className="text-emerald-700 font-semibold">{activeGrievance.triageInfo.categoryConfidence}% Deterministic</strong>
                  </div>
                  <div>
                    <span className="text-institutional-600 block">Urgency Factor:</span>
                    <strong className="text-red-700 font-semibold">Level {activeGrievance.triageInfo.urgencyScore} / 10</strong>
                  </div>
                  <div>
                    <span className="text-institutional-600 block">Statutory SLA:</span>
                    <strong className="text-crest-navy font-semibold">{activeGrievance.priority}</strong>
                  </div>
                </div>
              </div>

              {/* Matched University Bylaws & Regulatory Articles */}
              <div>
                <h4 className="text-xs font-bold text-institutional-800 uppercase tracking-wider mb-3">
                  Cross-Referenced Statutory Bylaws & Regulations
                </h4>
                <div className="space-y-3">
                  {activeGrievance.triageInfo.matchedBylaws.map((bylaw, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl bg-institutional-50 border border-institutional-200 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-crest-navy text-[11px] bg-white px-2 py-0.5 rounded border border-institutional-200">
                          {bylaw.code}
                        </span>
                        <span className="text-[10px] text-institutional-500 font-semibold uppercase">
                          Applicable Statute
                        </span>
                      </div>
                      <h5 className="font-bold text-institutional-900 text-sm pt-1">
                        {bylaw.title}
                      </h5>
                      <p className="text-institutional-600 text-xs leading-relaxed pt-0.5">
                        {bylaw.clause}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Attached Proofs */}
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-institutional-700 uppercase tracking-wider">
                Documentary Submissions on Record
              </h3>
              {activeGrievance.attachments.length === 0 ? (
                <p className="text-xs text-institutional-500 italic">No documentary files submitted with this docket.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeGrievance.attachments.map((att, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-xl bg-institutional-50 border border-institutional-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-9 h-9 rounded-lg bg-crest-navy/10 text-crest-navy flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="font-semibold text-institutional-900 truncate">{att.name}</p>
                          <span className="text-[11px] text-institutional-500">{att.size}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert(`Simulating secure verified download of: ${att.name}`)}
                        className="p-2 rounded-lg bg-white hover:bg-institutional-100 text-crest-navy border border-institutional-200 shadow-sm transition-colors shrink-0"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Audit Trail */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-institutional-700 uppercase tracking-wider">
                Chronological Case Audit Trail & Activity Log
              </h3>
              <div className="relative border-l-2 border-institutional-200 ml-4 space-y-6 py-2">
                {activeGrievance.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-crest-navy border-2 border-white shadow-sm" />
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-bold text-institutional-900">{item.step}</span>
                      <span className="text-[11px] text-institutional-400 font-mono">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-crest-goldDark font-medium mt-0.5">
                      Action Taken By: {item.actor}
                    </p>
                    <p className="text-xs text-institutional-600 mt-1 bg-institutional-50 p-2.5 rounded-lg border border-institutional-200 leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Actions Bar */}
        <div className="bg-institutional-50 p-4 sm:p-6 border-t border-institutional-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-institutional-600">
            {activeGrievance.resolutionOrder ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                Formal Resolution Order Enacted (Order No: {activeGrievance.resolutionOrder.orderNumber})
              </span>
            ) : (
              <span className="text-institutional-500">
                Deliberations ongoing under {activeGrievance.committee.name}.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-end w-full sm:w-auto">
            {/* View Resolution Order Button */}
            {activeGrievance.resolutionOrder && (
              <button
                type="button"
                onClick={() => onViewOrder(activeGrievance)}
                className="px-4 py-2 bg-crest-navy hover:bg-crest-blue text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <FileText className="w-4 h-4 text-crest-goldLight" />
                View Certified Resolution Order
              </button>
            )}

            {/* Satisfaction / Close Feedback */}
            {activeGrievance.status !== 'Resolved' && (
              <button
                type="button"
                onClick={() => onOpenFeedback(activeGrievance)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Mark Resolved & Review
              </button>
            )}

            {/* Lodge Appeal */}
            {activeGrievance.status !== 'Appealed to Ombudsperson' && (
              <button
                type="button"
                onClick={() => onOpenAppeal(activeGrievance)}
                className="px-4 py-2 bg-white hover:bg-institutional-100 text-institutional-800 border border-institutional-300 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5"
              >
                <Scale className="w-4 h-4 text-crest-maroon" />
                Lodge Appeal to Ombudsperson
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
