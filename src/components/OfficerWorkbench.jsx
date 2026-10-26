import React, { useState } from 'react';
import { 
  Lock, Shield, Filter, Search, CheckCircle2, Clock, AlertTriangle, FileText, 
  Send, UserCheck, Calendar, Scale, ChevronRight, Eye, RefreshCw, X, Award
} from 'lucide-react';
import { UNIVERSITY_OFFICERS } from '../data/mockGrievances';

export default function OfficerWorkbench({ 
  grievances = [], 
  onUpdateStatus, 
  onIssueOrder,
  onViewDocket
}) {
  const [selectedOfficer, setSelectedOfficer] = useState(UNIVERSITY_OFFICERS[1]); // Default to Dr. Savita Nambiar (COE)
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCase, setActiveCase] = useState(null);

  // Resolution Composer Form State
  const [composerOpen, setComposerOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    findingsSummary: '',
    statutoryCitation: '',
    directive1: '',
    directive2: '',
    directive3: '',
    complianceDeadline: 'Within 24 Hours'
  });

  // Filter grievances for the workbench
  const filteredGrievances = grievances.filter(g => {
    // If officer is chosen, we can either view all or match committee
    const matchesSearch = 
      g.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.subject.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'OVERDUE') {
      const now = new Date();
      const deadline = new Date(g.slaDeadline);
      return deadline < now && g.status !== 'Resolved';
    }
    return g.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleOpenReview = (g) => {
    setActiveCase(g);
    setComposerOpen(false);

    // Pre-populate resolution composer from automated policy triage recommendation
    const draft = g.triageInfo && g.triageInfo.detectedCategory 
      ? g.triageInfo.matchedBylaws[0] || {}
      : {};

    setOrderForm({
      findingsSummary: `Upon examination of records submitted under Docket ${g.id}, the standing committee verifies that the factual grievances substantiate administrative intervention under university statutes.`,
      statutoryCitation: draft.title || 'UGC Student Grievance Regulations, 2023',
      directive1: `Direct the competent section to rectify records pertaining to ${g.studentName} within 24 hours.`,
      directive2: 'Issue certified documentation to the petitioner immediately.',
      directive3: 'Submit compliance certificate to the Directorate of Student Welfare.',
      complianceDeadline: 'Within 24 Hours'
    });
  };

  const handleStatusChange = (newStatus, note = '') => {
    if (!activeCase) return;
    onUpdateStatus(activeCase.id, newStatus, selectedOfficer.name, note);
    setActiveCase(prev => ({
      ...prev,
      status: newStatus,
      timeline: [
        ...prev.timeline,
        {
          step: `Status Updated: ${newStatus}`,
          timestamp: new Date().toLocaleTimeString(),
          actor: selectedOfficer.name,
          note: note || `Updated via Officer Workbench`
        }
      ]
    }));
  };

  const handleDispatchOrder = (e) => {
    e.preventDefault();
    if (!activeCase) return;

    const directives = [orderForm.directive1, orderForm.directive2, orderForm.directive3].filter(Boolean);

    onIssueOrder(activeCase.id, {
      authorityName: selectedOfficer.name,
      designation: selectedOfficer.designation,
      statutoryCitation: orderForm.statutoryCitation,
      findingsSummary: orderForm.findingsSummary,
      directives,
      complianceDeadline: orderForm.complianceDeadline
    });

    setComposerOpen(false);
    setActiveCase(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Simple English Explanatory Notice for Evaluators & Visitors */}
      <div className="mb-6 p-4 rounded-xl bg-crest-navy/5 border border-crest-navy/20 flex items-start gap-3 text-xs text-institutional-800">
        <Shield className="w-5 h-5 text-crest-maroon shrink-0 mt-0.5" />
        <div>
          <strong className="block text-crest-navy text-sm font-serif">
            Officer & Committee Administration Desk
          </strong>
          <p className="mt-0.5 text-institutional-600 leading-relaxed">
            This is the restricted workbench where University Deans, the Controller of Examinations, and the Chief Warden manage complaints. <strong>Try switching officer personas below</strong> to test how each authority reviews petitions, schedules hearings, and issues digitally signed resolution decrees.
          </p>
        </div>
      </div>

      {/* Officer Desk Header & Role Switcher */}
      <div className="bg-crest-deep text-white p-6 rounded-2xl border border-crest-gold/30 shadow-elevated mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          
          <div className="flex items-center gap-4">
            <img 
              src={selectedOfficer.avatar} 
              alt={selectedOfficer.name}
              className="w-16 h-16 rounded-xl object-cover border-2 border-crest-gold shadow-md shrink-0" 
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-crest-gold/20 text-crest-goldLight border border-crest-gold/30">
                  Standing Committee Session
                </span>
                <span className="text-xs text-institutional-400">Authenticated Portal Access</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                {selectedOfficer.name}
              </h2>
              <p className="text-xs text-institutional-300">
                {selectedOfficer.designation} • {selectedOfficer.committee}
              </p>
            </div>
          </div>

          {/* Role Switcher Dropdown with Plain English Label */}
          <div className="bg-white/10 p-3 rounded-xl border border-white/15 w-full lg:w-auto">
            <label className="block text-[11px] text-crest-goldLight font-bold uppercase tracking-wider mb-1">
              Switch Authority Persona (Demo):
            </label>
            <select
              value={selectedOfficer.id}
              onChange={(e) => {
                const found = UNIVERSITY_OFFICERS.find(o => o.id === e.target.value);
                if (found) setSelectedOfficer(found);
              }}
              className="w-full lg:w-72 px-3 py-2 rounded-lg bg-crest-navy text-white text-xs font-semibold border border-white/20 focus:outline-none focus:ring-2 focus:ring-crest-gold"
            >
              {UNIVERSITY_OFFICERS.map(officer => (
                <option key={officer.id} value={officer.id}>
                  {officer.name} ({officer.designation.split(',')[0]})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Workbench Quick Metrics Strip */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <span className="text-institutional-400 block">Total Dockets:</span>
            <strong className="text-xl font-bold text-white">{grievances.length}</strong>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <span className="text-institutional-400 block">Requiring Action:</span>
            <strong className="text-xl font-bold text-crest-goldLight">
              {grievances.filter(g => g.status !== 'Resolved').length}
            </strong>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <span className="text-institutional-400 block">Resolved Cases:</span>
            <strong className="text-xl font-bold text-emerald-400">
              {grievances.filter(g => g.status === 'Resolved').length}
            </strong>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <span className="text-institutional-400 block">SLA Compliance:</span>
            <strong className="text-xl font-bold text-white">96.4%</strong>
          </div>
        </div>

      </div>

      {/* Filter and Queue Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-institutional-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          {[
            { id: 'ALL', label: 'All Dockets' },
            { id: 'Submitted', label: 'New Intake' },
            { id: 'Under Review', label: 'Under Review' },
            { id: 'Hearing Scheduled', label: 'Hearings' },
            { id: 'Action Directed', label: 'Orders Issued' },
            { id: 'Resolved', label: 'Closed' },
            { id: 'OVERDUE', label: 'Overdue SLA' }
          ].map(flt => (
            <button
              key={flt.id}
              onClick={() => setFilterStatus(flt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterStatus === flt.id
                  ? 'bg-crest-navy text-white shadow-sm'
                  : 'bg-institutional-50 hover:bg-institutional-100 text-institutional-700 border border-institutional-200'
              }`}
            >
              {flt.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-institutional-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search docket, student, subject..."
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-institutional-300 text-xs focus:ring-2 focus:ring-crest-navy/20 focus:border-crest-navy"
          />
        </div>

      </div>

      {/* Grievance Queue Table */}
      <div className="bg-white rounded-xl border border-institutional-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-institutional-100/70 border-b border-institutional-200 text-institutional-700 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4">Docket ID</th>
                <th className="py-3.5 px-4">Student & Dept</th>
                <th className="py-3.5 px-4">Subject & Category</th>
                <th className="py-3.5 px-4">Priority & SLA</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Committee Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-institutional-200">
              {filteredGrievances.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-institutional-500 italic">
                    No grievance dockets matching the active filter criteria.
                  </td>
                </tr>
              ) : (
                filteredGrievances.map((g) => {
                  const now = new Date();
                  const deadline = new Date(g.slaDeadline);
                  const isBreached = deadline < now && g.status !== 'Resolved';

                  return (
                    <tr key={g.id} className="hover:bg-institutional-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-crest-navy text-xs block">
                          {g.id}
                        </span>
                        <span className="text-[10px] text-institutional-500 font-mono">
                          PIN: {g.trackingPin}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-bold text-institutional-900">{g.studentName}</p>
                        <p className="text-[11px] text-institutional-500">{g.department}</p>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs">
                        <p className="font-medium text-institutional-900 truncate" title={g.subject}>
                          {g.subject}
                        </p>
                        <span className="inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.2 rounded bg-institutional-100 text-institutional-700 border border-institutional-200">
                          {g.category}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          g.priority.includes('P1') ? 'bg-red-100 text-red-800 border border-red-200' :
                          g.priority.includes('P2') ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          {g.priority}
                        </span>
                        <p className={`text-[10px] mt-0.5 font-medium ${isBreached ? 'text-red-600 font-bold' : 'text-institutional-500'}`}>
                          {isBreached ? 'SLA Breached' : `${g.slaHours}h SLA`}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                          g.status === 'Hearing Scheduled' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                          g.status === 'Action Directed' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' :
                          'bg-institutional-200 text-institutional-800'
                        }`}>
                          {g.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleOpenReview(g)}
                          className="px-3 py-1.5 rounded-lg bg-crest-navy hover:bg-crest-blue text-white font-bold text-xs shadow-sm transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Review Docket
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Review Drawer / Modal */}
      {activeCase && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 border border-institutional-300 shadow-2xl overflow-hidden animate-scaleIn">
            
            {/* Header */}
            <div className="bg-crest-navy text-white p-5 flex items-center justify-between border-b border-crest-gold/40">
              <div className="flex items-center gap-2.5">
                <Shield className="w-5 h-5 text-crest-gold" />
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-white">
                    Standing Committee Case Review: {activeCase.id}
                  </h3>
                  <p className="text-xs text-institutional-300">
                    Jurisdiction: {activeCase.committee.name} • Assigned Officer: {selectedOfficer.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveCase(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto text-xs">
              
              {/* Student Particulars Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-institutional-50 border border-institutional-200">
                <div>
                  <span className="text-institutional-500 block">Petitioner:</span>
                  <strong className="text-institutional-900">{activeCase.studentName}</strong>
                </div>
                <div>
                  <span className="text-institutional-500 block">Roll / ID:</span>
                  <strong className="text-institutional-900 font-mono">{activeCase.rollNumber}</strong>
                </div>
                <div>
                  <span className="text-institutional-500 block">Department:</span>
                  <strong className="text-institutional-900">{activeCase.department}</strong>
                </div>
                <div>
                  <span className="text-institutional-500 block">Priority Level:</span>
                  <strong className="text-red-700">{activeCase.priority}</strong>
                </div>
              </div>

              {/* Statement */}
              <div>
                <h4 className="font-bold text-institutional-800 uppercase tracking-wider mb-1.5">
                  Statement of Grievance
                </h4>
                <div className="p-4 rounded-xl bg-white border border-institutional-200 text-institutional-900 whitespace-pre-line leading-relaxed font-serif">
                  {activeCase.statement}
                </div>
              </div>

              {/* Automated Policy Triage Breakdown */}
              <div className="bg-crest-navy/5 p-4 rounded-xl border border-crest-navy/20">
                <h4 className="font-bold text-crest-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-crest-gold" />
                  Automated Policy Triage & Jurisdictional Analysis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-institutional-500 block">Automated Category:</span>
                    <strong className="text-institutional-900">{activeCase.triageInfo.detectedCategory}</strong>
                  </div>
                  <div>
                    <span className="text-institutional-500 block">Confidence Score:</span>
                    <strong className="text-emerald-700">{activeCase.triageInfo.categoryConfidence}% Deterministic</strong>
                  </div>
                  <div>
                    <span className="text-institutional-500 block">Urgency Weight:</span>
                    <strong className="text-red-700">Factor {activeCase.triageInfo.urgencyScore} / 10</strong>
                  </div>
                </div>
                <p className="mt-2 text-institutional-600 leading-normal border-t border-crest-navy/10 pt-2">
                  {activeCase.triageInfo.automatedRoutingReason}
                </p>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="p-4 rounded-xl bg-institutional-50 border border-institutional-200">
                <h4 className="font-bold text-institutional-800 uppercase tracking-wider mb-3">
                  Interlocutory Committee Actions
                </h4>
                <div className="flex items-center flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange('Under Review', 'Standing Committee initiated evidentiary scrutiny.')}
                    className="px-3.5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors"
                  >
                    Mark 'Under Review'
                  </button>
                  <button
                    onClick={() => handleStatusChange('Hearing Scheduled', 'Statutory hearing summons issued to petitioner and department head.')}
                    className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
                  >
                    Schedule Formal Hearing
                  </button>
                  <button
                    onClick={() => setComposerOpen(!composerOpen)}
                    className="px-3.5 py-2 rounded-lg bg-crest-navy hover:bg-crest-blue text-white font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4 text-crest-gold" />
                    Compose Official Resolution Order
                  </button>
                  <button
                    onClick={() => handleStatusChange('Resolved', 'All remedial orders executed and certified.')}
                    className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors"
                  >
                    Mark Case 'Resolved'
                  </button>
                </div>
              </div>

              {/* Resolution Composer Drawer */}
              {composerOpen && (
                <form onSubmit={handleDispatchOrder} className="p-5 rounded-xl bg-white border-2 border-crest-navy/30 space-y-4 animate-fadeIn">
                  <div className="border-b border-institutional-200 pb-2">
                    <h4 className="text-sm font-bold font-serif text-crest-navy">
                      Formal Redressal Resolution Order Generator
                    </h4>
                    <p className="text-[11px] text-institutional-500">
                      Issue an official, legally enforceable decree signed by {selectedOfficer.name}.
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-institutional-800 mb-1">
                      Statutory Citation / Authority
                    </label>
                    <input
                      type="text"
                      value={orderForm.statutoryCitation}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, statutoryCitation: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-institutional-800 mb-1">
                      Findings of Fact & Committee Scrutiny Summary
                    </label>
                    <textarea
                      rows={3}
                      value={orderForm.findingsSummary}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, findingsSummary: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-bold text-institutional-800">
                      Operative Directives & Remedial Orders:
                    </label>
                    <input
                      type="text"
                      value={orderForm.directive1}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, directive1: e.target.value }))}
                      placeholder="Directive 1..."
                      className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs"
                      required
                    />
                    <input
                      type="text"
                      value={orderForm.directive2}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, directive2: e.target.value }))}
                      placeholder="Directive 2..."
                      className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs"
                    />
                    <input
                      type="text"
                      value={orderForm.directive3}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, directive3: e.target.value }))}
                      placeholder="Directive 3 (Optional)..."
                      className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-institutional-800 mb-1">
                      Mandatory Compliance Deadline
                    </label>
                    <input
                      type="text"
                      value={orderForm.complianceDeadline}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, complianceDeadline: e.target.value }))}
                      placeholder="e.g. Within 24 Hours / By 28-Oct-2026"
                      className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setComposerOpen(false)}
                      className="px-4 py-2 rounded-lg bg-institutional-100 text-institutional-700 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Issue & Enforce Statutory Order
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
