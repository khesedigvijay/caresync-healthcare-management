import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';
import { SafetyBanner } from './components/common/SafetyBanner';

// Views
import { LandingView } from './views/LandingView';
import { PatientDashboard } from './views/patient/PatientDashboard';
import { PatientProfile } from './views/patient/PatientProfile';
import { BookAppointmentView } from './views/appointments/BookAppointmentView';
import { MyAppointmentsView } from './views/patient/MyAppointmentsView';
import { EmergencyCenterView } from './views/emergency/EmergencyCenterView';
import { AmbulanceRequestView } from './views/emergency/AmbulanceRequestView';
import { BloodManagementView } from './views/emergency/BloodManagementView';
import { HealthcareFacilitiesView } from './views/facilities/HealthcareFacilitiesView';
import { AdminDashboard } from './views/admin/AdminDashboard';
import { AdminAppointmentsView } from './views/admin/AdminAppointmentsView';
import { AdminPatientsView } from './views/admin/AdminPatientsView';
import { AdminEmergencyView } from './views/admin/AdminEmergencyView';
import { AdminAnalyticsView } from './views/admin/AdminAnalyticsView';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, activeTab, toastMessage, clearToast } = useApp();

  const renderView = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingView />;
      case 'patient-dashboard':
        return <PatientDashboard />;
      case 'patient-profile':
        return <PatientProfile />;
      case 'book-appointment':
        return <BookAppointmentView />;
      case 'my-appointments':
        return <MyAppointmentsView />;
      case 'emergency-center':
        return <EmergencyCenterView />;
      case 'ambulance':
        return <AmbulanceRequestView />;
      case 'blood':
      case 'blood-search':
        return <BloodManagementView />;
      case 'facilities':
        return <HealthcareFacilitiesView />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-appointments':
        return <AdminAppointmentsView />;
      case 'admin-patients':
        return <AdminPatientsView />;
      case 'admin-emergency':
        return <AdminEmergencyView />;
      case 'admin-analytics':
        return <AdminAnalyticsView />;
      default:
        return currentUser ? (
          currentUser.role === 'admin' ? <AdminDashboard /> : <PatientDashboard />
        ) : (
          <LandingView />
        );
    }
  };

  const isLanding = activeTab === 'landing' && !currentUser;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-teal-500 selection:text-white">
      {/* Top Universal Safety Banner */}
      <SafetyBanner />

      {/* Header Navbar */}
      <Navbar />

      {/* App Body */}
      {isLanding ? (
        <main className="flex-1">
          {renderView()}
        </main>
      ) : (
        <div className="flex-1 flex max-w-7xl w-full mx-auto pb-16 lg:pb-0">
          {/* Desktop Sidebar (Only when logged in) */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
            {renderView()}
          </main>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Footer */}
      <Footer />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-18 lg:bottom-6 right-4 sm:right-6 z-50 max-w-md animate-in slide-in-from-bottom-3 duration-200">
          <div className={`p-4 rounded-xl shadow-xl border flex items-center justify-between gap-3 text-xs font-semibold ${
            toastMessage.type === 'success'
              ? 'bg-slate-900 text-white border-slate-800'
              : toastMessage.type === 'error'
              ? 'bg-rose-900 text-white border-rose-800'
              : toastMessage.type === 'warning'
              ? 'bg-amber-900 text-white border-amber-800'
              : 'bg-sky-900 text-white border-sky-800'
          }`}>
            <div className="flex items-center gap-2">
              {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              {toastMessage.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
              {toastMessage.type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
              <span>{toastMessage.text}</span>
            </div>
            <button
              onClick={clearToast}
              className="text-white/60 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
