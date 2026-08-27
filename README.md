# TriCare — Clinic Management System

TriCare is a full-stack, role-based clinic management platform built on the MERN stack. It provides three dedicated dashboards — **Admin**, **Doctor**, and **Patient** — each scoped to the workflows relevant to that role, backed by a secured REST API and a MongoDB data layer.

---

## Overview

A clinic runs on three distinct workflows: administration, clinical care, and patient self-service. TriCare models that directly instead of forcing everyone through one generic interface.

- **Admins** manage doctors, staff, inventory, and equipment maintenance, and get a live operational overview of the clinic.
- **Doctors** manage their incoming appointment requests and access patient records.
- **Patients** register, book appointments, and manage their own health profile.

Each role authenticates separately and only has access to the parts of the system it's meant to touch.

---

## Core Features

### Admin Dashboard
- Full CRUD management for doctors, clinic staff, and inventory
- Equipment maintenance scheduling and status tracking
- Clinic-wide appointment visibility
- A live operations dashboard — real-time counts and charts sourced directly from the database, not static placeholders

### Doctor Dashboard
- Review, confirm, reschedule, or cancel patient appointment requests
- Access a searchable patient list with full patient records

### Patient Portal
- Self-registration with an auto-generated Patient ID
- Appointment booking with doctor, date, and time preferences
- Appointment status tracking
- Self-service profile management, including medical and insurance details

---

## Tech Stack

**Frontend**
- React 19 — component-driven SPA architecture
- React Router DOM v7 — client-side routing with role-based route guards
- Axios — API communication layer
- Chart.js / react-chartjs-2 — real-time operational data visualization
- React Modal — accessible modal dialogs

**Backend**
- Node.js + Express — REST API design
- MongoDB + Mongoose — schema-based NoSQL data modeling
- JSON Web Tokens (JWT) — stateless, role-based authentication
- bcrypt.js — password hashing
- CORS, compression — API middleware and performance

**Tooling**
- Postman — API endpoint testing across all roles and routes
- Jenkins — CI/CD pipeline automation
- Git & GitHub — version control
- Vercel / Render — CI/CD and deployment

---

## Project Structure

```
TriCare_clinic_management_system/
├── client/                  React SPA
│   └── src/
│       ├── components/
│       │   ├── Admin/       Admin dashboard, management pages & forms
│       │   ├── Doctor/      Doctor dashboard & appointment handling
│       │   └── Patient/     Patient portal, booking & profile
│       └── App.js           Route definitions & role-based guards
│
└── server/                  Express REST API
    ├── config/               Environment configuration
    ├── controllers/          Auth logic
    ├── middleware/            Role-based JWT verification
    ├── models/                 Mongoose schemas
    └── routes/                 Role-scoped API endpoints
```

---

## Getting Started

```bash
git clone https://github.com/hema-code06/TriCare_clinic_management_system.git
cd TriCare_clinic_management_system

cd server && npm install
cd client && npm install
```

Configure `server/.env`:
```
PORT=3001
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=<your secret>
```

Run both services:
```bash
# Terminal 1
cd server && npm run dev

# Terminal 2
cd client && npm start
```

The app runs at `http://localhost:3000`.

---

## Future Improvements

- Email/SMS notifications for appointment confirmations and status updates
- Doctor availability calendar with real-time slot booking
- Patient medical history and prescription records
- Billing and payments integration

---

*Built with ❤️ using React · Node.js · Express · MongoDB*
