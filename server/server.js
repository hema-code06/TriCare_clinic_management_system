import express from "express";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import { initializeUsers } from "./controllers/authController.js";
import config from "./config/dotenv.js";
import { authenticate, requireRole } from "./middleware/authMiddleware.js";
import doctorRoutes from "./routes/Admin/doctorRoutes.js";
import appointmentRoutes from "./routes/Admin/appointmentRoutes.js";
import inventoryRoutes from "./routes/Admin/inventoryRoutes.js";
import maintenanceRoutes from "./routes/Admin/maintenanceRoutes.js";
import roleRoutes from "./routes/Admin/roleRoutes.js";
import statsRoutes from "./routes/Admin/statsRoutes.js";
import bookappointmentRoutes from "./routes/Patient/bookappointmentRoutes.js";
import fixappointmentRoutes from "./routes/Doctor/fixappointmentRoutes.js";
import registerRoutes from "./routes/Patient/registerRoutes.js";
import PatientDocumentRoutes from "./routes/Doctor/PatientdocumentRoutes.js";

const app = express();
app.use(compression());

app.get("/", (req, res) => {
  res.send("Tricare Clinic Server is running successfully..");
});
app.get("/health", (req, res) => {
  res.status(200).send("Server Working Good!!");
});

app.use(cors({ origin: config.CLIENT_URL.split(",") }));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const startServer = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("MongoDB connected successfully!!");

    await initializeUsers();

    const adminOnly = [authenticate, requireRole("admin")];
    const doctorOnly = [authenticate, requireRole("doctor")];

    app.use("/api/auth", authRoutes);

    app.use("/api/admin/doctors", adminOnly, doctorRoutes);
    app.use("/api/admin/appointments", adminOnly, appointmentRoutes);
    app.use("/api/admin/inventory", adminOnly, inventoryRoutes);
    app.use("/api/admin/maintenance", adminOnly, maintenanceRoutes);
    app.use("/api/admin/roles", adminOnly, roleRoutes);
    app.use("/api/admin/stats", adminOnly, statsRoutes);

    app.use("/api/doctor", doctorOnly, fixappointmentRoutes);
    app.use("/api/doctor", doctorOnly, PatientDocumentRoutes);

    app.use("/api/patient", bookappointmentRoutes);
    app.use("/api/patient", registerRoutes);

    app.use((req, res) => {
      res.status(404).json({ message: "Route not found" });
    });
    app.use((err, req, res, next) => {
      const status = err.status >= 400 && err.status < 500 ? err.status : 500;
      if (status === 500) console.error("Unhandled error:", err);
      res.status(status).json({
        message: status === 500 ? "Server error" : err.message,
      });
    });

    app.listen(config.PORT, () => {
      console.log(`Server running on port ${config.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
