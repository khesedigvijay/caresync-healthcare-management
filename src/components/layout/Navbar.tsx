import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  HeartHandshake, 
  Bell, 
  PhoneCall, 
  User, 
  Shield, 
  LogOut, 
  LogIn, 
  Menu, 
  X,
  RefreshCw,
  Sparkles,
  Search,
  Activity
} from 'lucide-react';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { AuthModal } from '../auth/AuthModal';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    logout, 
    activeTab, 
    setActiveTab, 
    unreadCount, 
    switchRole,
    resetAllDemoData,
    loginAsDemoPatient,
    loginAsDemoAdmin
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Tagline */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleNavClick(currentUser ? (currentUser.role === 'admin' ? 'admin-dashboard' : 'patient-dashboard') : 'landing')}
                className="flex items-center gap-2.5 text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                  <Activity className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-sky-700 via-slate-800 to-teal-700 bg-clip-text text-transparent">
                      CareSync
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 uppercase tracking-wider">
                      Clinic OS
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                    Appointments & Emergency Coordination
                  </p>
                </div>
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-1">
                {!currentUser ? (
                  <>
                    <button
                      onClick={() => handleNavClick('landing')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        activeTab === 'landing' ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Home
                    </button>
                    <button
                      onClick={() => handleNavClick('emergency-center')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        activeTab === 'emergency-center' ? 'bg-rose-50 text-rose-700 font-bold' : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                      }`}
                    >
                      🚨 Emergency Center
                    </button>
                    <button
                      onClick={() => handleNavClick('blood-search')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        activeTab === 'blood-search' ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Blood Search
                    </button>
                    <button
                      onClick={() => handleNavClick('facilities')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                        activeTab === 'facilities' ? 'bg-sky-50 text-sky-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      Healthcare Facilities
                    </button>
                  </>
                ) : null}
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Evaluator Fast Role-Switcher Pill */}
              {currentUser ? (
                <div className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-500 px-2">
                    Viewing:
                  </span>
                  <button
                    onClick={() => switchRole('patient')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                      currentUser.role === 'patient'
                        ? 'bg-white text-sky-700 shadow-2xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Patient</span>
                  </button>
                  <button
                    onClick={() => switchRole('admin')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                      currentUser.role === 'admin'
                        ? 'bg-white text-teal-700 shadow-2xs border border-slate-200/80'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Clinic Admin</span>
                  </button>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-1.5">
                  <button
                    onClick={loginAsDemoPatient}
                    className="px-2.5 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-50 rounded-lg border border-sky-200 flex items-center gap-1 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-sky-600" />
                    <span>Demo Patient</span>
                  </button>
                  <button
                    onClick={loginAsDemoAdmin}
                    className="px-2.5 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-50 rounded-lg border border-teal-200 flex items-center gap-1 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5 text-teal-600" />
                    <span>Demo Admin</span>
                  </button>
                </div>
              )}

              {/* Emergency Hotline Button */}
              <a
                href="tel:108"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                title="Direct call to National Ambulance Service"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden sm:inline">Ambulance:</span>
                <span>108</span>
              </a>

              {/* Notifications Bell */}
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-sky-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* User Menu / Sign In */}
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
                  >
                    <img
                      src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-sky-500/20"
                    />
                    <div className="hidden md:block text-left text-xs">
                      <p className="font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">
                        {currentUser.role === 'admin' ? 'Clinic Staff' : 'Patient'}
                      </p>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-50 text-xs">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="font-bold text-slate-800">{currentUser.name}</p>
                        <p className="text-slate-500 text-[11px] truncate">{currentUser.email}</p>
                        <div className="mt-1.5 flex items-center gap-1">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            currentUser.role === 'admin' ? 'bg-teal-50 text-teal-700' : 'bg-sky-50 text-sky-700'
                          }`}>
                            {currentUser.role === 'admin' ? 'Clinic Admin' : 'Registered Patient'}
                          </span>
                        </div>
                      </div>

                      {currentUser.role === 'patient' && (
                        <>
                          <button
                            onClick={() => {
                              handleNavClick('patient-profile');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                          >
                            <User className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Patient Profile</span>
                          </button>
                          <button
                            onClick={() => {
                              handleNavClick('my-appointments');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-medium"
                          >
                            <Activity className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Appointments</span>
                          </button>
                        </>
                      )}

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => {
                          switchRole(currentUser.role === 'admin' ? 'patient' : 'admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-50 flex items-center gap-2 font-semibold"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-sky-600" />
                        <span>Switch to {currentUser.role === 'admin' ? 'Patient' : 'Clinic Admin'}</span>
                      </button>

                      <button
                        onClick={() => {
                          resetAllDemoData();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                        <span>Reset Pune Demo Data</span>
                      </button>

                      <div className="border-t border-slate-100 my-1"></div>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Clinic / User Login</span>
                </button>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {!currentUser ? (
              <>
                <button
                  onClick={() => handleNavClick('landing')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('emergency-center')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                >
                  🚨 Emergency Center
                </button>
                <button
                  onClick={() => handleNavClick('blood-search')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Find Blood
                </button>
                <button
                  onClick={() => handleNavClick('facilities')}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Healthcare Facilities
                </button>
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      loginAsDemoPatient();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-sky-50 text-sky-700 text-xs font-bold rounded-lg border border-sky-200"
                  >
                    Login as Demo Patient
                  </button>
                  <button
                    onClick={() => {
                      loginAsDemoAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 bg-teal-50 text-teal-700 text-xs font-bold rounded-lg border border-teal-200"
                  >
                    Login as Demo Admin
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-1 pt-1">
                <div className="px-3 py-2 bg-slate-50 rounded-lg mb-2">
                  <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                </div>
                {currentUser.role === 'patient' ? (
                  <>
                    <button
                      onClick={() => handleNavClick('patient-dashboard')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Patient Dashboard
                    </button>
                    <button
                      onClick={() => handleNavClick('book-appointment')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Book Appointment
                    </button>
                    <button
                      onClick={() => handleNavClick('my-appointments')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                    >
                      My Appointments
                    </button>
                    <button
                      onClick={() => handleNavClick('emergency-center')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Emergency Center
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleNavClick('admin-dashboard')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Admin Dashboard
                    </button>
                    <button
                      onClick={() => handleNavClick('admin-appointments')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Manage Appointments
                    </button>
                    <button
                      onClick={() => handleNavClick('admin-patients')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Patient Records
                    </button>
                    <button
                      onClick={() => handleNavClick('admin-emergency')}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50"
                    >
                      Emergency & Fleet Dispatch
                    </button>
                  </>
                )}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      switchRole(currentUser.role === 'admin' ? 'patient' : 'admin');
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-sky-600 font-bold"
                  >
                    Switch to {currentUser.role === 'admin' ? 'Patient' : 'Admin'}
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-rose-600 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Notifications Drawer */}
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};
