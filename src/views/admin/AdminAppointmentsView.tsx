import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment, AppointmentStatus } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Ban, 
  Clock, 
  FileText, 
  Stethoscope, 
  Building2,
  Download
} from 'lucide-react';

export const AdminAppointmentsView: React.FC = () => {
  const { appointments, updateAppointmentStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedApt, setSelectedApt] = useState<Appointment | null>(null);

  const statuses: (AppointmentStatus | 'All')[] = [
    'All',
    'Scheduled',
    'Confirmed',
    'Completed',
    'Cancelled',
    'No-show',
  ];

  const filtered = appointments.filter(apt => {
    if (statusFilter !== 'All' && apt.status !== statusFilter) return false;
    if (dateFilter && apt.date !== dateFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = apt.id.toLowerCase().includes(q);
      const matchPatient = apt.patientName.toLowerCase().includes(q);
      const matchDoctor = apt.doctorName.toLowerCase().includes(q);
      const matchPhone = apt.patientPhone.toLowerCase().includes(q);
      return matchId || matchPatient || matchDoctor || matchPhone;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-teal-600" />
            <span>Master Appointment Control Desk</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Filter, review, confirm, and update attendance across all clinic outpatient slots.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span>Total Records: <strong className="text-slate-900">{appointments.length}</strong></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {statuses.map(st => {
              const count = appointments.filter(a => st === 'All' ? true : a.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    statusFilter === st
                      ? 'bg-teal-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{st}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    statusFilter === st ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Date Picker & Search */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            />
            {dateFilter && (
              <button
                onClick={() => setDateFilter('')}
                className="text-xs text-rose-600 hover:underline font-semibold"
              >
                Clear
              </button>
            )}

            <div className="relative w-full md:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search patient, doctor, ID..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Appointments Master Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ref ID</th>
                <th className="py-3.5 px-4">Patient Information</th>
                <th className="py-3.5 px-4">Clinic & Doctor</th>
                <th className="py-3.5 px-4">Date & Time Slot</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No appointments match the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {apt.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{apt.patientName}</p>
                      <p className="text-[11px] text-slate-500">{apt.contactNumber}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800">{apt.doctorName}</p>
                      <p className="text-[11px] text-slate-500">{apt.clinicName} • {apt.department}</p>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-700">
                      <p className="font-semibold">{apt.date}</p>
                      <p className="text-[11px] text-slate-500">{apt.timeSlot}</p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {apt.reasonCategory}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={apt.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedApt(apt)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold transition-colors"
                        >
                          Details
                        </button>
                        
                        {apt.status === 'Scheduled' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                            className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded text-[11px] font-semibold transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {apt.status === 'Confirmed' && (
                          <button
                            onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[11px] font-semibold transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                          <>
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'No-show')}
                              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[11px] font-semibold transition-colors"
                            >
                              No-Show
                            </button>
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                              className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded text-[11px] font-semibold transition-colors"
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
      </div>

      {/* Details Modal */}
      {selectedApt && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApt(null)}
          title={`Appointment Details: ${selectedApt.id}`}
          subtitle="Administrative booking record"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="font-mono text-xs font-bold text-slate-700">{selectedApt.id}</span>
              <StatusBadge status={selectedApt.status} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">Patient Name</span>
                <span className="font-bold text-slate-800">{selectedApt.patientName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Contact Phone</span>
                <span className="font-semibold text-slate-800">{selectedApt.contactNumber}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Doctor / Clinician</span>
                <span className="font-semibold text-slate-800">{selectedApt.doctorName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Department</span>
                <span className="font-semibold text-slate-800">{selectedApt.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Clinic Name</span>
                <span className="font-semibold text-slate-800">{selectedApt.clinicName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Date & Time</span>
                <span className="font-bold text-sky-800">{selectedApt.date} • {selectedApt.timeSlot}</span>
              </div>
            </div>

            {selectedApt.notes && (
              <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                <strong>Administrative Note:</strong> {selectedApt.notes}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedApt(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};
