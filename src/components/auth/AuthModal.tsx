import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { UserRole } from '../../types';
import { User, Shield, Stethoscope, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: UserRole;
  defaultMode?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'patient',
  defaultMode = 'login',
}) => {
  const { loginUser, registerUser, loginAsDemoPatient, loginAsDemoAdmin } = useApp();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [role, setRole] = useState<UserRole>(defaultRole);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!phone.trim()) {
        setError('Please enter your contact phone number.');
        return;
      }
      registerUser(name, email, phone, role);
      onClose();
    } else {
      const ok = loginUser(email, role);
      if (ok) onClose();
    }
  };

  const handleDemoPatient = () => {
    loginAsDemoPatient();
    onClose();
  };

  const handleDemoAdmin = () => {
    loginAsDemoAdmin();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? 'Sign In to CareSync' : 'Create CareSync Account'}
      subtitle="Clinic appointment booking and emergency coordination platform"
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Quick Demo Login Bar for Evaluators / Hackathon Judges */}
        <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200/80 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>Instant Demo Access (No password required)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleDemoPatient}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-sky-100 text-sky-800 text-xs font-semibold rounded-lg border border-sky-300 shadow-2xs transition-all hover:scale-[1.02]"
            >
              <User className="w-3.5 h-3.5 text-sky-600" />
              <span>Demo Patient</span>
            </button>

            <button
              type="button"
              onClick={handleDemoAdmin}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-teal-100 text-teal-800 text-xs font-semibold rounded-lg border border-teal-300 shadow-2xs transition-all hover:scale-[1.02]"
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              <span>Demo Clinic Admin</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher: Login / Register */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 text-center transition-colors ${
              mode === 'login'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 text-center transition-colors ${
              mode === 'register'
                ? 'border-sky-600 text-sky-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Register
          </button>
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Select Your Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('patient')}
              className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                role === 'patient'
                  ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  role === 'patient' ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Patient / User</p>
                <p className="text-xs text-slate-500">Book visits & emergency help</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all ${
                role === 'admin'
                  ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-200'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  role === 'admin' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Clinic Staff / Admin</p>
                <p className="text-xs text-slate-500">Manage slots & dispatch</p>
              </div>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={role === 'admin' ? 'admin@citycare.in' : 'user@example.com'}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98220 12345"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password {mode === 'login' ? '' : <span className="text-rose-500">*</span>}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'login' ? 'Sign In' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer reminder */}
        <p className="text-[11px] text-center text-slate-500 pt-1">
          By signing in, you agree that CareSync is an administrative tool only and does not provide clinical diagnoses.
        </p>
      </div>
    </Modal>
  );
};
