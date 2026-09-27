import React from 'react';
import { Activity, PhoneCall, ShieldCheck, Heart, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-slate-600 text-xs">
      {/* Top Banner Disclaimer */}
      <div className="bg-slate-50 border-b border-slate-200/80 py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2 text-slate-700">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-medium text-xs">
              <strong>Mandatory Safety Disclaimer:</strong> CareSync is strictly an administrative and logistics coordination platform for small clinics. It does NOT provide medical diagnosis, treatment plans, prescriptions, medical advice, or clinical evaluations.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-semibold text-slate-500 text-[11px]">Emergency Numbers:</span>
            <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold text-xs">Ambulance: 108</span>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-bold text-xs">National SOS: 112</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-teal-400 flex items-center justify-center text-white shadow-xs">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-slate-900">CareSync</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              One unified platform for appointment scheduling, patient administrative records, ambulance dispatch, and blood coordination across neighborhood clinics in Pune, Maharashtra.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-teal-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliant with Indian Healthcare Admin Guidelines</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Emergency Services
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <button onClick={() => setActiveTab('emergency-center')} className="hover:text-sky-600 transition-colors">
                  Ambulance Dispatch
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('blood-search')} className="hover:text-sky-600 transition-colors">
                  Pune Blood Bank Directory
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('facilities')} className="hover:text-sky-600 transition-colors">
                  Trauma & Emergency Centers
                </button>
              </li>
              <li>
                <a href="tel:108" className="text-rose-600 font-bold hover:underline">
                  Dial 108 (Govt Ambulance)
                </a>
              </li>
            </ul>
          </div>

          {/* Clinic Operations */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Clinic Coordination
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <button onClick={() => setActiveTab('book-appointment')} className="hover:text-sky-600 transition-colors">
                  Book Outpatient Slot
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin-dashboard')} className="hover:text-sky-600 transition-colors">
                  Clinic Admin Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('facilities')} className="hover:text-sky-600 transition-colors">
                  Partner Clinics Network
                </button>
              </li>
            </ul>
          </div>

          {/* Pune Demo Facilities */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pune Coverage
            </h4>
            <p className="text-xs text-slate-500">
              Active pilot coverage across Shivajinagar, Kothrud, Deccan Gymkhana, Baner, Viman Nagar, Swargate & Hadapsar.
            </p>
            <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-100 text-sky-800 text-[11px]">
              <strong>Hackathon MVP Note:</strong> Preloaded with realistic Pune healthcare data and ₹ currency rates.
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} CareSync Technologies. Designed for small community clinics.</p>
          <div className="flex items-center gap-4">
            <span>Administrative Platform</span>
            <span>•</span>
            <span>Pune, Maharashtra</span>
            <span>•</span>
            <span className="text-slate-600 font-medium">Presentation Ready MVP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
