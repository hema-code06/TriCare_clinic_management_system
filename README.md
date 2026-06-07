# TriCare — Clinic Management System

> A role-based clinic management web application for Admins, Doctors, and Patients — covering appointment scheduling, doctor management, inventory tracking, equipment maintenance, staff roles, and patient health records, all through dedicated dashboards.

---

## 🔐 Default Login Credentials

To make testing easier, default role-based login credentials are pre-loaded:

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `password` |
| Doctor | `doctor` | `password` |

> **Patient Login** — Register a new patient account to get a unique Patient ID, then use that ID and password to log in.

---

## 📌 About TriCare

TriCare is a full-stack clinic management system built for three distinct roles — **Admin**, **Doctor**, and **Patient** — each with their own protected dashboard and dedicated features.

- **Admin** manages the entire clinic — doctors, staff roles, inventory, equipment maintenance, and check appointments.
- **Doctor** views patient appointment requests, confirms or reschedules them, and manages patient records.
- **Patient** registers with a unique auto-generated Patient ID, books appointments with department and urgency selection, tracks appointment status, and manages their health profile.

---

## 🚀 Features

### 🛠️ Admin Dashboard
**Doctor Management**
- Add doctors with full details — department, consultation method, availability, consultation fee and so on..
- Supports 16 departments: Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, Oncology, Gynecology, Psychiatry, Endocrinology, ENT, Urology, Rheumatology, Plastic Surgery, Gastroenterology, Pulmonology, General Medicine
- Edit and delete doctor records
- View detailed doctor profiles

**Appointment Management**
- View all confirmed appointments across the clinic
- Confirm pending appointments submitted by doctors
- Monitor appointment status in real time

**Inventory Management**
- Add, edit, and delete clinic inventory items
- Track inventory items
- Supports 12 inventory categories: Medical Equipment, Pharmaceuticals, Surgical Instruments, Diagnostic Equipment, PPE, Lab Equipment, Imaging & Radiology, Patient Care Supplies, Office Supplies, Cleaning Supplies, Furniture, Other
- Stock status tracking: In Stock / Low Stock / Out of Stock
- Reorder level alerts — automatically flags items below threshold

**Equipment Maintenance**
- Schedule and track maintenance for clinic assets
- Set maintenance type (Routine / Emergency / Repair), frequency (Weekly / Monthly / Quarterly), and assigned technician
- Track maintenance status: Scheduled / In Progress / Completed

**Staff Roles Management**
- Add and manage clinic staff with role, access level, employee ID, designation, specialization, work shift, availability, and account status
- Edit and remove staff records
- View detailed staff profiles

---

### 🩺 Doctor Dashboard
- View all patient appointment requests with full details — urgency level, symptoms, department, consultation mode, preferred date and time slot
- Confirm or reschedule appointments with updated date and time
- Rescheduled appointments automatically update status and notify via the system
- Access patient documents and records

---

### 👤 Patient Dashboard
**Registration & Login**
- Register with name, email, and password
- A unique Patient ID (format: `PAT + timestamp`) is auto-generated on registration
- Login using Patient ID and password
- Passwords hashed with bcryptjs

**Book Appointment**
- Book appointments with full details:
  - Appointment type: New Consultation / Follow-Up / Teleconsultation
  - Consultation mode: In-person / Virtual (Telemedicine)
  - Urgency level: Routine / Urgent / Emergency
  - Department selection (15 departments)
  - Preferred doctor, date, time slot
  - Reason for appointment and symptoms
  - Preferred communication method: Call / Email / SMS
- Track appointment status (Pending / Confirmed / Rescheduled)

**Patient Profile**
- View and update profile details 
- Update medical info — general doctor name, doctor speciality
- Manage insurance information — provider and policy number

---

### 🔐 Authentication & Security
- JWT-based authentication for Admin and Doctor roles
- Default Admin and Doctor accounts auto-initialized on first server start
- bcryptjs password hashing for all users
- Protected routes via `authMiddleware` — role-based access control
- Patient authentication uses Patient ID + password (separate from Admin/Doctor auth flow)

---

### ⚙️ General
- Fully responsive design — mobile and desktop
- Charts and analytics using Chart.js + react-chartjs-2

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React.js | UI framework |
| React Router DOM v7 | Client-side routing & protected routes |
| Axios | HTTP client |
| Chart.js + react-chartjs-2 | Dashboard charts & analytics |
| React Modal | Modal dialogs |
| React Icons | Icon library |
| Tailwind CSS | Styling |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database & ODM |
| JWT (`jsonwebtoken`) | Role-based authentication |
| Bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |

---

## 🔧 Local Setup

### Prerequisites
- Node.js & npm
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/hema-code06/TriCare_clinic_management_system.git
cd TriCare_clinic_management_system
```

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Install Client Dependencies
```bash
cd client
npm install
```

### 4. Environment Setup

**Backend — `server/.env`:**

### 5. Run the Application
```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm start
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🔮 Future Improvements

- [ ] Email notifications for appointment confirmations and reminders
- [ ] Patient medical history and prescription records
- [ ] Doctor availability calendar
- [ ] Payment and billing module
- [ ] Analytics dashboard with clinic performance metrics
- [ ] SMS notifications for appointment status updates

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub — it motivates me to keep building!

---

*Built with ❤️ using React · Node.js · Express · MongoDB*
