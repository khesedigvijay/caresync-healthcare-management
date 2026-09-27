import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientProfile, BloodGroup } from '../../types';
import { Modal } from '../../components/common/Modal';
import { 
  Users, 
  Search, 
  UserPlus, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Droplet, 
  AlertCircle,
  Clock,
  History
} from 'lucide-react';

export const AdminPatientsView: React.FC = () => {
  const { patients, appointments, addNewPatient } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [bloodFilter, setBloodFilter] = useState<string>('All');
  const [selectedPatient, setSelectedPatient] = useState<PatientProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New patient registration form state
  const [newPatient, setNewPatient] = useState({
    fullName: '',
    age: 30,
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    phone: '',
    email: '',
    address: 'Pune, Maharashtra',
    bloodGroup: 'B+' as BloodGroup,
    emergencyContact: {
      name: '',
      phone: '',
      relation: 'Family',
    },
    status: 'Active' as 'Active' | 'Inactive',
  });

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredPatients = patients.filter(p => {
    if (bloodFilter !== 'All' && p.bloodGroup !== bloodFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.fullName.toLowerCase().includes(q);
      const matchPhone = p.phone.toLowerCase().includes(q);
      const matchAddress = p.address.toLowerCase().includes(q);
      return matchName || matchPhone || matchAddress;
    }
    return true;
  });

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    addNewPatient({
      ...newPatient,
      userId: 'usr-walkin-' + Date.now(),
    });
    setIsAddModalOpen(false);
    setNewPatient({
      fullName: '',
      age: 30,
      gender: 'Male',
      phone: '',
      email: '',
      address: 'Pune, Maharashtra',
      bloodGroup: 'B+',
      emergencyContact: { name: '', phone: '', relation: 'Family' },
      status: 'Active',
    });
  };

  // Find visit history for selected patient
  const patientVisits = selectedPatient
    ? appointments.filter(a => a.patientId === selectedPatient.id)
    : [];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-600" />
            <span>Patient Administrative Registry</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Maintain administrative contacts, emergency numbers, and visit attendance logs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 self-start sm:self-center"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register Walk-in Patient</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 mr-1">Blood Group:</span>
          {bloodGroups.map(bg => (
            <button
              key={bg}
              onClick={() => setBloodFilter(bg)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                bloodFilter === bg
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search patient name, phone, area..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Patient Name</th>
                <th className="py-3.5 px-4">Age / Gender</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Primary Phone</th>
                <th className="py-3.5 px-4">Pune Residential Area</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    No patients match your search.
                  </td>
                </tr>
              ) : (
                filteredPatients.map(p => {
                  const lastApt = appointments.find(a => a.patientId === p.id);

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-slate-900">{p.fullName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{p.id}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        {p.age} yrs • {p.gender}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {p.bloodGroup}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-800">
                        {p.phone}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                        {p.address}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedPatient(p)}
                          className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold rounded-lg transition-colors text-[11px]"
                        >
                          View Profile & Visits
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Profile & Visit History Modal */}
      {selectedPatient && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPatient(null)}
          title={`Patient Administrative File: ${selectedPatient.fullName}`}
          subtitle={`Patient ID: ${selectedPatient.id} • Registered ${selectedPatient.registeredDate}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            
            {/* Basic Info Grid */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px]">Age & Gender</span>
                <span className="font-bold text-slate-800">{selectedPatient.age} yrs, {selectedPatient.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Blood Group</span>
                <span className="font-bold text-rose-700">{selectedPatient.bloodGroup}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Contact Phone</span>
                <span className="font-semibold text-slate-800">{selectedPatient.phone}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-400 block text-[10px]">Residential Address</span>
                <span className="text-slate-700">{selectedPatient.address}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Email</span>
                <span className="text-slate-700">{selectedPatient.email || 'N/A'}</span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
              <span className="text-[10px] font-bold uppercase text-rose-800 tracking-wider">
                Emergency Contact Person
              </span>
              <p className="font-bold text-slate-900">
                {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relation})
              </p>
              <p className="text-slate-600 font-mono">
                {selectedPatient.emergencyContact.phone}
              </p>
            </div>

            {/* Visit History Table */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <History className="w-4 h-4 text-teal-600" />
                <span>Visit Attendance History ({patientVisits.length})</span>
              </h4>

              {patientVisits.length === 0 ? (
                <p className="text-slate-400 text-center py-4 bg-slate-50 rounded-lg">
                  No appointments recorded for this patient.
                </p>
              ) : (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-600 text-[10px] uppercase font-bold">
                      <tr>
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Doctor & Dept</th>
                        <th className="py-2 px-3">Category</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {patientVisits.map(visit => (
                        <tr key={visit.id} className="hover:bg-slate-50">
                          <td className="py-2 px-3 font-semibold text-slate-800">{visit.date}</td>
                          <td className="py-2 px-3">{visit.doctorName} ({visit.department})</td>
                          <td className="py-2 px-3 text-slate-600">{visit.reasonCategory}</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                              {visit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="pt-2 text-[11px] text-slate-400 italic">
              Notice: Medical diagnosis and prescription notes are strictly maintained separately in clinical records. CareSync only stores administrative visit attendance.
            </div>
          </div>
        </Modal>
      )}

      {/* Add Walk-in Patient Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={true}
          onClose={() => setIsAddModalOpen(false)}
          title="Register Walk-in Patient"
          subtitle="Administrative front-desk registration"
          maxWidth="md"
        >
          <form onSubmit={handleCreatePatient} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={newPatient.fullName}
                onChange={e => setNewPatient({ ...newPatient, fullName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g. Ramesh Kulkarni"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Age <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  max={120}
                  value={newPatient.age}
                  onChange={e => setNewPatient({ ...newPatient, age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Gender
                </label>
                <select
                  value={newPatient.gender}
                  onChange={e => setNewPatient({ ...newPatient, gender: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Blood Group
                </label>
                <select
                  value={newPatient.bloodGroup}
                  onChange={e => setNewPatient({ ...newPatient, bloodGroup: e.target.value as BloodGroup })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-rose-700 bg-white"
                >
                  {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={newPatient.phone}
                onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="+91 98220 00000"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Pune Address
              </label>
              <input
                type="text"
                value={newPatient.address}
                onChange={e => setNewPatient({ ...newPatient, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="e.g. Model Colony, Shivajinagar, Pune"
              />
            </div>

            <div className="pt-2 border-t border-slate-200">
              <label className="block font-bold text-slate-900 mb-1">
                Emergency Contact Details
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  placeholder="Contact Name"
                  value={newPatient.emergencyContact.name}
                  onChange={e => setNewPatient({
                    ...newPatient,
                    emergencyContact: { ...newPatient.emergencyContact, name: e.target.value }
                  })}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
                <input
                  type="tel"
                  required
                  placeholder="Contact Phone"
                  value={newPatient.emergencyContact.phone}
                  onChange={e => setNewPatient({
                    ...newPatient,
                    emergencyContact: { ...newPatient.emergencyContact, phone: e.target.value }
                  })}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg"
              >
                Register Patient
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
};
