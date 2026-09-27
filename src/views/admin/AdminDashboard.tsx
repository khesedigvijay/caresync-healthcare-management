import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AppointmentStatus, Appointment } from '../../types';
import { 
  Calendar, 
  Clock, 
  Users, 
  ShieldAlert, 
  Truck, 
  Droplet, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  ArrowRight, 
  Search, 
  Filter, 
  TrendingUp, 
  Building2,
  Stethoscope,
  Activity
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    appointments, 
    patients, 
    ambulanceRequests, 
    bloodRequests, 
    updateAppointmentStatus, 
    setActiveTab 
  } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  // Stats calculation
  const todayAppointments = appointments.filter(a => a.date === todayStr);
  const pendingAppointments = appointments.filter(a => a.status === 'Scheduled');
  const activeAmbulanceRequests = ambulanceRequests.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled');
  const activeBloodRequests = bloodRequests.filter(b => b.status !== 'Fulfilled' && b.status !== 'Closed');

  const [scheduleFilter, setScheduleFilter] = useState<'All' | 'Today' | 'Pending'>('Today');

  const displayedAppointments = appointments.filter(apt => {
    if (scheduleFilter === 'Today') return apt.date === todayStr;
    if (scheduleFilter === 'Pending') return apt.status === 'Scheduled';
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner: Clinic Operations Greeting */}
      <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 text-xs font-semibold backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Clinic Administration Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentUser?.clinicName || 'City Care Clinic'} Overview
          </h1>
          <p className="text-xs sm:text-sm text-teal-100">
            Real-time outpatient visit control, walk-in scheduling, and Pune emergency dispatch feed.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center">
          <button
            onClick={() => setActiveTab('admin-emergency')}
            className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 animate-pulse" />
            <span>Emergency Operations</span>
          </button>
          <button
            onClick={() => setActiveTab('admin-appointments')}
            className="px-4 py-2.5 bg-white text-teal-900 hover:bg-teal-50 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>All Bookings</span>
          </button>
        </div>
      </div>

      {/* 6 Key Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <StatCard
          title="Today's Visits"
          value={todayAppointments.length}
          subtitle="Scheduled for today"
          icon={Calendar}
          color="teal"
          trend={{ value: '+4 vs yday', positive: true }}
          onClick={() => setActiveTab('admin-appointments')}
        />
        <StatCard
          title="Pending Review"
          value={pendingAppointments.length}
          subtitle="Awaiting confirm"
          icon={Clock}
          color="amber"
          onClick={() => {
            setScheduleFilter('Pending');
          }}
        />
        <StatCard
          title="Patients"
          value={patients.length}
          subtitle="Registered profiles"
          icon={Users}
          color="blue"
          onClick={() => setActiveTab('admin-patients')}
        />
        <StatCard
          title="Ambulance SOS"
          value={activeAmbulanceRequests.length}
          subtitle="Active dispatches"
          icon={Truck}
          color="rose"
          onClick={() => setActiveTab('admin-emergency')}
        />
        <StatCard
          title="Blood Requests"
          value={activeBloodRequests.length}
          subtitle="Open requirements"
          icon={Droplet}
          color="indigo"
          onClick={() => setActiveTab('admin-emergency')}
        />
        <StatCard
          title="Completion Rate"
          value="92%"
          subtitle="Average attendance"
          icon={CheckCircle2}
          color="emerald"
          onClick={() => setActiveTab('admin-analytics')}
        />
      </div>

      {/* Analytics Visual Section: SVG Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Appointment Trend Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span>Weekly Appointment Volume (Mon - Sun)</span>
              </h3>
              <p className="text-xs text-slate-500">Completed vs Confirmed outpatient slots</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              +14% this week
            </span>
          </div>

          {/* Responsive SVG Bar Chart */}
          <div className="h-52 w-full flex items-end justify-between gap-3 pt-6 px-2">
            {[
              { day: 'Mon', count: 18, max: 25, height: '72%' },
              { day: 'Tue', count: 22, max: 25, height: '88%' },
              { day: 'Wed', count: 16, max: 25, height: '64%' },
              { day: 'Thu', count: 20, max: 25, height: '80%' },
              { day: 'Fri', count: 24, max: 25, height: '96%' },
              { day: 'Sat', count: 19, max: 25, height: '76%' },
              { day: 'Sun', count: 8, max: 25, height: '32%' },
            ].map(col => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[11px] font-mono font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {col.count}
                </span>
                <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end overflow-hidden p-0.5">
                  <div
                    style={{ height: col.height }}
                    className="w-full bg-gradient-to-t from-teal-600 to-sky-500 rounded-t-md group-hover:from-teal-500 group-hover:to-sky-400 transition-all shadow-xs"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">{col.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Average: 18.2 patients / day</span>
            <span className="text-teal-700 font-bold">Peak: Friday morning slots</span>
          </div>
        </div>

        {/* Department Distribution Mini Progress Bars */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-sky-600" />
              <span>Department Breakdown</span>
            </h3>

            <div className="space-y-3.5 pt-3">
              {[
                { dept: 'General Medicine', percentage: 42, count: '38 visits', color: 'bg-teal-600' },
                { dept: 'Pediatrics', percentage: 24, count: '22 visits', color: 'bg-sky-500' },
                { dept: 'Dermatology', percentage: 16, count: '14 visits', color: 'bg-indigo-500' },
                { dept: 'ENT & Dental', percentage: 12, count: '11 visits', color: 'bg-amber-500' },
                { dept: 'Preventive Health', percentage: 6, count: '5 visits', color: 'bg-emerald-500' },
              ].map(item => (
                <div key={item.dept} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">{item.dept}</span>
                    <span className="text-slate-500">{item.count} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('admin-analytics')}
            className="w-full mt-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Analytics Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Today's Schedule Table & Quick Status Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>Clinic Schedule & Attendance Dispatch</span>
            </h2>
            <p className="text-xs text-slate-500">Confirm bookings, mark attendance, or log cancellations</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            {(['Today', 'Pending', 'All'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setScheduleFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  scheduleFilter === tab
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Apt ID</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Doctor & Dept</th>
                <th className="py-3 px-4">Slot Time</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayedAppointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No appointments matching current filter.
                  </td>
                </tr>
              ) : (
                displayedAppointments.slice(0, 8).map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {apt.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {apt.patientName}
                      <span className="block text-[10px] text-slate-400 font-normal">
                        {apt.patientPhone}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">{apt.doctorName}</span>
                      <span className="block text-[10px] text-slate-500">{apt.department}</span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {apt.date === todayStr ? 'Today' : apt.date} • {apt.timeSlot.split(' - ')[0]}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {apt.reasonCategory}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={apt.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {apt.status === 'Scheduled' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                            className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded font-semibold text-[11px] transition-colors"
                            title="Confirm Booking"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status === 'Confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded font-semibold text-[11px] transition-colors"
                            title="Mark Patient Completed"
                          >
                            Complete
                          </button>
                        )}
                        {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'No-show')}
                              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded font-semibold text-[11px] transition-colors"
                              title="Mark Patient No-show"
                            >
                              No-show
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded font-semibold text-[11px] transition-colors"
                              title="Cancel slot"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            Showing top {Math.min(displayedAppointments.length, 8)} appointments
          </span>
          <button
            onClick={() => setActiveTab('admin-appointments')}
            className="text-teal-700 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Full Appointments Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
