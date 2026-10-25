import React, { useState } from 'react';
import { Star, CheckCircle2, X, Send } from 'lucide-react';

export default function FeedbackModal({ grievance, onClose, onSubmitFeedback }) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  if (!grievance) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitFeedback(grievance.id, rating, feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full border border-institutional-300 shadow-2xl overflow-hidden animate-scaleIn">
        
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="font-serif font-bold text-base">
              Confirm Resolution & Review
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <p className="text-institutional-700 text-sm">
              Please confirm that the remedial directive issued under <strong>{grievance.id}</strong> has been satisfactorily executed.
            </p>
          </div>

          <div>
            <label className="block font-bold text-institutional-800 uppercase tracking-wider mb-2">
              Resolution Satisfaction Rating:
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star 
                    className={`w-7 h-7 ${
                      star <= rating 
                        ? 'fill-crest-gold text-crest-gold' 
                        : 'text-institutional-300'
                    }`} 
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-sm text-institutional-800">
                {rating} of 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block font-bold text-institutional-800 uppercase tracking-wider mb-1">
              Comments / Remarks (Optional):
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Provide comments regarding resolution quality, timeliness, or officer conduct..."
              className="w-full px-3 py-2 rounded-lg border border-institutional-300 text-xs text-institutional-900"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-institutional-100 text-institutional-700 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Close Docket & Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
