# CareSync – Clinic Appointment & Emergency Management System

> **“One platform for appointments, patients & emergency coordination.”**

CareSync is a modern, responsive healthcare coordination web application built for small community clinics and outpatient polyclinics. It streamlines primary care appointment scheduling, administrative patient records, priority ambulance dispatch, blood bank availability search, and emergency trauma facility discovery from a single interface.

---

## ⚠️ Important Safety Notice
**Administrative and Coordination Platform Only:**
CareSync is designed strictly for logistics, slot scheduling, and emergency dispatch coordination. It **does NOT** provide medical diagnosis, treatment recommendations, prescriptions, medical advice, or clinical evaluations. For life-threatening emergencies, patients and staff must immediately contact local emergency services (**108** / **112**).

---

## 🚀 Key Features

### 1. Landing Page & Public Discovery
- **Hero & Value Proposition**: Highlighting clinic coordination, simplified workflows, and public access to emergency resources.
- **Pilot Coverage**: Real-world demo data set in **Pune, Maharashtra** (Shivajinagar, Kothrud, Deccan, Baner, Viman Nagar, Swargate).
- **Public Emergency Center**: Instant access to ambulance booking, blood bank inventories, and 24/7 casualty hospital finder without mandatory account creation.

### 2. Dual-Role Authentication & 1-Click Demo
- **Role Selection**: Patient / User vs. Clinic Staff / Admin.
- **1-Click Demo Buttons**: Instant login as **Demo Patient (Aarav Sharma)** or **Demo Clinic Admin (Dr. Priya Nair / City Care Clinic)** for hackathon evaluations.
- **Persistent Local Data Engine**: All actions (booking visits, requesting ambulances, logging blood requests, and changing statuses) persist across page reloads and browser tabs.

### 3. Patient / User Experience
- **Patient Dashboard**: Summary KPI cards (upcoming visits, active ambulance dispatches, blood inquiries) and quick action shortcuts.
- **Appointment Booking**: Select clinic, department (General Medicine, Pediatrics, ENT, Dermatology, Orthopedics, Dental), medical officer, date, and 30-minute time slots. Generates an instant alphanumeric Appointment ID (e.g. `APT-1024`).
- **Administrative Patient Profile**: Captures only minimal non-sensitive administrative data (name, age, gender, phone, email, Pune address, blood group, emergency contact).
- **My Appointments**: Filter by *Upcoming*, *Completed*, or *Cancelled*, view and print appointment confirmation slips, or cancel upcoming visits.

### 4. Emergency Center & Dispatch
- **Ambulance Request Flow**:
  - Priority tiers: **Normal** (non-emergency transfer), **Urgent** (immediate transport), **Critical** (trauma/ALS with oxygen).
  - Quick Pune landmark presets (FC Road, Kothrud Stand, Deccan, Pune Station, Baner Phata, Hinjawadi).
  - Generates Request ID (e.g. `AMB-1024`).
  - **Live Dispatch Tracker**: Stepper progress (*Requested* → *Searching* → *Ambulance Assigned* → *On the Way* → *Completed*), driver name, phone, vehicle plate (`MH-12-AM-4021`), and ETA.
- **Blood Search & Broadcast**:
  - Filter verified Pune blood banks (Poona Serological, Sassoon General Hospital, Janakalyan Raktakendra, Sahyadri Blood Bank, Ruby Hall) by blood group (A+, A-, B+, B-, AB+, AB-, O+, O-) and area.
  - Report and broadcast urgent patient blood requirements with unit counts and hospital delivery destinations.
- **Nearby Healthcare Facilities**:
  - Directory of 24/7 trauma hospitals, ICUs, and day clinics with distance in km, OPD fees in ₹, and open/closed badges.
  - **Interactive Pune Healthcare Radar Map**: Visual representation of facilities across North (Baner), South (Swargate), East (Viman Nagar), and West (Kothrud).

### 5. Clinic Admin Operations Console
- **Admin Dashboard**: Live statistics for Today's Appointments, Pending Review, Registered Patients, Active Emergencies, and Completion Rate.
- **Visual Analytics Charts**: Responsive weekly appointment flow bar charts and department distribution progress indicators.
- **Today's Schedule & Attendance Desk**: Instant one-click status transitions (*Confirm*, *Mark Completed*, *No-show*, *Cancel*).
- **Patient Administrative Directory**: Searchable list of registered patients with visit history modals and a walk-in registration form.
- **Emergency Operations Center**:
  - Standby fleet monitor for ambulances (`Available`, `On Mission`, `Maintenance`).
  - Fleet assignment modal to attach drivers and vehicles to incoming requests.
  - Blood request status coordination (*Searching*, *Matched*, *Fulfilled*, *Closed*).

### 6. Notifications & Alert Center
- Real-time notification drawer with unread count badge, categories (Appointments, Ambulance, Blood, System), and direct navigation links.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (with `@tailwindcss/vite`)
- **Icons**: Lucide React
- **Storage / Database**:
  - **Primary**: High-fidelity reactive `LocalStorage` store with pre-populated Pune healthcare dataset.
  - **Optional**: Firebase Auth & Firestore adapter ready via `.env`.

---

## 📁 Project Structure

