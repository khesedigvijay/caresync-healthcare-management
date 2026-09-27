import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppointmentReasonCategory, Appointment } from '../../types';
import { 
  Calendar, 
  Clock, 
  Building2, 
  User, 
  Phone, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  AlertCircle,
  Stethoscope,
  ArrowRight,
  Download
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const BookAppointmentView: React.FC = () => {
  const { 
    clinics, 
    currentPatientProfile, 
    currentUser, 
    bookAppointment, 
    setActiveTab 
  } = useApp();

  const [selectedClinicId, setSelectedClinicId] = useState(clinics[0].id);
  const selectedClinic = clinics.find(c => c.id === selectedClinicId) || clinics[0];

  const [department, setDepartment] = useState(selectedClinic.departments[0]);
  const [doctorName, setDoctorName] = useState(selectedClinic.doctors[0]?.name || 'Dr. On Duty');
  
  // Date setup (defaults to tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(tomorrowStr);

  const timeSlots = [
    '09:30 AM - 10:00 AM',
    '10:15 AM - 10:45 AM',
    '11:00 AM - 11:30 AM',
    '11:45 AM - 12:15 PM',
    '02:30 PM - 03:00 PM',
    '03:15 PM - 03:45 PM',
    '04:00 PM - 04:30 PM',
    '05:00 PM - 05:30 PM',
  ];
  const [selectedSlot, setSelectedSlot] = useState(timeSlots[1]);

  const [reasonCategory, setReasonCategory] = useState<AppointmentReasonCategory>('Routine Checkup');
  const [contactNumber, setContactNumber] = useState(currentPatientProfile?.phone || currentUser?.phone || '+91 98220 14892');
  const [notes, setNotes] = useState('');

  // Confirmation modal state
  const [confirmedApt, setConfirmedApt] = useState<Appointment | null>(null);

  const handleClinicChange = (id: string) => {
    setSelectedClinicId(id);
    const newClinic = clinics.find(c => c.id === id) || clinics[0];
    setDepartment(newClinic.departments[0]);
    setDoctorName(newClinic.doctors[0]?.name || 'Dr. On Duty');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const apt = bookAppointment({
      clinicId: selectedClinic.id,
      doctorName,
      department,
      date: selectedDate,
      timeSlot: selectedSlot,
      reasonCategory,
      contactNumber,
      notes,
    });
    setConfirmedApt(apt);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Book Outpatient Clinic Appointment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Schedule an in-person consultation with primary care doctors across Pune.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-800 text-xs font-semibold self-start sm:self-center">
          <ShieldCheck className="w-4 h-4 text-sky-600" />
          <span>Administrative slot allocation • Zero symptom logging</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Booking Form (2 Cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6">
          
          {/* 1. Clinic Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-sky-600" />
              <span>1. Choose Clinic Location</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {clinics.map(clinic => (
                <div
                  key={clinic.id}
                  onClick={() => handleClinicChange(clinic.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedClinicId === clinic.id
                      ? 'border-sky-500 bg-sky-50/50 ring-2 ring-sky-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="font-bold text-slate-900 text-xs">{clinic.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{clinic.area}, Pune</p>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-slate-700">₹{clinic.consultationFee} fee</span>
                    <span className="text-teal-700 font-semibold">{clinic.rating} ★</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Department & Doctor Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <select
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                {selectedClinic.departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                Doctor / Medical Officer
              </label>
              <select
                value={doctorName}
                onChange={e => setDoctorName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                {selectedClinic.doctors.map(doc => (
                  <option key={doc.name} value={doc.name}>
                    {doc.name} ({doc.department} - {doc.experience})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Date & Time Slot Selection */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>2. Select Date & Slot</span>
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                />
              </div>
            </div>

            {/* Time Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {timeSlots.map(slot => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 px-2 text-center rounded-lg text-xs font-medium transition-all ${
                    selectedSlot === slot
                      ? 'bg-sky-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {slot.split(' - ')[0]}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              Selected window: <strong>{selectedSlot}</strong> on <strong>{selectedDate}</strong>
            </p>
          </div>

          {/* 4. Administrative Category & Contact */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>3. Administrative Category & Contact</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Visit Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={reasonCategory}
                  onChange={e => setReasonCategory(e.target.value as AppointmentReasonCategory)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="Routine Checkup">Routine Checkup</option>
                  <option value="Follow-up Consultation">Follow-up Consultation</option>
                  <option value="General Consultation">General Consultation</option>
                  <option value="Vaccination Review">Vaccination Review</option>
                  <option value="Preventive Health Check">Preventive Health Check</option>
                  <option value="Administrative Certificate">Administrative Certificate</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1">
                  * No medical symptoms or diagnoses are collected here.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Patient Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={e => setContactNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  placeholder="+91 98220 12345"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  SMS & status updates will be sent to this number.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Administrative Note (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  placeholder="e.g. Wheelchair assistance required at front desk"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Generate Appointment Slip</span>
            </button>
          </div>

        </form>

        {/* Sidebar Summary Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4 sticky top-20">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Booking Summary
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-900">{selectedClinic.name}</p>
                  <p className="text-slate-500 text-[11px]">{selectedClinic.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                <Stethoscope className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">{doctorName}</p>
                  <p className="text-[11px] text-slate-500">{department}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                <Clock className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800">{selectedDate}</p>
                  <p className="text-[11px] text-slate-500">{selectedSlot}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-slate-700">
                <span>Standard Consultation Fee:</span>
                <span className="font-bold text-slate-900 text-sm">₹{selectedClinic.consultationFee}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>Patient Check-in Instructions</span>
              </div>
              <p className="text-amber-800 leading-relaxed">
                Please arrive 10 minutes prior to your allocated slot at the clinic reception. Show the generated appointment ID.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Confirmation Modal */}
      {confirmedApt && (
        <Modal
          isOpen={true}
          onClose={() => {
            setConfirmedApt(null);
            setActiveTab('my-appointments');
          }}
          title="Appointment Confirmed!"
          subtitle="Your clinic visit has been successfully scheduled."
          maxWidth="md"
        >
          <div className="space-y-4 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-500">Appointment Reference ID</span>
              <p className="text-2xl font-mono font-extrabold text-sky-700 tracking-wider">
                {confirmedApt.id}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-left text-xs space-y-2.5 border border-slate-200">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Clinic:</span>
                <span className="font-bold text-slate-800">{confirmedApt.clinicName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Doctor / Dept:</span>
                <span className="font-semibold text-slate-800">{confirmedApt.doctorName} ({confirmedApt.department})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Date & Slot:</span>
                <span className="font-bold text-sky-800">{confirmedApt.date} • {confirmedApt.timeSlot}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Reason Category:</span>
                <span className="font-semibold text-slate-800">{confirmedApt.reasonCategory}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Contact Number:</span>
                <span className="font-semibold text-slate-800">{confirmedApt.contactNumber}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setConfirmedApt(null);
                  setActiveTab('my-appointments');
                }}
                className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View My Appointments</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>
            </div>

          </div>
        </Modal>
      )}

    </div>
  );
};
