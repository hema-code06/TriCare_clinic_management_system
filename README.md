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

## Demo Credentials

Admin and Doctor accounts are seeded automatically on first server start, so the platform can be explored end-to-end without registering a new account:

| Role   | Username | Password   |
|--------|----------|------------|
| Admin  | `admin`  | `password` |
| Doctor | `doctor` | `password` |

These are seed credentials for demo purposes only — not representative of production auth practices. See [Architecture & Security](#architecture--security) for how authentication and authorization are actually designed in this system.

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

## Architecture & Security
 
- **Dual JWT authentication** — Admin/Doctor and Patient roles each carry their own signed JWT, verified independently by role-specific middleware on every protected route.
- **Resource-level authorization** — patients can only ever read or modify their own profile; the server checks the authenticated identity against the requested resource on every request, not just whether a token is present.
- **Password security** — all credentials are hashed with bcrypt before storage; plaintext passwords are never persisted.
- **Route-level protection on both ends** — protected pages are gated on the client, and the same access rules are independently enforced on the API, so the UI is never the only line of defense.
  
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
cd ../client && npm install
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
- Role-based analytics dashboard for Admin (trends over time, not just live counts)

---

*Built with ❤️ using React · Node.js · Express · MongoDB*
