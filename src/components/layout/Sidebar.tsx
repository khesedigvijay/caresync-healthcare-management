import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  CalendarCheck, 
  Truck, 
  Droplet, 
  Building2, 
  UserCheck, 
  ShieldAlert, 
  BarChart3, 
  Users, 
  Sparkles,
  PhoneCall
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentUser, activeTab, setActiveTab } = useApp();

  if (!currentUser) return null;

  const isPatient = currentUser.role === 'patient';

  const patientNavItems = [
    { id: 'patient-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'book-appointment', label: 'Book Appointment', icon: CalendarPlus, highlight: true },
    { id: 'my-appointments', label: 'My Appointments', icon: CalendarCheck },
    { id: 'emergency-center', label: 'Emergency Center', icon: ShieldAlert, badge: '24/7', color: 'text-rose-600' },
    { id: 'ambulance', label: 'Request Ambulance', icon: Truck },
    { id: 'blood', label: 'Blood Requirement', icon: Droplet },
    { id: 'facilities', label: 'Nearby Facilities', icon: Building2 },
    { id: 'patient-profile', label: 'Patient Profile', icon: UserCheck },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Clinic Overview', icon: LayoutDashboard },
    { id: 'admin-appointments', label: 'Manage Appointments', icon: CalendarCheck },
    { id: 'admin-patients', label: 'Patient Directory', icon: Users },
    { id: 'admin-emergency', label: 'Emergency Operations', icon: ShieldAlert, badge: 'Live', color: 'text-rose-600' },
    { id: 'admin-analytics', label: 'Analytics & Insights', icon: BarChart3 },
    { id: 'facilities', label: 'Healthcare Network', icon: Building2 },
  ];

  const navItems = isPatient ? patientNavItems : adminNavItems;

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between py-6 px-4 shrink-0 shadow-2xs">
      <div className="space-y-6">
        
        {/* Active Clinic / Profile Summary Card */}
        <div className={`p-3.5 rounded-xl border ${
          isPatient ? 'bg-sky-50/70 border-sky-200' : 'bg-teal-50/70 border-teal-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white shadow-xs ${
              isPatient ? 'bg-sky-600' : 'bg-teal-600'
            }`}>
              {isPatient ? 'PT' : 'CL'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">
                {isPatient ? currentUser.name : currentUser.clinicName || 'City Care Clinic'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {isPatient ? 'Patient Portal • Pune' : 'Clinic Staff / Admin'}
              </p>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            {isPatient ? 'Patient Services' : 'Clinic Administration'}
          </p>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? isPatient
                        ? 'bg-sky-600 text-white shadow-xs shadow-sky-500/20'
                        : 'bg-teal-600 text-white shadow-xs shadow-teal-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.color || 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badge === 'Live' ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Emergency Hotline Quick Box */}
      <div className="pt-6 border-t border-slate-100 space-y-3">
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200/80">
          <div className="flex items-center gap-2 text-rose-800 text-xs font-bold mb-1">
            <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Emergency Coordination</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug">
            Dial <strong>108</strong> for government ambulance or <strong>112</strong> for national SOS.
          </p>
          <a
            href="tel:108"
            className="mt-2.5 block text-center py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors shadow-2xs"
          >
            Call Ambulance (108)
          </a>
        </div>

        <p className="text-[10px] text-center text-slate-400 leading-tight">
          CareSync v1.0 • Administrative Coordination
        </p>
      </div>
    </aside>
  );
};
