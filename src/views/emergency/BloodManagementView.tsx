import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BloodGroup, BloodBank, BloodRequirementRequest } from '../../types';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import { 
  Droplet, 
  Search, 
  MapPin, 
  PhoneCall, 
  AlertCircle, 
  Clock, 
  PlusCircle, 
  CheckCircle2, 
  Building2, 
  ShieldCheck,
  Send,
  Users
} from 'lucide-react';

export const BloodManagementView: React.FC = () => {
  const { 
    bloodBanks, 
    bloodRequests, 
    submitBloodRequest, 
    currentPatientProfile, 
    currentUser 
  } = useApp();

  const [activeTab, setActiveTabState] = useState<'search' | 'request'>('search');

  // Blood Search Filters
  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O+');
  const [selectedArea, setSelectedArea] = useState<string>('All Areas');
  const [searchQuery, setSearchQuery] = useState('');

  // Blood Requirement Form
  const [requesterName, setRequesterName] = useState(currentPatientProfile?.fullName || currentUser?.name || '');
  const [reqBloodGroup, setReqBloodGroup] = useState<BloodGroup>('O+');
  const [units, setUnits] = useState(2);
  const [location, setLocation] = useState('Deccan / Karve Road, Pune');
  const [hospital, setHospital] = useState('Pune Central Hospital');
  const [contactNumber, setContactNumber] = useState(currentPatientProfile?.phone || '+91 98220 14892');
  const [urgency, setUrgency] = useState<'Normal' | 'Urgent' | 'Immediate'>('Urgent');
  const [requiredDate, setRequiredDate] = useState(new Date().toISOString().split('T')[0]);

  // Confirmation modal
  const [submittedReq, setSubmittedReq] = useState<BloodRequirementRequest | null>(null);

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const puneAreas = ['All Areas', 'Swargate', 'Pune Station', 'Kothrud', 'Camp', 'Sadashiv Peth'];

  const filteredBanks = bloodBanks.filter(bank => {
    if (selectedArea !== 'All Areas') {
      if (!bank.area.toLowerCase().includes(selectedArea.toLowerCase())) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!bank.name.toLowerCase().includes(q) && !bank.location.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const req = submitBloodRequest({
      requesterName,
      bloodGroup: reqBloodGroup,
      units,
      location,
      hospital,
      contactNumber,
      urgency,
      requiredDate,
    });
    setSubmittedReq(req);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Droplet className="w-6 h-6 text-rose-600 fill-rose-600" />
            <span>Blood Inventory Search & Requirement Dispatch</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Search verified Pune blood banks or broadcast urgent patient blood requirements.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center">
          <button
            onClick={() => setActiveTabState('search')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'search'
                ? 'bg-white text-rose-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Blood Bank Directory</span>
          </button>
          <button
            onClick={() => setActiveTabState('request')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'request'
                ? 'bg-rose-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report Requirement</span>
          </button>
        </div>
      </div>

      {/* Mandatory Disclaimer Box */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Disclaimer on Blood Stock:</strong> Data displayed represents demo/mock coordination data for Pune healthcare networks. Always call the blood bank helpline directly to verify available testing cross-match and physical unit counts before travelling.
        </div>
      </div>

      {activeTab === 'search' ? (
        <div className="space-y-6">
          
          {/* Blood Group Quick Buttons */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              Select Required Blood Group
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {bloodGroups.map(bg => (
                <button
                  key={bg}
                  onClick={() => setSelectedGroup(bg)}
                  className={`py-2.5 rounded-xl font-extrabold text-sm transition-all flex flex-col items-center justify-center ${
                    selectedGroup === bg
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20 scale-105 ring-2 ring-rose-300'
                      : 'bg-slate-50 text-slate-700 hover:bg-rose-50 hover:text-rose-700 border border-slate-200'
                  }`}
                >
                  <Droplet className="w-4 h-4 mb-0.5" />
                  <span>{bg}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Area Filter & Search */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-slate-500 mr-1">Area:</span>
              {puneAreas.map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedArea === area
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search blood bank..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Blood Banks Results Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBanks.map(bank => {
              const stock = bank.inventory[selectedGroup];
              const isAvailable = stock?.status === 'In Stock';
              const isLow = stock?.status === 'Low Stock';

              return (
                <div
                  key={bank.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 text-base">
                            {bank.name}
                          </h3>
                          {bank.verified && (
                            <span title="Verified Govt/Red Cross Centre">
                              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{bank.location}, Pune - {bank.pincode}</span>
                        </p>
                      </div>

                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg shrink-0">
                        {bank.distance}
                      </span>
                    </div>

                    {/* Stock pill for currently selected group */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-extrabold text-sm">
                          {selectedGroup}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            Available: {stock ? `${stock.availableUnits} Units` : 'Check Helpline'}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Updated: {bank.lastUpdated}
                          </p>
                        </div>
                      </div>

                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : isLow
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {stock ? stock.status : 'Inquire'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      Helpline: {bank.emergencyHelpline}
                    </span>

                    <a
                      href={`tel:${bank.contact.replace(/\s+/g, '')}`}
                      className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Bank</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        /* Report Blood Requirement Tab */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <form onSubmit={handleRequestSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6">
            
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900">
                Submit Urgent Blood Requirement
              </h2>
              <p className="text-xs text-slate-500">
                Broadcast patient blood needs to nearby blood banks and registered voluntary coordination desks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Requester / Patient Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={requesterName}
                  onChange={e => setRequesterName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  placeholder="e.g. Aarav Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone Number <span className="text-rose-500">*</span>
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Blood Group <span className="text-rose-500">*</span>
                </label>
                <select
                  value={reqBloodGroup}
                  onChange={e => setReqBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-3.5 py-2.5 text-xs font-bold text-rose-700 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                >
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Units Required <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  required
                  value={units}
                  onChange={e => setUnits(parseInt(e.target.value) || 1)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Hospital / Clinic Destination <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={hospital}
                  onChange={e => setHospital(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  placeholder="e.g. Pune Central Hospital"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Area / City Location in Pune <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                  placeholder="e.g. Deccan / Karve Road"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Urgency Level <span className="text-rose-500">*</span>
                </label>
                <select
                  value={urgency}
                  onChange={e => setUrgency(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                >
                  <option value="Normal">Normal (Within 24 Hours)</option>
                  <option value="Urgent">Urgent (Within 4-6 Hours)</option>
                  <option value="Immediate">Immediate / Emergency (Surgery)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Required Date <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={requiredDate}
                  onChange={e => setRequiredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-medium border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit & Generate Blood Request ID</span>
              </button>
            </div>

          </form>

          {/* Blood Requests History */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-rose-600" />
                <span>Active Blood Inquiries ({bloodRequests.length})</span>
              </h3>

              <div className="space-y-3">
                {bloodRequests.map(req => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {req.id}
                      </span>
                      <StatusBadge status={req.status} size="sm" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-rose-700 text-sm">
                        {req.bloodGroup} • {req.units} {req.units === 1 ? 'Unit' : 'Units'}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        Urgency: {req.urgency}
                      </span>
                    </div>

                    <p className="text-slate-600">
                      Hospital: <strong>{req.hospital}</strong> ({req.location})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Confirmation Modal */}
      {submittedReq && (
        <Modal
          isOpen={true}
          onClose={() => setSubmittedReq(null)}
          title="Blood Requirement Broadcasted!"
          subtitle="Your request has been logged in the Pune emergency network."
          maxWidth="md"
        >
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
              <Droplet className="w-8 h-8 fill-rose-600" />
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-500">Blood Request ID</span>
              <p className="text-2xl font-mono font-extrabold text-rose-600 tracking-wider">
                {submittedReq.id}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 text-left text-xs space-y-2 border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Required:</span>
                <span className="font-bold text-rose-700">{submittedReq.units} Units of {submittedReq.bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hospital:</span>
                <span className="font-semibold text-slate-800">{submittedReq.hospital}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Urgency:</span>
                <strong className="text-rose-700">{submittedReq.urgency}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Initial Status:</span>
                <StatusBadge status={submittedReq.status} size="sm" />
              </div>
            </div>

            <button
              onClick={() => setSubmittedReq(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              Done & View Active Requests
            </button>
          </div>
        </Modal>
      )}

    </div>
  );
};