```
caresync/
├── index.html                    # Application entry HTML with Google Fonts & favicon
├── package.json                  # Dependencies and build scripts
├── tsconfig.json                 # TypeScript project configuration
├── tsconfig.app.json             # TypeScript compiler settings
├── vite.config.ts                # Vite config with React & Tailwind plugins
├── .env.example                  # Firebase credentials template
├── src/
│   ├── main.tsx                  # React DOM mount point
│   ├── App.tsx                   # Primary layout, routing, toast manager
│   ├── index.css                 # Tailwind CSS v4 base styles
│   ├── types/
│   │   └── index.ts              # Core TypeScript models (Appointments, Ambulance, Blood, etc.)
│   ├── data/
│   │   └── mockData.ts           # Realistic Pune healthcare demo dataset
│   ├── context/
│   │   └── AppContext.tsx        # Global state, authentication, and persistence
│   ├── services/
│   │   └── firebase.ts           # Optional Firebase initialization adapter
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        # Top navigation with role switcher & emergency dial
│   │   │   ├── Sidebar.tsx       # Desktop sidebar for clinic admin and patient
│   │   │   ├── MobileNav.tsx     # Mobile bottom navigation bar
│   │   │   └── Footer.tsx        # Footer with emergency hotlines and safety notice
│   │   ├── common/
│   │   │   ├── SafetyBanner.tsx  # Universal safety disclaimer banner
│   │   │   ├── StatusBadge.tsx   # Visual status badge indicators
│   │   │   ├── StatCard.tsx      # SaaS KPI metric card
│   │   │   ├── Modal.tsx         # Reusable accessible modal dialog
│   │   │   └── ConfirmDialog.tsx # Confirmation dialog for critical actions
│   │   ├── auth/
│   │   │   └── AuthModal.tsx     # Sign In & Registration with 1-click demo login
│   │   └── notifications/
│   │       └── NotificationCenter.tsx # Slide-over alert drawer
│   └── views/
│       ├── LandingView.tsx       # Public marketing landing page
│       ├── patient/
│       │   ├── PatientDashboard.tsx  # Patient home with summary cards & activity
│       │   ├── PatientProfile.tsx    # Administrative profile editor
│       │   └── MyAppointmentsView.tsx # Patient visits with filters & slip print
│       ├── appointments/
│       │   └── BookAppointmentView.tsx # Outpatient appointment booking flow
│       ├── emergency/
│       │   ├── EmergencyCenterView.tsx # Dedicated emergency hub (108/112 dial)
│       │   ├── AmbulanceRequestView.tsx# Ambulance dispatch & live tracking
│       │   └── BloodManagementView.tsx # Blood bank directory & requirement broadcast
│       ├── facilities/
│       │   └── HealthcareFacilitiesView.tsx # Facility cards & Pune radar map
│       └── admin/
│           ├── AdminDashboard.tsx       # Overview, charts, and today's schedule
│           ├── AdminAppointmentsView.tsx# Master appointments filter & dispatch
│           ├── AdminPatientsView.tsx    # Patient registry & walk-in registration
│           ├── AdminEmergencyView.tsx   # Fleet assignment & blood coordination
│           └── AdminAnalyticsView.tsx   # Operational KPI charts & attendance
```

---

## 🏃 How to Run the Project

### Prerequisites
- Node.js (v18 or higher; tested on v22.18.0)
- npm (v9 or higher)

### Installation & Execution
```bash
# Navigate to project directory
cd C:\Users\digvijay\.gemini\antigravity\scratch\caresync

# Install dependencies (already installed during setup)
npm install

# Start development server
npm run dev

# Or build for production and preview
npm run build
npm run preview
```

The application will be accessible at: `http://localhost:5173` (or the port displayed in your terminal).

---

## 🔑 Demo Login Credentials

For convenience during presentations and evaluation, you can use either the **1-Click Demo Buttons** or log in manually with the following accounts:

| Role | Name | Email | Password | Details |
|---|---|---|---|---|
| **Patient** | Aarav Sharma | `aarav.sharma@caresync.in` | Any password | Kothrud, Pune • Blood Group O+ |
| **Clinic Admin** | Dr. Priya Nair | `dr.priya@citycare.in` | Any password | Medical Admin at City Care Clinic (FC Road, Pune) |

> 💡 **Role Switcher**: When logged in, a **"Viewing as: Patient / Clinic Admin"** toggle pill appears in the top navigation bar. Click it at any time to instantly switch between the Patient portal and Clinic Admin portal without logging out!

---

## ☁️ Optional Firebase Setup Instructions

If you wish to link Firebase:
1. Create a project at [firebase.google.com](https://console.firebase.google.com).
2. Enable **Authentication** (Email/Password).
3. Create a **Firestore Database** in production or test mode.
4. Copy your project configuration to a `.env` file in the `caresync` directory:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```
5. CareSync will automatically recognize the environment variables via `src/services/firebase.ts`. If not provided, it seamlessly continues with its zero-config persistent local engine.

---

## 🌟 Future Improvements
1. **SMS Gateway Integration**: Real-time Twilio or MSG91 integration for SMS appointment confirmations and OTP verification.
2. **GPS Geolocation & OpenStreetMap**: Direct geolocation lookup for real-time turn-by-turn ambulance tracking.
3. **Telehealth Queue Management**: Token numbers and physical clinic waiting room digital display screen mode.
4. **Multi-lingual Localization**: Add Marathi (मराठी) and Hindi (हिंदी) language toggles for community clinic accessibility.
