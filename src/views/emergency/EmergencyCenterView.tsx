import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  ShieldAlert, 
  Truck, 
  Droplet, 
  Building2, 
  PhoneCall, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  MapPin, 
  Activity,
  HeartHandshake
} from 'lucide-react';

export const EmergencyCenterView: React.FC = () => {
  const { 
    setActiveTab, 
    ambulanceRequests, 
    bloodRequests, 
    currentPatientProfile 
  } = useApp();

  const userAmbulance = ambulanceRequests.filter(a => a.patientId === currentPatientProfile?.id);
  const activeAmbulance = userAmbulance.find(a => a.status !== 'Completed' && a.status !== 'Cancelled');

  const userBlood = bloodRequests.filter(b => b.patientId === currentPatientProfile?.id);
  const activeBlood = userBlood.find(b => b.status !== 'Fulfilled' && b.status !== 'Closed');

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Prominent Emergency Warning Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-700 to-amber-700 text-white shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-white/20 rounded-xl shrink-0 mt-0.5 backdrop-blur-xs">
              <ShieldAlert className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-white">
                Life-Threatening Emergency Notice
              </span>
              <h2 className="text-lg sm:text-xl font-bold mt-1 tracking-tight">
                For life-threatening medical emergencies, contact government emergency services immediately.
              </h2>
              <p className="text-xs sm:text-sm text-rose-100 mt-1">
                CareSync provides administrative transfer and donor logistics only. Call the toll-free numbers below for instant response:
              </p>
            </div>
          </div>

          {/* Quick Dial Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
            <a
              href="tel:108"
              className="px-4 py-2.5 bg-white text-rose-700 hover:bg-rose-50 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4 animate-pulse" />
              <span>Ambulance: 108</span>
            </a>
            <a
              href="tel:112"
              className="px-3.5 py-2.5 bg-rose-900/80 hover:bg-rose-900 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>SOS: 112</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Main Prominent Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Option 1: Request Ambulance */}
        <div
          onClick={() => setActiveTab('ambulance')}
          className="bg-white rounded-2xl border-2 border-slate-200 hover:border-rose-400 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
              <Truck className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">
                Request Ambulance
              </h3>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Pune Fleet
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Immediate pickup coordination, hospital destination allocation, and live driver assignment across Pune.
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Priority tiers: Normal, Urgent, Critical</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Basic (BLS) & Advanced (ALS) support</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span>Assigned driver & ETA tracking</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:text-rose-700">
            <span>Dispatch Ambulance</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Option 2: Find Blood */}
        <div
          onClick={() => setActiveTab('blood')}
          className="bg-white rounded-2xl border-2 border-slate-200 hover:border-red-400 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
              <Droplet className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">
                Find Blood & Donors
              </h3>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                All Groups
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Search verified Pune blood banks by blood group or broadcast urgent requirements to affiliated hospitals.
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Poona Serological, Sassoon, Ruby Hall</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Unit requirement broadcast with ID</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Verified emergency donor helplines</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600 group-hover:text-red-700">
            <span>Search Blood Inventory</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Option 3: Find Healthcare Facility */}
        <div
          onClick={() => setActiveTab('facilities')}
          className="bg-white rounded-2xl border-2 border-slate-200 hover:border-sky-400 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-xs">
              <Building2 className="w-8 h-8" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-slate-900">
                Healthcare Facilities
              </h3>
              <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                24/7 Trauma
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Locate nearby 24-hour trauma hospitals, ICUs, and partner community clinics with real-time distance and bed stats.
            </p>

            <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Deccan, Kothrud, Shivajinagar & Baner</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Emergency casualty vs regular clinics</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>Consultation fee estimates in ₹</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600 group-hover:text-sky-700">
            <span>Explore Facilities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Active Requests Tracker Widget */}
      {(activeAmbulance || activeBlood) && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-rose-600" />
            <span>Active Emergency Dispatches in Progress</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAmbulance && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700">{activeAmbulance.id}</span>
                    <StatusBadge status={activeAmbulance.status} size="sm" />
                  </div>
                  <span className="text-[11px] text-slate-400">Ambulance</span>
                </div>
                <p className="text-xs text-slate-700">
                  To: <strong>{activeAmbulance.destinationHospital}</strong>
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                  <span className="text-slate-500">Driver: {activeAmbulance.driverName || 'Assigning...'}</span>
                  <button
                    onClick={() => setActiveTab('ambulance')}
                    className="text-sky-600 font-bold hover:underline"
                  >
                    View Status →
                  </button>
                </div>
              </div>
            )}

            {activeBlood && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700">{activeBlood.id}</span>
                    <StatusBadge status={activeBlood.status} size="sm" />
                  </div>
                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                    {activeBlood.bloodGroup} • {activeBlood.units} Units
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  Hospital: <strong>{activeBlood.hospital}</strong> ({activeBlood.location})
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                  <span className="text-slate-500">Urgency: {activeBlood.urgency}</span>
                  <button
                    onClick={() => setActiveTab('blood')}
                    className="text-sky-600 font-bold hover:underline"
                  >
                    View Status →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Emergency Protocol Guide */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Emergency Coordination Protocol (Pune District)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="space-y-1">
            <p className="font-bold text-slate-800">1. Verification</p>
            <p className="text-slate-500">CareSync logs your pickup point and notifies the nearest standby driver immediately.</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-800">2. Route & Casualty Contact</p>
            <p className="text-slate-500">The destination hospital casualty department is alerted of your estimated time of arrival.</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold text-slate-800">3. Continuous Assistance</p>
            <p className="text-slate-500">Driver contact and vehicle plate details are displayed directly on your screen.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
