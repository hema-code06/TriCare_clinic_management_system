# 🏥 TriCare Clinic Management System

TriCare is a modern, lightweight **Clinic Management Web Application** designed for **Admin, Doctor, and Patient** roles.  
It offers appointment scheduling, user management, health records, and clinic operations — all through **role-based, responsive dashboards**.

---

## 🔐 Default Login Credentials
To make testing easier, default role-based login credentials are added:

### **Admin Login**
- **Username:** `admin`
- **Password:** `password`

### **Doctor Login**
- **Username:** `doctor`
- **Password:** `password`

---

# 🚀 Features

### 🔐 Secure Authentication
- JWT-based login for Admin, Doctor, and Patient  
- Protected routes based on user roles  
- Automatically generates a **unique Patient ID** after registration for secure access and identification

### 🩺 Doctor Dashboard
- View/manage daily appointments  
- Reschedule patient appointments  
- Access patient medical history  

### 👤 Patient Dashboard
- Book appointments  
- Track appointment status  
- Update personal profile details  

### 🛠️ Admin Panel
- Manage doctors, patients, appointments, and staff  
- Add/update inventory items & stock management  
- Monitor system logs  
- Monitor appointments and Update status

### 📦 Inventory Management
- Real-time stock tracking  
- Reorder level alerts  
- Low-stock notifications  

### 🌐 RESTful API Integration
- Node.js + Express backend with modular routes  
- Scalable API architecture  
- Fully tested with **Postman**

### 🧪 API Testing
- Auth, Appointments, Inventory, Users tested via Postman  
- Validations and error-handling included  

---

# 🛠️ Tech Stack (MERN)

### **Frontend**
- React.js  
- Tailwind CSS  
- React Router  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- JWT Authentication  
- Bcrypt for password hashing  

### **Database**
- MongoDB Atlas  
- Mongoose 

### **Tools**
- Postman (API Testing)  
- Render / Netlify (Deployment)  

---

# 📦 Getting Started

### Prerequisites
- Node.js & npm installed  
- MongoDB Atlas account  
- (Optional) Postman for API testing  

---

# 🚀 Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/hema-code06/TriCare_clinic_management_system.git
cd TriCare_clinic_management_system
```
### 2️⃣ Install Client Dependencies
```bash
cd client
npm install
```

### 3️⃣ Install Server Dependencies
```bash
cd server
npm install
```

---

# 🔧 Environment Setup

- MONGO_URI = your_mongodb_uri
- JWT_SECRET = your_jwt_secret
- PORT = 5000
 
---

### ▶️ Run the Application
```bash
cd server
npm run dev
```

```bash
cd client
npm start
```


Now open the app in your browser:
➡️ http://localhost:5000
