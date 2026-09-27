import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Users, 
  Truck, 
  Droplet, 
  Building2, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  PhoneCall, 
  Sparkles, 
  HeartHandshake, 
  Activity, 
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { AuthModal } from '../components/auth/AuthModal';

export const LandingView: React.FC = () => {
  const { 
    setActiveTab, 
    loginAsDemoPatient, 
    loginAsDemoAdmin, 
    appointments, 
    fleet, 
    facilities 
  } = useApp();
  
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'patient' | 'admin'>('patient');

  const handleOpenAuth = (role: 'patient' | 'admin') => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/60">
        
        {/* Subtle Decorative Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl" />
          <div className="absolute -top-20 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Badge: Pilot Clinic Network */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 shadow-2xs text-xs font-semibold text-sky-800">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-ping" />
              <span>Pilot deployed across 15+ neighborhood clinics in Pune</span>
              <ChevronRight className="w-3.5 h-3.5 text-sky-500" />
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Healthcare coordination,{' '}
              <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                simplified.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              CareSync helps small clinics organize appointments, patients, and emergency coordination from one clean, administrative platform.
            </p>

            <p className="text-xs sm:text-sm font-semibold text-teal-700">
              “One platform for appointments, patients & emergency coordination.”
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  loginAsDemoPatient();
                  setActiveTab('book-appointment');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => setActiveTab('emergency-center')}
                className="w-full sm:w-auto px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 animate-pulse" />
                <span>Emergency Assistance</span>
              </button>

              <button
                onClick={() => handleOpenAuth('admin')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl border border-slate-300 shadow-2xs transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Clinic Login</span>
              </button>
            </div>

            {/* Fast 1-Click Demo Section for Hackathon Reviewers */}
            <div className="pt-6">
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Instant 1-Click Hackathon Demos:</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={loginAsDemoPatient}
                    className="px-3 py-1.5 text-xs font-bold bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-lg border border-sky-200 transition-colors"
                  >
                    👤 Demo Patient (Aarav)
                  </button>
                  <button
                    onClick={loginAsDemoAdmin}
                    className="px-3 py-1.5 text-xs font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors"
                  >
                    🩺 Demo Clinic Admin (City Care)
                  </button>
                </div>
              </div>
            </div>

            {/* Safety Disclaimer Banner */}
            <div className="pt-4 max-w-xl mx-auto">
              <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5 text-left">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Administrative Notice:</strong> CareSync provides administrative and logistics coordination only and does not provide medical diagnosis or treatment advice.
                </span>
              </div>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <p className="text-2xl font-bold text-sky-700">100%</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Admin Coordination</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <p className="text-2xl font-bold text-teal-700">8.4 mins</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Avg Ambulance Dispatch</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <p className="text-2xl font-bold text-emerald-700">5 Pune Hubs</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Blood Banks Network</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs text-center">
              <p className="text-2xl font-bold text-indigo-700">0 Spreadsheets</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Automated Clinic Flow</p>
            </div>
          </div>

        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
              Core Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for community clinics & patients
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Everything needed to run outpatient scheduling and manage urgent care transfers smoothly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Feature 1: Appointment Management */}
            <div 
              onClick={() => {
                loginAsDemoPatient();
                setActiveTab('book-appointment');
              }}
              className="bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg hover:border-sky-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Appointment Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamlined slot booking for primary checkups, vaccination reviews, and preventive visits. Immediate booking ID generation without clinical questionnaires.
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-sky-600 group-hover:text-sky-700 gap-1">
                <span>Book outpatient visit</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 2: Patient Management */}
            <div 
              onClick={() => {
                loginAsDemoAdmin();
                setActiveTab('admin-patients');
              }}
              className="bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Patient Administrative Records
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintain essential contact details, age, emergency contact, and appointment attendance. Keeps administrative records organized without storing sensitive diagnostic records.
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-teal-600 group-hover:text-teal-700 gap-1">
                <span>Explore patient registry</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 3: Ambulance Coordination */}
            <div 
              onClick={() => setActiveTab('emergency-center')}
              className="bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg hover:border-rose-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Ambulance Coordination
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Priority-based ambulance request dispatch (Normal, Urgent, Critical). Direct integration with mock Pune fleet, live status stages, and driver contact coordination.
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-rose-600 group-hover:text-rose-700 gap-1">
                <span>Dispatch ambulance</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 4: Blood Requirement Search */}
            <div 
              onClick={() => setActiveTab('blood-search')}
              className="bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg hover:border-rose-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Blood Requirement Search & Broadcast
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter verified Pune blood banks by ABO/Rh group and city area. Post urgent blood requirements with unit counts and hospital destination coordinates.
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-rose-600 group-hover:text-rose-700 gap-1">
                <span>Search blood units</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 5: Healthcare Facilities */}
            <div 
              onClick={() => setActiveTab('facilities')}
              className="bg-slate-50/80 hover:bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:shadow-lg hover:border-sky-300 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Nearby Healthcare Facilities
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Locate 24/7 trauma centers, day-care clinics, and multi-specialty hospitals with distance calculations, consultation fees in ₹, and contact information.
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-sky-600 group-hover:text-sky-700 gap-1">
                <span>Browse Pune facilities</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 6: Clinic Operations Command */}
            <div 
              onClick={() => {
                loginAsDemoAdmin();
                setActiveTab('admin-dashboard');
              }}
              className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl border border-teal-200 p-6 shadow-2xs hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Clinic Admin Operations Command
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive staff view: today's schedule, pending confirmations, no-show marking, emergency triage, and operational volume analytics.
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-teal-700 group-hover:text-teal-800 gap-1">
                <span>Open admin console</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Emergency Center CTA Strip */}
      <section className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Dedicated Emergency Center</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              Need immediate ambulance or urgent blood donor coordination?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              For life-threatening emergencies, contact local emergency services immediately (108). CareSync assists in logistic coordination and vehicle assignment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('emergency-center')}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Open Emergency Center</span>
            </button>
            <a
              href="tel:108"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-rose-400" />
              <span>Call 108</span>
            </a>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultRole={authRole}
      />
    </div>
  );
};
