import React, { useState } from 'react';
import { Scale, X, AlertCircle, Send, FileText, Upload, Shield } from 'lucide-react';

export default function AppealModal({ grievance, onClose, onSubmitAppeal }) {
  const [appealGrounds, setAppealGrounds] = useState('Substantive Procedural Irregularity');
  const [statement, setStatement] = useState('');
  const [additionalEvidence, setAdditionalEvidence] = useState(false);
  const [error, setError] = useState('');

  if (!grievance) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!statement.trim() || statement.length < 20) {
      setError('Please provide a substantive justification for the statutory appeal (at least 20 characters).');
      return;
    }

    const fullReason = `[Grounds: ${appealGrounds}] ${statement}`;
    onSubmitAppeal(grievance.id, fullReason, additionalEvidence);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full my-8 border border-institutional-300 shadow-2xl overflow-hidden animate-scaleIn">
        
        {/* Header */}
        <div className="bg-crest-deep text-white p-5 flex items-center justify-between border-b border-crest-gold/40">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-crest-gold" />
            <div>
              <h3 className="text-base font-bold font-serif text-white">
                Statutory First Appeal to University Ombudsperson
              </h3>
              <p className="text-xs text-institutional-300">
                In re Docket: {grievance.id} • Pursuant to UGC Regulations, 2023
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-amber-900 leading-relaxed">
            <p className="font-bold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-700" />
              Appellate Jurisdiction Notice:
            </p>
            <p className="text-[11px] mt-0.5">
              An appeal lies before the Independent Ombudsperson if you are aggrieved by an order of the Standing Committee or if your petition remained unaddressed past the statutory SLA.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block font-bold text-institutional-800 uppercase tracking-wider mb-1">
              Primary Statutory Grounds for Appeal
            </label>
            <select
              value={appealGrounds}
              onChange={(e) => setAppealGrounds(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs bg-white text-institutional-900"
            >
              <option value="Substantive Procedural Irregularity">Substantive Procedural Irregularity</option>
              <option value="Incomplete Evidentiary Assessment">Incomplete Evidentiary Assessment</option>
              <option value="Disproportionate / Deficient Remedial Order">Disproportionate / Deficient Remedial Order</option>
              <option value="SLA Threshold Breach Unremedied">SLA Threshold Breach Unremedied</option>
              <option value="New Material Evidence Discovered">New Material Evidence Discovered</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-institutional-800 uppercase tracking-wider mb-1">
              Appellate Submission & Justification <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={statement}
              onChange={(e) => {
                setStatement(e.target.value);
                setError('');
              }}
              placeholder="State why the committee order is deficient and what specific relief is requested from the Ombudsperson..."
              className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs text-institutional-900"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-lg bg-institutional-50 border border-institutional-200">
              <input
                type="checkbox"
                checked={additionalEvidence}
                onChange={(e) => setAdditionalEvidence(e.target.checked)}
                className="w-4 h-4 text-crest-navy rounded"
              />
              <span className="text-institutional-800 font-medium">
                I am attaching additional corroborating documentary evidence for the Ombudsperson Bench.
              </span>
            </label>
          </div>

          <div className="pt-3 border-t border-institutional-200 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-institutional-100 text-institutional-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-crest-maroon hover:bg-red-800 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Lodge Formal Appeal
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
