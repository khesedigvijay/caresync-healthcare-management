import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AmbulanceRequest, 
  BloodRequirementRequest, 
  AmbulanceStatus, 
  BloodRequestStatus,
  AmbulanceFleetUnit 
} from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { 
  ShieldAlert, 
  Truck, 
  Droplet, 
  Radio, 
  UserCheck, 
  PhoneCall, 
  MapPin, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export const AdminEmergencyView: React.FC = () => {
  const { 
    ambulanceRequests, 
    bloodRequests, 
    fleet, 
    updateAmbulanceStatus, 
    assignAmbulanceToRequest, 
    updateBloodRequestStatus 
  } = useApp();

  const [activeTab, setActiveTabState] = useState<'ambulance' | 'blood'>('ambulance');

  // Ambulance Assign Modal
  const [selectedAmbulanceReq, setSelectedAmbulanceReq] = useState<AmbulanceRequest | null>(null);
  const [selectedFleetId, setSelectedFleetId] = useState<string>('');

  // Status Change Dialog
  const [statusConfirmDialog, setStatusConfirmDialog] = useState<{
    type: 'ambulance' | 'blood';
    id: string;
    newStatus: string;
  } | null>(null);

  const handleOpenAssignModal = (req: AmbulanceRequest) => {
    setSelectedAmbulanceReq(req);
    const available = fleet.find(f => f.status === 'Available');
    setSelectedFleetId(available ? available.id : fleet[0]?.id || '');
  };

  const handleConfirmAssignment = () => {
    if (selectedAmbulanceReq && selectedFleetId) {
      assignAmbulanceToRequest(selectedAmbulanceReq.id, selectedFleetId);
      setSelectedAmbulanceReq(null);
    }
  };

  const handleExecuteStatusChange = () => {
    if (!statusConfirmDialog) return;
    if (statusConfirmDialog.type === 'ambulance') {
      updateAmbulanceStatus(statusConfirmDialog.id, statusConfirmDialog.newStatus as AmbulanceStatus);
    } else {
      updateBloodRequestStatus(statusConfirmDialog.id, statusConfirmDialog.newStatus as BloodRequestStatus);
    }
    setStatusConfirmDialog(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-600 animate-pulse" />
            <span>Emergency Operations Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dispatch ambulance fleet units, monitor incoming patient SOS, and track blood bank fulfillments.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center">
          <button
            onClick={() => setActiveTabState('ambulance')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'ambulance'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Ambulance Dispatches ({ambulanceRequests.length})</span>
          </button>
          <button
            onClick={() => setActiveTabState('blood')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'blood'
                ? 'bg-red-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>Blood Requirements ({bloodRequests.length})</span>
          </button>
        </div>
      </div>

      {/* Fleet Standby Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
            <span>Pune Ambulance Fleet Standby Status</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-semibold">
            {fleet.filter(f => f.status === 'Available').length} Available • {fleet.filter(f => f.status === 'On Mission').length} On Mission
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {fleet.map(unit => (
            <div
              key={unit.id}
              className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                unit.status === 'Available'
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : unit.status === 'On Mission'
                  ? 'bg-sky-50/60 border-sky-300 ring-1 ring-sky-200'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-slate-900">{unit.vehicleNumber}</span>
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
              <p className="text-slate-700 font-medium">
                Driver: <strong>{unit.driverName}</strong>
              </p>
              <p className="text-[11px] text-slate-500">{unit.contactPhone}</p>
              <p className="text-[10px] text-slate-400">Hub: {unit.currentArea}</p>
            </div>
          ))}
        </div>
      </div>

      {activeTab === 'ambulance' ? (
        /* Ambulance Requests Table */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-rose-600" />
              <span>Incoming Ambulance Requests</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Real-time Triage</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Request ID</th>
                  <th className="py-3 px-4">Patient & Phone</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Pickup Point</th>
                  <th className="py-3 px-4">Hospital Destination</th>
                  <th className="py-3 px-4">Vehicle Assigned</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Dispatch Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ambulanceRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {req.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{req.patientName}</p>
                      <p className="text-[11px] text-slate-500">{req.contactNumber}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={req.emergencyPriority} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-700">
                      {req.pickupLocation}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-700">
                      {req.destinationHospital}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {req.vehicleNumber ? (
                        <div>
                          <span className="font-bold text-sky-800">{req.vehicleNumber}</span>
                          <span className="block text-[10px] text-slate-500 font-sans">{req.driverName}</span>
                        </div>
                      ) : (
                        <span className="text-amber-700 italic text-[11px]">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={req.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {!req.assignedAmbulanceId && req.status !== 'Completed' && req.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleOpenAssignModal(req)}
                            className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-[11px] transition-colors shadow-2xs"
                          >
                            Assign Unit
                          </button>
                        )}

                        {req.status === 'Ambulance Assigned' && (
                          <button
                            onClick={() => setStatusConfirmDialog({
                              type: 'ambulance',
                              id: req.id,
                              newStatus: 'On the Way',
                            })}
                            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-lg text-[11px] transition-colors"
                          >
                            Mark En Route
                          </button>
                        )}

                        {req.status === 'On the Way' && (
                          <button
                            onClick={() => setStatusConfirmDialog({
                              type: 'ambulance',
                              id: req.id,
                              newStatus: 'Completed',
                            })}
                            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-lg text-[11px] transition-colors"
                          >
                            Mark Completed
                          </button>
                        )}

                        {req.status !== 'Completed' && req.status !== 'Cancelled' && (
                          <button
                            onClick={() => setStatusConfirmDialog({
                              type: 'ambulance',
                              id: req.id,
                              newStatus: 'Cancelled',
                            })}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-[11px] transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Blood Requests Table */
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-red-600" />
              <span>Broadcast Blood Requirements</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Pune Coordination Grid</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Request ID</th>
                  <th className="py-3 px-4">Requester Name</th>
                  <th className="py-3 px-4">Blood Group</th>
                  <th className="py-3 px-4">Units Needed</th>
                  <th className="py-3 px-4">Hospital Destination</th>
                  <th className="py-3 px-4">Urgency</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Coordination Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bloodRequests.map(req => (
                  <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">
                      {req.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{req.requesterName}</p>
                      <p className="text-[11px] text-slate-500">{req.contactNumber}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm font-black text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {req.units} {req.units === 1 ? 'Unit' : 'Units'}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate text-slate-700">
                      {req.hospital} ({req.location})
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        req.urgency === 'Immediate'
                          ? 'bg-rose-100 text-rose-800'
                          : req.urgency === 'Urgent'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {req.urgency}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={req.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {req.status === 'Submitted' && (
                          <button
                            onClick={() => setStatusConfirmDialog({
                              type: 'blood',
                              id: req.id,
                              newStatus: 'Searching',
                            })}
                            className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold rounded text-[11px]"
                          >
                            Set Searching
                          </button>
                        )}
                        {req.status === 'Searching' && (
                          <button
                            onClick={() => setStatusConfirmDialog({
                              type: 'blood',
                              id: req.id,
                              newStatus: 'Matched',
                            })}
                            className="px-2 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold rounded text-[11px]"
                          >
                            Set Matched
                          </button>
                        )}
                        {req.status === 'Matched' && (
                          <button
                            onClick={() => setStatusConfirmDialog({
                              type: 'blood',
                              id: req.id,
                              newStatus: 'Fulfilled',
                            })}
                            className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded text-[11px]"
                          >
                            Set Fulfilled
                          </button>
                        )}
                        {req.status !== 'Closed' && (
                          <button
                            onClick={() => setStatusConfirmDialog({
                              type: 'blood',
                              id: req.id,
                              newStatus: 'Closed',
                            })}
                            className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded text-[11px]"
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Assign Ambulance Modal */}
      {selectedAmbulanceReq && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedAmbulanceReq(null)}
          title={`Assign Ambulance Fleet to ${selectedAmbulanceReq.id}`}
          subtitle={`Pickup: ${selectedAmbulanceReq.pickupLocation}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Select an available ambulance unit from the Pune dispatch fleet. The driver will be automatically coordinated and provided navigation routes.
            </p>

            <div className="space-y-2">
              <label className="block font-bold text-slate-900 uppercase tracking-wider">
                Select Fleet Unit:
              </label>

              <div className="space-y-2">
                {fleet.map(unit => (
                  <label
                    key={unit.id}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedFleetId === unit.id
                        ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-200'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="fleetUnit"
                        value={unit.id}
                        checked={selectedFleetId === unit.id}
                        onChange={() => setSelectedFleetId(unit.id)}
                        className="text-sky-600 focus:ring-sky-500"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{unit.vehicleNumber} ({unit.driverName})</p>
                        <p className="text-[11px] text-slate-500">{unit.type} • Hub: {unit.currentArea}</p>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      unit.status === 'Available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {unit.status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAmbulanceReq(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAssignment}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-2xs"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Dialog */}
      {statusConfirmDialog && (
        <ConfirmDialog
          isOpen={true}
          onClose={() => setStatusConfirmDialog(null)}
          onConfirm={handleExecuteStatusChange}
          title="Update Emergency Request Status?"
          message={`Are you sure you want to mark ${statusConfirmDialog.type} request ${statusConfirmDialog.id} as "${statusConfirmDialog.newStatus}"? This will alert the requester and hospital casualties.`}
          confirmText="Confirm Status Update"
          type="warning"
        />
      )}

    </div>
  );
};
