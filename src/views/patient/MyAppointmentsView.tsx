import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Modal } from '../../components/common/Modal';
import { 
  Calendar, 
  Clock, 
  Building2, 
  User, 
  Search, 
  Filter, 
  XCircle, 
  FileText, 
  PlusCircle,
  Download,
  AlertCircle,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

export const MyAppointmentsView: React.FC = () => {
  const { 
    appointments, 
    currentPatientProfile, 
    cancelAppointment, 
    setActiveTab 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Upcoming' | 'Completed' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog states
  const [aptToCancel, setAptToCancel] = useState<Appointment | null>(null);
  const [selectedSlip, setSelectedSlip] = useState<Appointment | null>(null);

  // Filter only for current patient
  const userAppointments = appointments.filter(a => a.patientId === currentPatientProfile?.id);

  const filteredAppointments = userAppointments.filter(apt => {
    // Tab filter
    if (activeFilter === 'Upcoming') {
      if (apt.status !== 'Confirmed' && apt.status !== 'Scheduled') return false;
    } else if (activeFilter === 'Completed') {
      if (apt.status !== 'Completed') return false;
    } else if (activeFilter === 'Cancelled') {
      if (apt.status !== 'Cancelled' && apt.status !== 'No-show') return false;
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = apt.id.toLowerCase().includes(q);
      const matchDoc = apt.doctorName.toLowerCase().includes(q);
      const matchClinic = apt.clinicName.toLowerCase().includes(q);
      const matchDept = apt.department.toLowerCase().includes(q);
      return matchId || matchDoc || matchClinic || matchDept;
    }

    return true;
  });

  const handleConfirmCancel = () => {
    if (aptToCancel) {
      cancelAppointment(aptToCancel.id);
      setAptToCancel(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            My Clinic Appointments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track confirmed outpatient slots, view receipts, and cancel upcoming appointments.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('book-appointment')}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book New Visit</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(['All', 'Upcoming', 'Completed', 'Cancelled'] as const).map(tab => {
            const count = userAppointments.filter(a => {
              if (tab === 'All') return true;
              if (tab === 'Upcoming') return a.status === 'Confirmed' || a.status === 'Scheduled';
              if (tab === 'Completed') return a.status === 'Completed';
              if (tab === 'Cancelled') return a.status === 'Cancelled' || a.status === 'No-show';
              return true;
            }).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeFilter === tab
                    ? 'bg-sky-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{tab}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeFilter === tab ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by Doctor, Clinic or ID..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No appointments found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchQuery ? 'Try clearing your search query.' : 'You have no appointments under this category.'}
          </p>
          <button
            onClick={() => setActiveTab('book-appointment')}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg transition-colors"
          >
            Book Appointment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAppointments.map(apt => {
            const isUpcoming = apt.status === 'Confirmed' || apt.status === 'Scheduled';

            return (
              <div
                key={apt.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Bar: ID and Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {apt.id}
                    </span>
                    <StatusBadge status={apt.status} size="sm" />
                  </div>

                  {/* Doctor & Clinic */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{apt.doctorName}</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {apt.department} • <span className="text-slate-700">{apt.clinicName}</span>
                    </p>
                  </div>

                  {/* Date & Time slot */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700 font-semibold">
                      <Calendar className="w-4 h-4 text-sky-600" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{apt.timeSlot}</span>
                    </div>
                  </div>

                  {/* Category & Contact */}
                  <div className="text-xs text-slate-600 space-y-1">
                    <p>
                      <span className="text-slate-400">Category:</span>{' '}
                      <span className="font-semibold text-slate-800">{apt.reasonCategory}</span>
                    </p>
                    <p>
                      <span className="text-slate-400">Contact:</span>{' '}
                      <span className="font-semibold text-slate-800">{apt.contactNumber}</span>
                    </p>
                    {apt.notes && (
                      <p className="text-[11px] text-slate-500 italic bg-amber-50/60 p-1.5 rounded border border-amber-100">
                        "{apt.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSlip(apt)}
                    className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Slip</span>
                  </button>

                  {isUpcoming && (
                    <button
                      onClick={() => setAptToCancel(apt)}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancel Visit</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {aptToCancel && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setAptToCancel(null)}
          onConfirm={handleConfirmCancel}
          title="Cancel Appointment?"
          message={`Are you sure you want to cancel appointment ${aptToCancel.id} with ${aptToCancel.doctorName} on ${aptToCancel.date}? This slot will be released back to the clinic.`}
          confirmText="Yes, Cancel Appointment"
          type="danger"
        />
      )}

      {/* Slip Modal */}
      {selectedSlip && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedSlip(null)}
          title="Appointment Confirmation Slip"
          subtitle={`Administrative Reference: ${selectedSlip.id}`}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{selectedSlip.clinicName}</h4>
                  <p className="text-slate-500 text-[11px]">Primary Healthcare Partner</p>
                </div>
                <StatusBadge status={selectedSlip.status} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2.5 py-1">
                <div>
                  <span className="text-slate-400 block text-[10px]">Patient Name</span>
                  <span className="font-bold text-slate-800">{selectedSlip.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone Number</span>
                  <span className="font-semibold text-slate-800">{selectedSlip.contactNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Doctor</span>
                  <span className="font-bold text-slate-800">{selectedSlip.doctorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Department</span>
                  <span className="font-semibold text-slate-800">{selectedSlip.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date</span>
                  <span className="font-bold text-sky-800">{selectedSlip.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Time Slot</span>
                  <span className="font-bold text-sky-800">{selectedSlip.timeSlot}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-400 block text-[10px]">Administrative Category</span>
                <span className="font-medium text-slate-800">{selectedSlip.reasonCategory}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
