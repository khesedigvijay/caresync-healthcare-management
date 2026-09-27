import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Droplet, 
  Clock, 
  Activity, 
  Users, 
  ShieldCheck,
  Building2
} from 'lucide-react';

export const AdminAnalyticsView: React.FC = () => {
  const { appointments, ambulanceRequests, bloodRequests, fleet, patients } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];

  const totalAppointments = appointments.length;
  const completedAppointments = appointments.filter(a => a.status === 'Completed').length;
  const cancelledAppointments = appointments.filter(a => a.status === 'Cancelled' || a.status === 'No-show').length;
  const todayAppointments = appointments.filter(a => a.date === todayStr).length;

  const totalAmbulance = ambulanceRequests.length;
  const totalBlood = bloodRequests.length;
  const totalEmergency = totalAmbulance + totalBlood;

  const completionRate = totalAppointments > 0 
    ? Math.round((completedAppointments / totalAppointments) * 100) 
    : 85;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-teal-600" />
            <span>Clinic Operational Analytics & Performance</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time outpatient trends, dispatch metrics, and patient attendance rates.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg border border-teal-200">
          <Activity className="w-4 h-4 text-teal-600" />
          <span>Live Metrics • Pune Region</span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Appointments Today"
          value={todayAppointments}
          subtitle="Outpatient bookings"
          icon={Calendar}
          color="teal"
          trend={{ value: '+12% vs last week', positive: true }}
        />
        <StatCard
          title="Completed Visits"
          value={completedAppointments}
          subtitle={`${completionRate}% completion rate`}
          icon={CheckCircle2}
          color="emerald"
        />
        <StatCard
          title="Cancellations & No-Shows"
          value={cancelledAppointments}
          subtitle="Released slot capacity"
          icon={XCircle}
          color="rose"
        />
        <StatCard
          title="Total Emergency SOS"
          value={totalEmergency}
          subtitle={`${totalAmbulance} Ambulance • ${totalBlood} Blood`}
          icon={Truck}
          color="amber"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weekly Consultation Flow Chart */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Weekly Consultation Volume (Mon - Sun)
              </h3>
              <p className="text-xs text-slate-500">Patient slots booked per day across departments</p>
            </div>
            <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Total: 127
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-3">
            {[
              { day: 'Mon', val: 19, pct: '76%' },
              { day: 'Tue', val: 24, pct: '96%' },
              { day: 'Wed', val: 17, pct: '68%' },
              { day: 'Thu', val: 21, pct: '84%' },
              { day: 'Fri', val: 25, pct: '100%' },
              { day: 'Sat', val: 15, pct: '60%' },
              { day: 'Sun', val: 6, pct: '24%' },
            ].map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.val}
                </span>
                <div className="w-full bg-slate-100 rounded-t-lg h-40 flex items-end p-0.5">
                  <div
                    style={{ height: d.pct }}
                    className="w-full bg-gradient-to-t from-teal-700 via-teal-500 to-sky-400 rounded-t-md group-hover:from-teal-600 transition-all shadow-xs"
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">{d.day}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Peak Day: Friday (25 patients)</span>
            <span>Lowest: Sunday (Morning emergency OPD only)</span>
          </div>
        </div>

        {/* Appointment Status Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Outpatient Attendance Status Breakdown
              </h3>
              <p className="text-xs text-slate-500">Ratio of successful attendances vs cancellations</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              High Reliability
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {[
              { status: 'Confirmed & Scheduled', count: 32, pct: 45, color: 'bg-teal-500' },
              { status: 'Successfully Completed', count: 28, pct: 40, color: 'bg-emerald-500' },
              { status: 'Patient Cancelled', count: 6, pct: 9, color: 'bg-slate-400' },
              { status: 'Marked No-Show', count: 4, pct: 6, color: 'bg-amber-500' },
            ].map(item => (
              <div key={item.status} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.status}</span>
                  <span className="text-slate-600">{item.count} bookings ({item.pct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.pct}%` }}
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800">Operational Insight:</span>
            <p>
              Pre-appointment SMS confirmations have reduced clinic no-shows to under 7% across primary healthcare branches in Pune.
            </p>
          </div>
        </div>

      </div>

      {/* Emergency Response Performance Indicators */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Truck className="w-4 h-4 text-rose-600" />
          <span>Emergency Dispatch & Logistics Performance</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-xs text-slate-500 font-semibold">Avg Dispatch Time</p>
            <p className="text-2xl font-bold text-slate-900">8.4 Mins</p>
            <p className="text-[11px] text-teal-700 font-medium">Faster than city 12-min benchmark</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-xs text-slate-500 font-semibold">Blood Bank Match Rate</p>
            <p className="text-2xl font-bold text-slate-900">94.2%</p>
            <p className="text-[11px] text-teal-700 font-medium">Sassoon & Poona Serological hubs</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <p className="text-xs text-slate-500 font-semibold">Active Fleet Availability</p>
            <p className="text-2xl font-bold text-slate-900">
              {fleet.filter(f => f.status === 'Available').length} / {fleet.length} Units
            </p>
            <p className="text-[11px] text-slate-500">BLS & ALS vehicles ready on standby</p>
          </div>
        </div>
      </div>

    </div>
  );
};
