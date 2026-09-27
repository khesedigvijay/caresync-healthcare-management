import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  CalendarPlus, 
  CalendarCheck, 
  ShieldAlert, 
  User, 
  Users, 
  BarChart3 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { currentUser, activeTab, setActiveTab } = useApp();

  if (!currentUser) return null;

  const isPatient = currentUser.role === 'patient';

  const patientTabs = [
    { id: 'patient-dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'book-appointment', label: 'Book', icon: CalendarPlus },
    { id: 'emergency-center', label: 'Emergency', icon: ShieldAlert, highlight: true },
    { id: 'my-appointments', label: 'Visits', icon: CalendarCheck },
    { id: 'patient-profile', label: 'Profile', icon: User },
  ];

  const adminTabs = [
    { id: 'admin-dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'admin-appointments', label: 'Bookings', icon: CalendarCheck },
    { id: 'admin-emergency', label: 'Emergency', icon: ShieldAlert, highlight: true },
    { id: 'admin-patients', label: 'Patients', icon: Users },
    { id: 'admin-analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const tabs = isPatient ? patientTabs : adminTabs;

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 z-40 py-1.5 px-2 flex items-center justify-around shadow-lg">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-all ${
              isActive
                ? tab.highlight 
                  ? 'text-rose-600 font-bold scale-105' 
                  : isPatient ? 'text-sky-600 font-bold' : 'text-teal-600 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className={`p-1 rounded-full ${
              tab.highlight && isActive ? 'bg-rose-100 text-rose-600' : ''
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
