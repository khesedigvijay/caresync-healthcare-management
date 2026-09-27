import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  PatientProfile,
  Clinic,
  Appointment,
  AmbulanceRequest,
  AmbulanceFleetUnit,
  BloodBank,
  BloodRequirementRequest,
  HealthcareFacility,
  NotificationItem,
  AppointmentStatus,
  AmbulanceStatus,
  BloodRequestStatus,
  BloodGroup,
  EmergencyPriority,
  AppointmentReasonCategory,
} from '../types';
import {
  DEMO_PATIENT_USER,
  DEMO_ADMIN_USER,
  INITIAL_PATIENTS,
  CLINICS_LIST,
  INITIAL_APPOINTMENTS,
  INITIAL_FLEET,
  INITIAL_AMBULANCE_REQUESTS,
  BLOOD_BANKS_LIST,
  INITIAL_BLOOD_REQUESTS,
  HEALTHCARE_FACILITIES_LIST,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface AppContextType {
  // Auth & Roles
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAsDemoPatient: () => void;
  loginAsDemoAdmin: () => void;
  loginUser: (email: string, role: UserRole) => boolean;
  registerUser: (name: string, email: string, phone: string, role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;

  // Active view navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Patient Profile
  currentPatientProfile: PatientProfile | null;
  updatePatientProfile: (updated: Partial<PatientProfile>) => void;
  patients: PatientProfile[];
  addNewPatient: (patient: Omit<PatientProfile, 'id' | 'registeredDate'>) => PatientProfile;

  // Clinics
  clinics: Clinic[];

  // Appointments
  appointments: Appointment[];
  bookAppointment: (data: {
    clinicId: string;
    doctorName: string;
    department: string;
    date: string;
    timeSlot: string;
    reasonCategory: AppointmentReasonCategory;
    contactNumber: string;
    notes?: string;
  }) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  cancelAppointment: (id: string) => void;

  // Ambulance
  ambulanceRequests: AmbulanceRequest[];
  fleet: AmbulanceFleetUnit[];
  requestAmbulance: (data: {
    patientName: string;
    contactNumber: string;
    pickupLocation: string;
    destinationHospital: string;
    emergencyPriority: EmergencyPriority;
    passengerCount: number;
    coordinationNote: string;
  }) => AmbulanceRequest;
  updateAmbulanceStatus: (id: string, status: AmbulanceStatus) => void;
  assignAmbulanceToRequest: (requestId: string, fleetId: string) => void;

  // Blood
  bloodBanks: BloodBank[];
  bloodRequests: BloodRequirementRequest[];
  submitBloodRequest: (data: {
    requesterName: string;
    bloodGroup: BloodGroup;
    units: number;
    location: string;
    hospital: string;
    contactNumber: string;
    urgency: 'Normal' | 'Urgent' | 'Immediate';
    requiredDate: string;
  }) => BloodRequirementRequest;
  updateBloodRequestStatus: (id: string, status: BloodRequestStatus) => void;

  // Facilities
  facilities: HealthcareFacility[];

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadCount: number;

  // Toast / System feedback
  toastMessage: { text: string; type: 'success' | 'info' | 'error' | 'warning' } | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error' | 'warning') => void;
  clearToast: () => void;

  // Reset Demo Data
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'caresync_user',
  PATIENTS: 'caresync_patients',
  APPOINTMENTS: 'caresync_appointments',
  AMBULANCE_REQ: 'caresync_ambulance_requests',
  FLEET: 'caresync_fleet',
  BLOOD_REQ: 'caresync_blood_requests',
  NOTIFICATIONS: 'caresync_notifications',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Default to null so landing page shows first, with 1-click Demo buttons
    return null;
  });

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<string>('landing');

  // Sync active tab when user changes
  useEffect(() => {
    if (!currentUser) {
      if (activeTab !== 'landing' && activeTab !== 'emergency-center' && activeTab !== 'facilities' && activeTab !== 'blood-search') {
        setActiveTab('landing');
      }
    } else if (currentUser.role === 'admin') {
      if (['landing', 'my-appointments', 'patient-profile', 'book-appointment'].includes(activeTab)) {
        setActiveTab('admin-dashboard');
      }
    } else {
      if (['landing', 'admin-dashboard', 'admin-appointments', 'admin-patients', 'admin-emergency', 'admin-analytics'].includes(activeTab)) {
        setActiveTab('patient-dashboard');
      }
    }
  }, [currentUser]);

  // Patients
  const [patients, setPatients] = useState<PatientProfile[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  // Appointments
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  // Fleet
  const [fleet, setFleet] = useState<AmbulanceFleetUnit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FLEET);
    return saved ? JSON.parse(saved) : INITIAL_FLEET;
  });

  // Ambulance Requests
  const [ambulanceRequests, setAmbulanceRequests] = useState<AmbulanceRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AMBULANCE_REQ);
    return saved ? JSON.parse(saved) : INITIAL_AMBULANCE_REQUESTS;
  });

  // Blood Requests
  const [bloodRequests, setBloodRequests] = useState<BloodRequirementRequest[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BLOOD_REQ);
    return saved ? JSON.parse(saved) : INITIAL_BLOOD_REQUESTS;
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' | 'warning' = 'info') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(prev => (prev?.text === text ? null : prev));
    }, 4000);
  };

  const clearToast = () => setToastMessage(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FLEET, JSON.stringify(fleet));
  }, [fleet]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AMBULANCE_REQ, JSON.stringify(ambulanceRequests));
  }, [ambulanceRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOOD_REQ, JSON.stringify(bloodRequests));
  }, [bloodRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Derived current patient profile
  const currentPatientProfile = currentUser?.role === 'patient'
    ? patients.find(p => p.userId === currentUser.id) || patients[0]
    : null;

  // Auth actions
  const loginAsDemoPatient = () => {
    setCurrentUser(DEMO_PATIENT_USER);
    setActiveTab('patient-dashboard');
    showToast('Logged in as Demo Patient (Aarav Sharma)', 'success');
  };

  const loginAsDemoAdmin = () => {
    setCurrentUser(DEMO_ADMIN_USER);
    setActiveTab('admin-dashboard');
    showToast('Logged in as Demo Clinic Admin (Dr. Priya Nair)', 'success');
  };

  const loginUser = (email: string, role: UserRole): boolean => {
    if (role === 'admin') {
      const adminUser: User = {
        id: 'usr-admin-custom',
        name: email.split('@')[0].toUpperCase() + ' (Clinic Admin)',
        email,
        phone: '+91 98220 00000',
        role: 'admin',
        clinicName: 'City Care Clinic',
      };
      setCurrentUser(adminUser);
      setActiveTab('admin-dashboard');
      showToast('Clinic Admin logged in successfully', 'success');
      return true;
    } else {
      const existingPatient = patients.find(p => p.email.toLowerCase() === email.toLowerCase());
      const patientUser: User = {
        id: existingPatient ? existingPatient.userId : 'usr-pat-' + Date.now(),
        name: existingPatient ? existingPatient.fullName : email.split('@')[0],
        email,
        phone: existingPatient ? existingPatient.phone : '+91 98000 00000',
        role: 'patient',
      };
      setCurrentUser(patientUser);
      setActiveTab('patient-dashboard');
      showToast('Welcome back, ' + patientUser.name, 'success');
      return true;
    }
  };

  const registerUser = (name: string, email: string, phone: string, role: UserRole) => {
    const newId = 'usr-' + Date.now();
    const newUser: User = {
      id: newId,
      name,
      email,
      phone,
      role,
      clinicName: role === 'admin' ? 'City Care Clinic' : undefined,
    };

    if (role === 'patient') {
      const newProfile: PatientProfile = {
        id: 'pat-' + Date.now(),
        userId: newId,
        fullName: name,
        age: 28,
        gender: 'Male',
        phone,
        email,
        address: 'Pune, Maharashtra',
        bloodGroup: 'B+',
        emergencyContact: {
          name: 'Family Contact',
          phone,
          relation: 'Emergency Contact',
        },
        registeredDate: new Date().toISOString().split('T')[0],
        status: 'Active',
      };
      setPatients(prev => [newProfile, ...prev]);
    }

    setCurrentUser(newUser);
    setActiveTab(role === 'admin' ? 'admin-dashboard' : 'patient-dashboard');
    showToast(`Account created successfully as ${role === 'admin' ? 'Clinic Staff' : 'Patient'}!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveTab('landing');
    showToast('Signed out of CareSync', 'info');
  };

  const switchRole = (newRole: UserRole) => {
    if (newRole === 'admin') {
      setCurrentUser(DEMO_ADMIN_USER);
      setActiveTab('admin-dashboard');
      showToast('Switched to Clinic Admin view', 'info');
    } else {
      setCurrentUser(DEMO_PATIENT_USER);
      setActiveTab('patient-dashboard');
      showToast('Switched to Patient view', 'info');
    }
  };

  // Patient Profile updates
  const updatePatientProfile = (updated: Partial<PatientProfile>) => {
    if (!currentPatientProfile) return;
    setPatients(prev =>
      prev.map(p => (p.id === currentPatientProfile.id ? { ...p, ...updated } : p))
    );
    showToast('Profile information updated', 'success');
  };

  const addNewPatient = (data: Omit<PatientProfile, 'id' | 'registeredDate'>) => {
    const newPatient: PatientProfile = {
      ...data,
      id: 'pat-' + Date.now(),
      registeredDate: new Date().toISOString().split('T')[0],
    };
    setPatients(prev => [newPatient, ...prev]);
    showToast(`Patient ${newPatient.fullName} registered successfully`, 'success');
    return newPatient;
  };

  // Appointment actions
  const bookAppointment = (data: {
    clinicId: string;
    doctorName: string;
    department: string;
    date: string;
    timeSlot: string;
    reasonCategory: AppointmentReasonCategory;
    contactNumber: string;
    notes?: string;
  }) => {
    const clinic = CLINICS_LIST.find(c => c.id === data.clinicId) || CLINICS_LIST[0];
    const aptNumber = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: Appointment = {
      id: `APT-${aptNumber}`,
      patientId: currentPatientProfile?.id || 'pat-101',
      patientName: currentPatientProfile?.fullName || currentUser?.name || 'Walk-in Patient',
      patientPhone: data.contactNumber,
      clinicId: clinic.id,
      clinicName: clinic.name,
      doctorName: data.doctorName,
      department: data.department,
      date: data.date,
      timeSlot: data.timeSlot,
      reasonCategory: data.reasonCategory,
      contactNumber: data.contactNumber,
      status: 'Confirmed', // small clinics confirm instant slots
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
    };

    setAppointments(prev => [newAppointment, ...prev]);

    // Push notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      roleTarget: 'all',
      title: 'Appointment Booked (' + newAppointment.id + ')',
      message: `Appointment with ${newAppointment.doctorName} at ${newAppointment.clinicName} on ${newAppointment.date} (${newAppointment.timeSlot}) confirmed.`,
      type: 'appointment',
      read: false,
      timestamp: 'Just now',
      linkTab: 'my-appointments',
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Appointment ${newAppointment.id} confirmed!`, 'success');
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status } : apt))
    );
    // Notification
    const apt = appointments.find(a => a.id === id);
    if (apt) {
      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now(),
        roleTarget: 'patient',
        title: `Appointment ${status}`,
        message: `Appointment ${apt.id} with ${apt.doctorName} has been marked as ${status}.`,
        type: 'appointment',
        read: false,
        timestamp: 'Just now',
        linkTab: 'my-appointments',
      };
      setNotifications(prev => [newNotif, ...prev]);
    }
    showToast(`Appointment ${id} status updated to ${status}`, 'info');
  };

  const cancelAppointment = (id: string) => {
    updateAppointmentStatus(id, 'Cancelled');
  };

  // Ambulance actions
  const requestAmbulance = (data: {
    patientName: string;
    contactNumber: string;
    pickupLocation: string;
    destinationHospital: string;
    emergencyPriority: EmergencyPriority;
    passengerCount: number;
    coordinationNote: string;
  }) => {
    const ambNumber = Math.floor(1000 + Math.random() * 9000);
    // Auto find an available fleet unit for demo realism
    const availableUnit = fleet.find(f => f.status === 'Available');

    const newRequest: AmbulanceRequest = {
      id: `AMB-${ambNumber}`,
      patientId: currentPatientProfile?.id || 'pat-101',
      patientName: data.patientName,
      contactNumber: data.contactNumber,
      pickupLocation: data.pickupLocation,
      destinationHospital: data.destinationHospital,
      emergencyPriority: data.emergencyPriority,
      passengerCount: data.passengerCount,
      coordinationNote: data.coordinationNote,
      status: availableUnit ? 'Ambulance Assigned' : 'Searching',
      assignedAmbulanceId: availableUnit?.id,
      driverName: availableUnit?.driverName,
      driverPhone: availableUnit?.contactPhone,
      vehicleNumber: availableUnit?.vehicleNumber,
      etaMinutes: availableUnit ? Math.floor(5 + Math.random() * 8) : undefined,
      requestedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (availableUnit) {
      setFleet(prev =>
        prev.map(f => (f.id === availableUnit.id ? { ...f, status: 'On Mission' } : f))
      );
    }

    setAmbulanceRequests(prev => [newRequest, ...prev]);

    // Push notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      roleTarget: 'all',
      title: `Emergency Ambulance Dispatched (${newRequest.id})`,
      message: availableUnit
        ? `Unit ${availableUnit.vehicleNumber} (${availableUnit.driverName}) assigned to pickup at ${data.pickupLocation}. ETA: ${newRequest.etaMinutes} mins.`
        : `Ambulance request ${newRequest.id} broadcast to Pune dispatch network. Searching closest unit.`,
      type: 'ambulance',
      read: false,
      timestamp: 'Just now',
      linkTab: 'ambulance',
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Ambulance Request ${newRequest.id} submitted! Priority: ${data.emergencyPriority}`, 'success');
    return newRequest;
  };

  const updateAmbulanceStatus = (id: string, status: AmbulanceStatus) => {
    setAmbulanceRequests(prev =>
      prev.map(req => {
        if (req.id === id) {
          return { ...req, status, updatedAt: new Date().toISOString() };
        }
        return req;
      })
    );

    // Free up fleet unit if completed or cancelled
    if (status === 'Completed' || status === 'Cancelled') {
      const req = ambulanceRequests.find(r => r.id === id);
      if (req?.assignedAmbulanceId) {
        setFleet(prev =>
          prev.map(f => (f.id === req.assignedAmbulanceId ? { ...f, status: 'Available' } : f))
        );
      }
    }

    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      roleTarget: 'all',
      title: `Ambulance ${id} Update`,
      message: `Ambulance request ${id} status changed to ${status}.`,
      type: 'ambulance',
      read: false,
      timestamp: 'Just now',
      linkTab: 'ambulance',
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Ambulance request ${id} is now ${status}`, 'info');
  };

  const assignAmbulanceToRequest = (requestId: string, fleetId: string) => {
    const selectedUnit = fleet.find(f => f.id === fleetId);
    if (!selectedUnit) return;

    setAmbulanceRequests(prev =>
      prev.map(req => {
        if (req.id === requestId) {
          return {
            ...req,
            status: 'Ambulance Assigned',
            assignedAmbulanceId: selectedUnit.id,
            driverName: selectedUnit.driverName,
            driverPhone: selectedUnit.contactPhone,
            vehicleNumber: selectedUnit.vehicleNumber,
            etaMinutes: Math.floor(6 + Math.random() * 8),
            updatedAt: new Date().toISOString(),
          };
        }
        return req;
      })
    );

    setFleet(prev =>
      prev.map(f => (f.id === fleetId ? { ...f, status: 'On Mission' } : f))
    );

    showToast(`Assigned ${selectedUnit.vehicleNumber} (${selectedUnit.driverName}) to ${requestId}`, 'success');
  };

  // Blood Actions
  const submitBloodRequest = (data: {
    requesterName: string;
    bloodGroup: BloodGroup;
    units: number;
    location: string;
    hospital: string;
    contactNumber: string;
    urgency: 'Normal' | 'Urgent' | 'Immediate';
    requiredDate: string;
  }) => {
    const blNumber = Math.floor(2000 + Math.random() * 8000);
    const newReq: BloodRequirementRequest = {
      id: `BL-${blNumber}`,
      patientId: currentPatientProfile?.id || 'pat-101',
      requesterName: data.requesterName,
      bloodGroup: data.bloodGroup,
      units: data.units,
      location: data.location,
      hospital: data.hospital,
      contactNumber: data.contactNumber,
      urgency: data.urgency,
      requiredDate: data.requiredDate,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBloodRequests(prev => [newReq, ...prev]);

    // Push notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      roleTarget: 'all',
      title: `Blood Requirement Posted (${newReq.id})`,
      message: `Urgent requirement for ${data.units} unit(s) of ${data.bloodGroup} at ${data.hospital} (${data.location}) submitted.`,
      type: 'blood',
      read: false,
      timestamp: 'Just now',
      linkTab: 'blood',
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast(`Blood request ${newReq.id} submitted successfully!`, 'success');
    return newReq;
  };

  const updateBloodRequestStatus = (id: string, status: BloodRequestStatus) => {
    setBloodRequests(prev =>
      prev.map(b => (b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b))
    );
    showToast(`Blood Request ${id} status updated to ${status}`, 'info');
  };

  // Notifications
  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const unreadCount = notifications.filter(n => {
    if (n.read) return false;
    if (!currentUser) return true;
    if (n.roleTarget === 'all') return true;
    return n.roleTarget === currentUser.role;
  }).length;

  // Reset Demo Data
  const resetAllDemoData = () => {
    setPatients(INITIAL_PATIENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setFleet(INITIAL_FLEET);
    setAmbulanceRequests(INITIAL_AMBULANCE_REQUESTS);
    setBloodRequests(INITIAL_BLOOD_REQUESTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    localStorage.clear();
    showToast('All demo data has been reset to defaults', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        loginAsDemoPatient,
        loginAsDemoAdmin,
        loginUser,
        registerUser,
        logout,
        switchRole,

        activeTab,
        setActiveTab,

        currentPatientProfile,
        updatePatientProfile,
        patients,
        addNewPatient,

        clinics: CLINICS_LIST,

        appointments,
        bookAppointment,
        updateAppointmentStatus,
        cancelAppointment,

        ambulanceRequests,
        fleet,
        requestAmbulance,
        updateAmbulanceStatus,
        assignAmbulanceToRequest,

        bloodBanks: BLOOD_BANKS_LIST,
        bloodRequests,
        submitBloodRequest,
        updateBloodRequestStatus,

        facilities: HEALTHCARE_FACILITIES_LIST,

        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,

        toastMessage,
        showToast,
        clearToast,

        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
