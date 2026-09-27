export type UserRole = 'patient' | 'admin';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type AppointmentStatus = 'Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'No-show';

export type AppointmentReasonCategory = 
  | 'Routine Checkup'
  | 'Follow-up Consultation'
  | 'General Consultation'
  | 'Vaccination Review'
  | 'Preventive Health Check'
  | 'Administrative Certificate';

export type EmergencyPriority = 'Normal' | 'Urgent' | 'Critical';

export type AmbulanceStatus = 
  | 'Requested'
  | 'Searching'
  | 'Ambulance Assigned'
  | 'On the Way'
  | 'Completed'
  | 'Cancelled';

export type BloodRequestStatus = 
  | 'Submitted'
  | 'Searching'
  | 'Matched'
  | 'Fulfilled'
  | 'Closed';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  clinicName?: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  bloodGroup: BloodGroup;
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  registeredDate: string;
  status: 'Active' | 'Inactive';
}

export interface Clinic {
  id: string;
  name: string;
  tagline: string;
  address: string;
  area: string;
  city: string;
  phone: string;
  departments: string[];
  doctors: { name: string; department: string; experience: string }[];
  emergencyAvailable: boolean;
  rating: number;
  openingHours: string;
  consultationFee: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  clinicId: string;
  clinicName: string;
  doctorName: string;
  department: string;
  date: string;
  timeSlot: string;
  reasonCategory: AppointmentReasonCategory;
  contactNumber: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface AmbulanceRequest {
  id: string;
  patientId: string;
  patientName: string;
  contactNumber: string;
  pickupLocation: string;
  destinationHospital: string;
  emergencyPriority: EmergencyPriority;
  passengerCount: number;
  coordinationNote: string;
  status: AmbulanceStatus;
  assignedAmbulanceId?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
  etaMinutes?: number;
  requestedAt: string;
  updatedAt: string;
}

export interface AmbulanceFleetUnit {
  id: string;
  vehicleNumber: string;
  driverName: string;
  contactPhone: string;
  currentArea: string;
  status: 'Available' | 'On Mission' | 'Maintenance';
  type: 'Basic Life Support (BLS)' | 'Advanced Life Support (ALS)';
  lastLocationUpdate: string;
}

export interface BloodBank {
  id: string;
  name: string;
  location: string;
  area: string;
  city: string;
  pincode: string;
  contact: string;
  emergencyHelpline: string;
  lastUpdated: string;
  inventory: Record<BloodGroup, { availableUnits: number; status: 'In Stock' | 'Low Stock' | 'Critical Shortage' }>;
  distance: string;
  verified: boolean;
}

export interface BloodRequirementRequest {
  id: string;
  patientId: string;
  requesterName: string;
  bloodGroup: BloodGroup;
  units: number;
  location: string;
  hospital: string;
  contactNumber: string;
  urgency: 'Normal' | 'Urgent' | 'Immediate';
  requiredDate: string;
  status: BloodRequestStatus;
  createdAt: string;
  updatedAt: string;
}

export interface HealthcareFacility {
  id: string;
  name: string;
  type: 'Hospital' | 'Clinic' | 'Trauma & Emergency Center' | 'Daycare & Diagnostic';
  location: string;
  area: string;
  city: string;
  phone: string;
  emergencyAvailable: boolean;
  distance: string;
  isOpen: boolean;
  timing: string;
  consultationFee: number;
  totalBeds?: number;
  availableBeds?: number;
  coordinates?: { x: number; y: number }; // Percentage for visual radar map
}

export interface NotificationItem {
  id: string;
  userId?: string; // target user or 'all'
  roleTarget?: UserRole | 'all';
  title: string;
  message: string;
  type: 'appointment' | 'ambulance' | 'blood' | 'system' | 'emergency';
  read: boolean;
  timestamp: string;
  linkTab?: string;
}
