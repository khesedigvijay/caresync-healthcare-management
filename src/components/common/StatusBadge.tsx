import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  XCircle, 
  Truck, 
  Search, 
  Activity,
  ShieldCheck,
  Ban
} from 'lucide-react';
import { AppointmentStatus, AmbulanceStatus, BloodRequestStatus, EmergencyPriority } from '../../types';

interface StatusBadgeProps {
  status: AppointmentStatus | AmbulanceStatus | BloodRequestStatus | EmergencyPriority | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = 'md',
  showIcon = true 
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2',
  }[size];

  // Appointment Statuses
  if (status === 'Confirmed') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-teal-50 text-teal-700 border border-teal-200 ${sizeClasses}`}>
        {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />}
        Confirmed
      </span>
    );
  }
  if (status === 'Scheduled') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-sky-50 text-sky-700 border border-sky-200 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-sky-600" />}
        Scheduled
      </span>
    );
  }
  if (status === 'Completed') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 ${sizeClasses}`}>
        {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
        Completed
      </span>
    );
  }
  if (status === 'Cancelled') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses}`}>
        {showIcon && <XCircle className="w-3.5 h-3.5 text-slate-500" />}
        Cancelled
      </span>
    );
  }
  if (status === 'No-show') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses}`}>
        {showIcon && <Ban className="w-3.5 h-3.5 text-amber-600" />}
        No-show
      </span>
    );
  }

  // Ambulance Statuses
  if (status === 'Requested') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-blue-600" />}
        Requested
      </span>
    );
  }
  if (status === 'Searching') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-300 animate-pulse ${sizeClasses}`}>
        {showIcon && <Search className="w-3.5 h-3.5 text-amber-600" />}
        Searching Unit
      </span>
    );
  }
  if (status === 'Ambulance Assigned') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-sky-50 text-sky-700 border border-sky-300 ${sizeClasses}`}>
        {showIcon && <Truck className="w-3.5 h-3.5 text-sky-600" />}
        Ambulance Assigned
      </span>
    );
  }
  if (status === 'On the Way') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-300 ring-2 ring-indigo-200/50 ${sizeClasses}`}>
        {showIcon && <Truck className="w-3.5 h-3.5 text-indigo-600 animate-bounce" />}
        On The Way
      </span>
    );
  }

  // Blood Request Statuses
  if (status === 'Submitted') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-300 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-slate-500" />}
        Submitted
      </span>
    );
  }
  if (status === 'Matched') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 ${sizeClasses}`}>
        {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
        Donor/Bank Matched
      </span>
    );
  }
  if (status === 'Fulfilled') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-green-50 text-green-700 border border-green-300 ${sizeClasses}`}>
        {showIcon && <ShieldCheck className="w-3.5 h-3.5 text-green-600" />}
        Fulfilled
      </span>
    );
  }
  if (status === 'Closed') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-600 border border-slate-200 ${sizeClasses}`}>
        {showIcon && <XCircle className="w-3.5 h-3.5 text-slate-400" />}
        Closed
      </span>
    );
  }

  // Priorities
  if (status === 'Critical') {
    return (
      <span className={`inline-flex items-center font-semibold rounded-full bg-rose-100 text-rose-800 border border-rose-300 animate-pulse ${sizeClasses}`}>
        {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
        Critical Priority
      </span>
    );
  }
  if (status === 'Urgent') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-amber-100 text-amber-800 border border-amber-300 ${sizeClasses}`}>
        {showIcon && <Activity className="w-3.5 h-3.5 text-amber-600" />}
        Urgent
      </span>
    );
  }
  if (status === 'Normal') {
    return (
      <span className={`inline-flex items-center font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses}`}>
        {showIcon && <Clock className="w-3.5 h-3.5 text-blue-500" />}
        Normal
      </span>
    );
  }

  // Generic fallback
  return (
    <span className={`inline-flex items-center font-medium rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses}`}>
      {status}
    </span>
  );
};
