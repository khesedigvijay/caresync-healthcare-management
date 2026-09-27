import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatCard } from '../../components/common/StatCard';
import { StatusBadge } from '../../components/common/StatusBadge';
import { 
  Calendar, 
  Clock, 
  Truck, 
  Droplet, 
  Building2, 
  User, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  PhoneCall, 
  MapPin, 
  CalendarCheck,
  ChevronRight,
  ShieldCheck,
  Activity
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { 
    currentUser, 
    currentPatientProfile, 
    appointments, 
    ambulanceRequests, 
    bloodRequests, 
    setActiveTab 
  } = useApp();

  const userAppointments = appointments.filter(a => a.patientId === currentPatientProfile?.id);
  const upcomingAppointments = userAppointments.filter(a => a.status === 'Confirmed' || a.status === 'Scheduled');
  const userAmbulanceRequests = ambulanceRequests.filter(a => a.patientId === currentPatientProfile?.id);
  const activeAmbulance = userAmbulanceRequests.find(a => a.status !== 'Completed' && a.status !== 'Cancelled');
  const userBloodRequests = bloodRequests.filter(b => b.patientId === currentPatientProfile?.id);

  const nextAppointment = upcomingAppointments[0];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-teal-700 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Patient Administrative Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name || 'Aarav'}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-xl">
              Manage your clinic appointments, track ambulance requests, and coordinate blood requirements seamlessly.
            </p>

            {currentPatientProfile && (
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-sky-100">
                <span className="bg-white/15 px-2.5 py-1 rounded-lg">
                  Blood Group: <strong className="text-white">{currentPatientProfile.bloodGroup}</strong>
                </span>
                <span className="bg-white/15 px-2.5 py-1 rounded-lg">
                  Age: <strong className="text-white">{currentPatientProfile.age} yrs</strong>
                </span>
                <span className="bg-white/15 px-2.5 py-1 rounded-lg">
                  City: <strong className="text-white">Pune</strong>
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('book-appointment')}
              className="px-4 py-2.5 bg-white text-sky-800 hover:bg-sky-50 font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-sky-600" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => setActiveTab('emergency-center')}
              className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Emergency Services</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Upcoming Visits"
          value={upcomingAppointments.length}
          subtitle="Confirmed & scheduled slots"
          icon={Calendar}
          color="blue"
          onClick={() => setActiveTab('my-appointments')}
        />
        <StatCard
          title="Total Appointments"
          value={userAppointments.length}
          subtitle="Lifetime clinic visits"
          icon={CalendarCheck}
          color="teal"
          onClick={() => setActiveTab('my-appointments')}
        />
        <StatCard
          title="Ambulance Requests"
          value={userAmbulanceRequests.length}
          subtitle={activeAmbulance ? '1 active on route' : '0 in progress'}
          icon={Truck}
          color="rose"
          onClick={() => setActiveTab('ambulance')}
        />
        <StatCard
          title="Blood Requests"
          value={userBloodRequests.length}
          subtitle="Broadcasting to Pune banks"
          icon={Droplet}
          color="amber"
          onClick={() => setActiveTab('blood')}
        />
      </div>

      {/* Live Ambulance Tracker Banner (If Active) */}
      {activeAmbulance && (
        <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-white rounded-2xl border-2 border-indigo-200 p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-sm shrink-0">
                <Truck className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">
                    Active Ambulance Dispatch: {activeAmbulance.id}
                  </h3>
                  <StatusBadge status={activeAmbulance.status} size="sm" />
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Destination: <strong>{activeAmbulance.destinationHospital}</strong> • Pickup: {activeAmbulance.pickupLocation}
                </p>
                {activeAmbulance.driverName && (
                  <p className="text-xs text-indigo-800 font-semibold mt-1">
                    Assigned: {activeAmbulance.vehicleNumber} ({activeAmbulance.driverName}) • Phone: {activeAmbulance.driverPhone} • ETA: {activeAmbulance.etaMinutes} mins
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => setActiveTab('ambulance')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Track Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Action Grid */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          
          <button
            onClick={() => setActiveTab('book-appointment')}
            className="p-4 bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Book Visit</p>
              <p className="text-[11px] text-slate-500">Find clinic slot</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('my-appointments')}
            className="p-4 bg-white rounded-xl border border-slate-200/90 hover:border-teal-300 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">My Visits</p>
              <p className="text-[11px] text-slate-500">Manage bookings</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('ambulance')}
            className="p-4 bg-white rounded-xl border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Ambulance</p>
              <p className="text-[11px] text-slate-500">Dispatch request</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('blood')}
            className="p-4 bg-white rounded-xl border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Droplet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Find Blood</p>
              <p className="text-[11px] text-slate-500">Pune blood banks</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('facilities')}
            className="p-4 bg-white rounded-xl border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all text-left flex flex-col justify-between group"
          >
            <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Facilities</p>
              <p className="text-[11px] text-slate-500">Nearby hospitals</p>
            </div>
          </button>

        </div>
      </div>

      {/* Main Grid: Next Appointment Spotlight + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Next Appointment Spotlight Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-sky-600" />
              <h2 className="text-base font-bold text-slate-900">
                Next Upcoming Appointment
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('my-appointments')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
            >
              <span>View all ({userAppointments.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {nextAppointment ? (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {nextAppointment.id}
                    </span>
                    <StatusBadge status={nextAppointment.status} size="sm" />
                    <span className="text-xs text-slate-500 font-medium">
                      {nextAppointment.department}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {nextAppointment.doctorName}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {nextAppointment.clinicName}
                  </p>
                </div>

                <div className="text-left sm:text-right bg-white p-3 rounded-lg border border-slate-200 shrink-0">
                  <p className="text-xs font-bold text-sky-800">{nextAppointment.date}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{nextAppointment.timeSlot}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200/80 text-slate-600">
                <div>
                  <span className="text-slate-400">Reason / Category:</span>{' '}
                  <span className="font-semibold text-slate-800">{nextAppointment.reasonCategory}</span>
                </div>
                <div>
                  <span className="text-slate-400">Registered Phone:</span>{' '}
                  <span className="font-semibold text-slate-800">{nextAppointment.contactNumber}</span>
                </div>
                {nextAppointment.notes && (
                  <div className="sm:col-span-2 text-slate-500 italic">
                    Note: "{nextAppointment.notes}"
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveTab('my-appointments')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors"
                >
                  Manage Appointment
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">No upcoming appointments</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You have no scheduled visits at the moment. Need a routine consultation or follow-up?
              </p>
              <button
                onClick={() => setActiveTab('book-appointment')}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Book Appointment Now
              </button>
            </div>
          )}
        </div>

        {/* Profile Card & Emergency Contact */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" />
              <span>Administrative Profile</span>
            </h2>
            <button
              onClick={() => setActiveTab('patient-profile')}
              className="text-xs font-semibold text-teal-600 hover:text-teal-800"
            >
              Edit
            </button>
          </div>

          {currentPatientProfile && (
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Full Name</span>
                <span className="font-bold text-slate-800">{currentPatientProfile.fullName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Phone</span>
                <span className="font-semibold text-slate-800">{currentPatientProfile.phone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Blood Group</span>
                <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                  {currentPatientProfile.bloodGroup}
                </span>
              </div>
              <div className="py-1 border-b border-slate-100">
                <span className="text-slate-500 block mb-0.5">Address</span>
                <span className="font-medium text-slate-700 leading-snug">{currentPatientProfile.address}</span>
              </div>

              {/* Emergency Contact Box */}
              <div className="mt-4 p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                <p className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">
                  Emergency Contact
                </p>
                <p className="font-bold text-slate-900">
                  {currentPatientProfile.emergencyContact.name} ({currentPatientProfile.emergencyContact.relation})
                </p>
                <p className="text-slate-600 font-mono">
                  {currentPatientProfile.emergencyContact.phone}
                </p>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 italic">
                * CareSync stores basic administrative details only. No sensitive medical health records are collected.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
