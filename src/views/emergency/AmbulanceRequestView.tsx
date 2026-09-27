import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmergencyPriority, AmbulanceStatus, AmbulanceRequest } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { 
  Truck, 
  PhoneCall, 
  MapPin, 
  Navigation, 
  Users, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Radio, 
  User, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const AmbulanceRequestView: React.FC = () => {
  const { 
    currentUser, 
    currentPatientProfile, 
    ambulanceRequests, 
    fleet, 
    requestAmbulance, 
    cancelAppointment 
  } = useApp();

  const [patientName, setPatientName] = useState(currentPatientProfile?.fullName || currentUser?.name || '');
  const [contactNumber, setContactNumber] = useState(currentPatientProfile?.phone || currentUser?.phone || '+91 98220 14892');
  const [pickupLocation, setPickupLocation] = useState(currentPatientProfile?.address || 'Paud Road, Kothrud, Pune');
  const [destinationHospital, setDestinationHospital] = useState('Pune Central Hospital & Trauma Centre');
  const [emergencyPriority, setEmergencyPriority] = useState<EmergencyPriority>('Urgent');
  const [passengerCount, setPassengerCount] = useState(1);
  const [coordinationNote, setCoordinationNote] = useState('');

  // Submitted modal
  const [activeRequest, setActiveRequest] = useState<AmbulanceRequest | null>(null);

  const punePresets = [
    'Paud Road, Kothrud',
    'FC Road, Near Goodluck Cafe',
    'Deccan Gymkhana, Pune',
    'Pune Railway Station Gate 1',
    'Baner Road, Near Balewadi Phata',
    'Viman Platinum, Viman Nagar',
    'Hinjawadi Phase 1 Circle',
  ];

  const hospitalsList = [
    'Pune Central Hospital & Trauma Centre (Deccan)',
    'Sahyadri Super Speciality Hospital (Erandwane / Karve Rd)',
    'Sassoon General Hospital & Trauma ICU (Station Rd)',
    'LifeLine Healthcare Centre (Kothrud)',
    'Ruby Hall Clinic (Sangamvadi)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = requestAmbulance({
      patientName,
      contactNumber,
      pickupLocation,
      destinationHospital,
      emergencyPriority,
      passengerCount,
      coordinationNote,
    });
    setActiveRequest(req);
  };

  // User's ambulance requests
  const userRequests = ambulanceRequests.filter(
    r => r.patientId === currentPatientProfile?.id || r.contactNumber === contactNumber
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Truck className="w-6 h-6 text-rose-600" />
            <span>Emergency Ambulance Request</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dispatch basic & advanced life support ambulances from nearby Pune hubs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <a
            href="tel:108"
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>Dial 108 Hotline</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Ambulance Request Form (2 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6">
          
          {/* Priority selector */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              Emergency Priority Level <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { level: 'Normal' as EmergencyPriority, label: 'Normal Transfer', sub: 'Non-emergency ride', color: 'border-blue-400 bg-blue-50/50 text-blue-900' },
                { level: 'Urgent' as EmergencyPriority, label: 'Urgent Attention', sub: 'Immediate transport', color: 'border-amber-400 bg-amber-50/50 text-amber-900' },
                { level: 'Critical' as EmergencyPriority, label: 'Critical / Trauma', sub: 'ALS with Oxygen', color: 'border-rose-500 bg-rose-50/70 text-rose-900 ring-2 ring-rose-200' },
              ].map(p => (
                <button
                  type="button"
                  key={p.level}
                  onClick={() => setEmergencyPriority(p.level)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    emergencyPriority === p.level
                      ? p.color + ' ring-2'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold">{p.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{p.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Patient info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Patient / Requester Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                placeholder="e.g. Aarav Sharma"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Emergency Contact Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                placeholder="+91 98220 12345"
              />
            </div>
          </div>

          {/* Pickup location */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <label className="block text-xs font-medium text-slate-700">
              Pickup Address in Pune <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={pickupLocation}
              onChange={e => setPickupLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              placeholder="House/Building, Street, Landmark, Pune"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-semibold">Quick Landmarks:</span>
              {punePresets.map(preset => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setPickupLocation(preset + ', Pune')}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Hospital */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Destination Hospital / Casualty <span className="text-rose-500">*</span>
              </label>
              <select
                value={destinationHospital}
                onChange={e => setDestinationHospital(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              >
                {hospitalsList.map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Number of Accompanying Passengers
              </label>
              <select
                value={passengerCount}
                onChange={e => setPassengerCount(parseInt(e.target.value) || 1)}
                className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
              >
                <option value={1}>1 Attendant</option>
                <option value={2}>2 Attendants</option>
                <option value={3}>3 Attendants (Max)</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Coordination Notes (Stairs, wheelchair, landmark notes)
              </label>
              <input
                type="text"
                value={coordinationNote}
                onChange={e => setCoordinationNote(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                placeholder="e.g. Patient on 3rd floor, lift not working; oxygen mask requested."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-5 h-5 animate-pulse" />
              <span>Broadcast & Dispatch Nearest Ambulance</span>
            </button>
          </div>

        </form>

        {/* Sidebar: Available Fleet Status */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Pune Ambulance Fleet</span>
              </h3>
              <span className="text-[10px] text-slate-400 font-mono">Live Standby</span>
            </div>

            <div className="space-y-2.5">
              {fleet.map(unit => (
                <div
                  key={unit.id}
                  className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                    unit.status === 'Available'
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : unit.status === 'On Mission'
                      ? 'bg-sky-50/50 border-sky-200'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{unit.vehicleNumber}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      unit.status === 'Available'
                        ? 'bg-emerald-100 text-emerald-800'
                        : unit.status === 'On Mission'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {unit.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600">
                    Driver: <strong>{unit.driverName}</strong> • {unit.type}
                  </p>
                  <p className="text-[10px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>Stationed: {unit.currentArea}</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 italic pt-1">
              * Mock GPS location simulation for hackathon demonstration.
            </p>
          </div>
        </div>

      </div>

      {/* Ambulance Requests History / Live Tracking Cards */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-slate-600" />
          <span>Your Ambulance Dispatches</span>
        </h3>

        {userRequests.length === 0 ? (
          <p className="text-xs text-slate-500 py-4 text-center">
            No ambulance dispatches requested yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userRequests.map(req => (
              <div
                key={req.id}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {req.id}
                    </span>
                    <StatusBadge status={req.status} size="sm" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.emergencyPriority === 'Critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.emergencyPriority}
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-600">
                  <p>
                    <span className="text-slate-400">Pickup:</span>{' '}
                    <strong className="text-slate-800">{req.pickupLocation}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400">Destination:</span>{' '}
                    <strong className="text-slate-800">{req.destinationHospital}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400">Requested:</span>{' '}
                    <span>{new Date(req.requestedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </p>
                </div>

                {req.driverName && (
                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{req.driverName}</span>
                      <span className="font-mono text-sky-700 font-bold">{req.vehicleNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Phone: {req.driverPhone}</span>
                      {req.etaMinutes ? (
                        <span className="font-bold text-emerald-600">ETA ~{req.etaMinutes} mins</span>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {activeRequest && (
        <Modal
          isOpen={true}
          onClose={() => setActiveRequest(null)}
          title="Ambulance Dispatched!"
          subtitle="Priority emergency vehicle assigned."
          maxWidth="md"
        >
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <Truck className="w-8 h-8 animate-bounce" />
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500">Request Tracking ID</span>
              <p className="text-2xl font-mono font-extrabold text-rose-600 tracking-wider">
                {activeRequest.id}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <StatusBadge status={activeRequest.status} size="sm" />
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Priority:</span>
                <strong className="text-rose-700">{activeRequest.emergencyPriority}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup:</span>
                <strong className="text-slate-800 truncate max-w-[200px]">{activeRequest.pickupLocation}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <strong className="text-slate-800 truncate max-w-[200px]">{activeRequest.destinationHospital}</strong>
              </div>
              {activeRequest.driverName && (
                <div className="pt-2 border-t border-slate-200 flex justify-between">
                  <span className="text-slate-500">Driver & Vehicle:</span>
                  <span className="font-bold text-indigo-700">{activeRequest.driverName} ({activeRequest.vehicleNumber})</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveRequest(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Close & View Live Tracker
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};
