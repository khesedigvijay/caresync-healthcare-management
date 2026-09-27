import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HealthcareFacility } from '../../types';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Search, 
  Filter, 
  ShieldAlert, 
  Clock, 
  Bed, 
  ExternalLink, 
  Compass, 
  Map, 
  Grid,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export const HealthcareFacilitiesView: React.FC = () => {
  const { facilities, setActiveTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [selectedFacility, setSelectedFacility] = useState<HealthcareFacility | null>(null);

  const types = ['All', 'Hospital', 'Clinic', 'Trauma & Emergency Center', 'Daycare & Diagnostic'];

  const filteredFacilities = facilities.filter(fac => {
    if (selectedType !== 'All' && fac.type !== selectedType) return false;
    if (emergencyOnly && !fac.emergencyAvailable) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = fac.name.toLowerCase().includes(q);
      const matchArea = fac.area.toLowerCase().includes(q);
      const matchLoc = fac.location.toLowerCase().includes(q);
      return matchName || matchArea || matchLoc;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-sky-600" />
            <span>Nearby Healthcare Facilities Directory</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse verified emergency trauma units, primary clinics, and day-care centers in Pune.
          </p>
        </div>

        {/* View Switcher: Grid vs Map */}
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-white text-sky-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Card Grid</span>
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'map'
                ? 'bg-sky-600 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>Interactive Pune Map</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Type pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedType === t
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Emergency toggle & Search */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-rose-700 whitespace-nowrap bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-100 transition-colors">
            <input
              type="checkbox"
              checked={emergencyOnly}
              onChange={e => setEmergencyOnly(e.target.checked)}
              className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
            />
            <span>24/7 Emergency Only</span>
          </label>

          <div className="relative w-full md:w-60">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search facility name or area..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Interactive Map View */}
      {viewMode === 'map' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-600" />
                <span>Pune Healthcare Radar Map</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any hotspot pin to inspect facility emergency status and available casualty beds.
              </p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Center: Shivajinagar (Pune)</span>
          </div>

          {/* Interactive Map Visual Surface */}
          <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 rounded-xl overflow-hidden border border-slate-700 shadow-inner flex items-center justify-center p-4">
            
            {/* Grid overlay lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            
            {/* Central Radar Rings */}
            <div className="absolute w-72 h-72 rounded-full border border-sky-500/20" />
            <div className="absolute w-44 h-44 rounded-full border border-sky-500/30" />
            <div className="absolute w-16 h-16 rounded-full border border-sky-400/40" />
            
            {/* District Labels */}
            <span className="absolute top-4 left-6 text-[10px] font-bold text-slate-500 tracking-widest uppercase">North: Baner / Aundh</span>
            <span className="absolute bottom-4 left-6 text-[10px] font-bold text-slate-500 tracking-widest uppercase">West: Kothrud / Paud</span>
            <span className="absolute top-4 right-6 text-[10px] font-bold text-slate-500 tracking-widest uppercase">East: Viman Nagar / Nagar Rd</span>
            <span className="absolute bottom-4 right-6 text-[10px] font-bold text-slate-500 tracking-widest uppercase">South: Swargate / Katraj</span>

            {/* Pins on the Map */}
            {filteredFacilities.map(fac => {
              const coords = fac.coordinates || { x: 50, y: 50 };
              const isSelected = selectedFacility?.id === fac.id;

              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  <div className="relative flex items-center justify-center">
                    {fac.emergencyAvailable && (
                      <span className="absolute w-7 h-7 rounded-full bg-rose-500/40 animate-ping" />
                    )}
                    <div className={`p-2 rounded-full shadow-lg transition-transform group-hover:scale-125 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-300/50'
                        : fac.emergencyAvailable
                        ? 'bg-rose-600 text-white'
                        : 'bg-sky-500 text-white'
                    }`}>
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Tooltip Label */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 shadow-md">
                    {fac.name} ({fac.distance})
                  </div>
                </div>
              );
            })}

            {/* Selected Facility Overlay Floating Card */}
            {selectedFacility && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-200 z-30 max-w-sm w-full text-slate-900 text-xs space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{selectedFacility.name}</h4>
                    <p className="text-slate-500">{selectedFacility.location}, Pune</p>
                  </div>
                  <button
                    onClick={() => setSelectedFacility(null)}
                    className="text-slate-400 hover:text-slate-600 text-sm font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                  <span className="font-bold text-teal-700">{selectedFacility.distance}</span>
                  <span>Fee: ₹{selectedFacility.consultationFee}</span>
                  {selectedFacility.emergencyAvailable ? (
                    <span className="font-bold text-rose-600">24/7 Emergency</span>
                  ) : (
                    <span className="text-slate-500">Day Clinic</span>
                  )}
                </div>

                <a
                  href={`tel:${selectedFacility.phone.replace(/\s+/g, '')}`}
                  className="mt-2 w-full py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call {selectedFacility.phone}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid of Facility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFacilities.map(fac => (
          <div
            key={fac.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Type and Emergency Pill */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {fac.type}
                </span>

                {fac.emergencyAvailable ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    <ShieldAlert className="w-3 h-3 text-rose-600" />
                    <span>24/7 Emergency</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">
                    <span>OPD Only</span>
                  </span>
                )}
              </div>

              {/* Name and Location */}
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {fac.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{fac.location}, {fac.area}</span>
                </p>
              </div>

              {/* Timing & Distance Bar */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{fac.timing}</span>
                  </span>
                  <span className={`text-[11px] font-bold ${fac.isOpen ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {fac.isOpen ? '● Open Now' : '○ Closed'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                  <span>Distance: <strong className="text-slate-800">{fac.distance}</strong></span>
                  <span>Consult Fee: <strong className="text-slate-800">₹{fac.consultationFee}</strong></span>
                </div>

                {fac.totalBeds && (
                  <div className="flex items-center gap-1 pt-1 border-t border-slate-200/60 text-[11px] text-teal-800 font-semibold">
                    <Bed className="w-3.5 h-3.5 text-teal-600" />
                    <span>ICU/Casualty Beds: {fac.availableBeds} / {fac.totalBeds} Available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
              <span className="text-xs font-mono text-slate-600">
                {fac.phone}
              </span>

              <a
                href={`tel:${fac.phone.replace(/\s+/g, '')}`}
                className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Facility</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
