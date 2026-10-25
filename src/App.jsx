import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import GrievanceForm from './components/GrievanceForm';
import GrievanceTracker from './components/GrievanceTracker';
import ResolutionDocument from './components/ResolutionDocument';
import OfficerWorkbench from './components/OfficerWorkbench';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PolicyDirectory from './components/PolicyDirectory';
import AppealModal from './components/AppealModal';
import FeedbackModal from './components/FeedbackModal';
import Footer from './components/Footer';

import { 
  getStoredGrievances, 
  createNewGrievance, 
  updateGrievanceStatus, 
  issueResolutionOrder, 
  lodgeAppealToOmbudsperson, 
  closeGrievanceWithFeedback, 
  resetToDefaults 
} from './services/storageService';

import { ShieldCheck, CheckCircle2, Clock, Scale, BookOpen, AlertCircle } from 'lucide-react';

export default function App() {
  const [grievances, setGrievances] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDocketId, setSelectedDocketId] = useState(null);

  // Modals
  const [viewingOrderGrievance, setViewingOrderGrievance] = useState(null);
  const [appealGrievance, setAppealGrievance] = useState(null);
  const [feedbackGrievance, setFeedbackGrievance] = useState(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const list = getStoredGrievances();
    setGrievances(list);
    if (list.length > 0 && !selectedDocketId) {
      setSelectedDocketId(list[0].id);
    }
  }, []);

  const showToast = (title, message, type = 'success') => {
    setToastMessage({ title, message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSearchDocket = (id) => {
    setSelectedDocketId(id);
    setActiveTab('track');
  };

  const handleCreateGrievance = (formData) => {
    const newDoc = createNewGrievance(formData);
    setGrievances(getStoredGrievances());
    setSelectedDocketId(newDoc.id);
    showToast(
      'Statutory Docket Registered',
      `Docket ${newDoc.id} generated with Priority ${newDoc.priority}. Routed to ${newDoc.committee.name}.`
    );
    return newDoc;
  };

  const handleUpdateStatus = (docketId, newStatus, officerName, note) => {
    updateGrievanceStatus(docketId, newStatus, officerName, note);
    setGrievances(getStoredGrievances());
    showToast(
      'Case Status Updated',
      `Docket ${docketId} transitioned to '${newStatus}'.`
    );
  };

  const handleIssueOrder = (docketId, orderDetails) => {
    issueResolutionOrder(docketId, orderDetails);
    setGrievances(getStoredGrievances());
    showToast(
      'Formal Resolution Order Enacted',
      `Decree issued by ${orderDetails.authorityName}. Directives enforced.`
    );
  };

  const handleSubmitAppeal = (docketId, reason, additionalEvidence) => {
    lodgeAppealToOmbudsperson(docketId, reason, additionalEvidence);
    setGrievances(getStoredGrievances());
    showToast(
      'Statutory First Appeal Registered',
      `Docket ${docketId} elevated to the University Ombudsperson Bench.`,
      'urgent'
    );
  };

  const handleSubmitFeedback = (docketId, rating, feedback) => {
    closeGrievanceWithFeedback(docketId, rating, feedback);
    setGrievances(getStoredGrievances());
    showToast(
      'Grievance Closed Successfully',
      `Docket ${docketId} marked as resolved. Rating: ${rating}/5 Stars.`
    );
  };

  const handleResetData = () => {
    if (window.confirm('Restore official sample university grievances database? This will refresh all demonstration dockets.')) {
      const fresh = resetToDefaults();
      setGrievances(fresh);
      setSelectedDocketId(fresh[0].id);
      showToast('Database Restored', 'Institutional demonstration seeds successfully reloaded.');
    }
  };

  const pendingActionCount = grievances.filter(g => g.status !== 'Resolved').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-institutional-900 font-sans selection:bg-crest-gold/20">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-md w-full bg-crest-navy text-white p-4 rounded-xl shadow-2xl border border-crest-gold/50 flex items-start gap-3 animate-slideIn">
          <div className="p-1 rounded-lg bg-crest-gold/20 text-crest-goldLight shrink-0 mt-0.5">
            <CheckCircle2 className="w-5 h-5 text-crest-gold" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold font-serif text-white uppercase tracking-wider">
              {toastMessage.title}
            </h4>
            <p className="text-xs text-institutional-200 mt-0.5 leading-relaxed">
              {toastMessage.message}
            </p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-institutional-400 hover:text-white text-xs px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingCount={pendingActionCount}
      />

      {/* Tab View Routing */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div>
            <HeroBanner 
              onSearchDocket={handleSearchDocket} 
              onNavigate={(tab) => setActiveTab(tab)}
              grievances={grievances}
            />

            {/* Quick Grievance Inspection Strip */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-crest-navy">
                    Active Grievance Redressal Pipeline
                  </h2>
                  <p className="text-xs text-institutional-600 mt-0.5">
                    Live dockets actively under investigation or statutory enforcement.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('track')}
                  className="text-xs font-bold text-crest-navy hover:underline flex items-center gap-1"
                >
                  View Full Docket Registry →
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {grievances.slice(0, 3).map((g) => (
                  <div
                    key={g.id}
                    onClick={() => {
                      setSelectedDocketId(g.id);
                      setActiveTab('track');
                    }}
                    className="bg-white p-5 rounded-xl border border-institutional-200 shadow-sm hover:shadow-elevated hover:border-crest-gold/40 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-crest-navy bg-institutional-100 px-2 py-0.5 rounded border border-institutional-200">
                        {g.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                        g.status === 'Hearing Scheduled' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {g.status}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-sm text-institutional-900 group-hover:text-crest-navy transition-colors line-clamp-2 leading-snug">
                      {g.subject}
                    </h3>

                    <p className="text-xs text-institutional-500 mt-2 font-medium">
                      {g.category}
                    </p>

                    <div className="mt-4 pt-3 border-t border-institutional-100 flex items-center justify-between text-[11px]">
                      <span className="text-institutional-500">Applicant: <strong>{g.studentName.split(' ')[0]}</strong></span>
                      <span className="font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                        {g.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Three Institutional Pillars */}
              <div className="mt-14 pt-10 border-t border-institutional-200 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-crest-navy/5 text-crest-navy flex items-center justify-center shrink-0 border border-crest-navy/15">
                    <Scale className="w-6 h-6 text-crest-navy" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-crest-navy">
                      Autonomous Standing Committees
                    </h4>
                    <p className="text-xs text-institutional-600 mt-1 leading-relaxed">
                      Statutory committees presided by University Deans and Controllers ensure that no administrative conflict hinders objective student justice.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-crest-navy/5 text-crest-navy flex items-center justify-center shrink-0 border border-crest-navy/15">
                    <Clock className="w-6 h-6 text-crest-goldDark" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-crest-navy">
                      Automated Turnaround SLA Watchdog
                    </h4>
                    <p className="text-xs text-institutional-600 mt-1 leading-relaxed">
                      Rigorous countdown clocks enforce 24-hour response on critical safety issues and 48-hour delivery on examination admit cards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-crest-navy/5 text-crest-navy flex items-center justify-center shrink-0 border border-crest-navy/15">
                    <ShieldCheck className="w-6 h-6 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-crest-navy">
                      Statutory Order Certification
                    </h4>
                    <p className="text-xs text-institutional-600 mt-1 leading-relaxed">
                      Official resolution orders carry university seal stamps, authorized digital signatures, and direct mandates for immediate department execution.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'submit' && (
          <GrievanceForm 
            onSubmitGrievance={handleCreateGrievance}
            onTrackGrievance={(id) => {
              setSelectedDocketId(id);
              setActiveTab('track');
            }}
          />
        )}

        {activeTab === 'track' && (
          <GrievanceTracker 
            grievances={grievances}
            selectedDocketId={selectedDocketId}
            onViewOrder={(g) => setViewingOrderGrievance(g)}
            onOpenFeedback={(g) => setFeedbackGrievance(g)}
            onOpenAppeal={(g) => setAppealGrievance(g)}
          />
        )}

        {activeTab === 'policies' && (
          <PolicyDirectory />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard grievances={grievances} />
        )}

        {activeTab === 'workbench' && (
          <OfficerWorkbench 
            grievances={grievances}
            onUpdateStatus={handleUpdateStatus}
            onIssueOrder={handleIssueOrder}
            onViewDocket={(id) => {
              setSelectedDocketId(id);
              setActiveTab('track');
            }}
          />
        )}
      </main>

      {/* Official Resolution Document Print/View Modal */}
      {viewingOrderGrievance && (
        <ResolutionDocument 
          grievance={viewingOrderGrievance} 
          onClose={() => setViewingOrderGrievance(null)} 
        />
      )}

      {/* Statutory Appeal Modal */}
      {appealGrievance && (
        <AppealModal 
          grievance={appealGrievance} 
          onClose={() => setAppealGrievance(null)}
          onSubmitAppeal={handleSubmitAppeal}
        />
      )}

      {/* Student Feedback & Closure Modal */}
      {feedbackGrievance && (
        <FeedbackModal 
          grievance={feedbackGrievance}
          onClose={() => setFeedbackGrievance(null)}
          onSubmitFeedback={handleSubmitFeedback}
        />
      )}

      {/* Institutional Footer */}
      <Footer onResetData={handleResetData} />

    </div>
  );
}
