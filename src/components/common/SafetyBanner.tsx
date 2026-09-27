import React, { useState } from 'react';
import { AlertTriangle, PhoneCall, X } from 'lucide-react';

export const SafetyBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  if (compact) {
    return (
      <div className="bg-amber-50 border-y border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Administrative & Coordination Platform Only:</strong> CareSync does not provide medical diagnosis, treatment recommendations, or prescriptions. For urgent life threats, dial <strong>108</strong>.
          </span>
        </div>
        <button 
          onClick={() => setDismissed(true)} 
          className="text-amber-700 hover:text-amber-900 p-0.5 rounded ml-2"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-amber-200/80 px-4 py-2.5 text-xs sm:text-sm text-amber-950 shadow-xs relative">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-md bg-amber-200/60 text-amber-800 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-amber-900">Coordination & Administrative Platform:</span>{' '}
            <span className="text-amber-800">
              CareSync does not provide clinical diagnosis, prescriptions, or medical advice.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          <a
            href="tel:108"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors"
          >
            <PhoneCall className="w-3 h-3 animate-pulse" />
            <span>Emergency 108</span>
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-700 hover:text-amber-950 p-1 rounded-md hover:bg-amber-200/40 transition-colors"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
