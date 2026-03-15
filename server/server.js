import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import { initializeUsers } from "./controllers/authController.js";
import config from "./config/dotenv.js";
import doctorRoutes from "./routes/Admin/doctorRoutes.js";
import appointmentRoutes from "./routes/Admin/appointmentRoutes.js";
import inventoryRoutes from "./routes/Admin/inventoryRoutes.js";
import maintenanceRoutes from "./routes/Admin/maintenanceRoutes.js";
import roleRoutes from "./routes/Admin/roleRoutes.js";
import bookappointmentRoutes from "./routes/Patient/bookappointmentRoutes.js";
import fixappointmentRoutes from "./routes/Doctor/fixappointmentRoutes.js";
import registerRoutes from "./routes/Patient/registerRoutes.js";
import PatientDocumentRoutes from "./routes/Doctor/PatientdocumentRoutes.js";

const app = express();
const compression = require("compression");

app.get("/", (req, res) => {
  res.send("Tricare Clinic Server is running successfully..");
});
app.get("/health", (req, res) => {
  res.status(200).send("Server Working Good!!");
});
app.use(compression());

app.use(cors({ origin: "*" }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected successfully!!");

    await initializeUsers();

    app.use("/api/auth", authRoutes);
    app.use("/api/admin/doctors", doctorRoutes);
    app.use("/api/admin/appointments", appointmentRoutes);
    app.use("/api/admin/inventory", inventoryRoutes);
    app.use("/api/admin/maintenance", maintenanceRoutes);
    app.use("/api/admin/roles", roleRoutes);

    app.use("/api/patient", bookappointmentRoutes);
    app.use("/api/doctor", fixappointmentRoutes);

    app.use("/api/patient", registerRoutes);
    app.use("/api/doctor", PatientDocumentRoutes);

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
