import express from "express";
import { randomInt } from "crypto";
import Patient from "../../models/Patient/Register.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/dotenv.js";
import { authenticatePatient } from "../../middleware/patientAuthMiddleware.js";

const router = express.Router();

const MIN_PASSWORD_LENGTH = 8;

const generatePatientId = () =>
  `PAT${String(randomInt(0, 100000000)).padStart(8, "0")}`;

const signPatientToken = (patientId) =>
  jwt.sign({ patientId, role: "patient" }, config.JWT_SECRET, {
    expiresIn: "1h",
  });

router.post("/patientregister", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (
    typeof fullname !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    !fullname.trim() ||
    !email.trim()
  ) {
    return res
      .status(400)
      .json({ message: "Full name, email and password are required" });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({
      message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
    });
  }

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const existingPatient = await Patient.findOne({ email: normalizedEmail });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const newPatient = new Patient({
      patientId: generatePatientId(),
      fullname: fullname.trim(),
      email: normalizedEmail,
      password: await bcrypt.hash(password, 10),
    });
    await newPatient.save();

    res.status(201).json({
      message: "Registration successful",
      token: signPatientToken(newPatient.patientId),
      patientId: newPatient.patientId,
      fullname: newPatient.fullname,
      email: newPatient.email,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Patient already exists" });
    }
    console.error("Patient registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { patientId, password } = req.body;

  if (typeof patientId !== "string" || typeof password !== "string") {
    return res
      .status(400)
      .json({ message: "Patient ID and password are required" });
  }

  try {
    const patient = await Patient.findOne({ patientId });
    const isPasswordValid =
      patient && (await bcrypt.compare(password, patient.password));
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Invalid Patient ID or password" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: signPatientToken(patient.patientId),
      patientId: patient.patientId,
      fullname: patient.fullname,
    });
  } catch (error) {
    console.error("Patient login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/profile/:id", authenticatePatient, async (req, res) => {
  const { id } = req.params;

  if (req.patient.patientId !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    const patient = await Patient.findOne({ patientId: id });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({
      patientId: patient.patientId,
      fullname: patient.fullname,
      email: patient.email,
      phone: patient.phone,
      address: patient.address,
      age: patient.age,
      gender: patient.gender,
      location: patient.location,
      bloodType: patient.bloodType,
      occupation: patient.occupation,
      generalDoctorName: patient.generalDoctorName,
      doctorSpeciality: patient.doctorSpeciality,
      insuranceInformation: patient.insuranceInformation,
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile/:id", authenticatePatient, async (req, res) => {
  const { id } = req.params;

  if (req.patient.patientId !== id) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const {
    fullname, email, phone, address, age, gender,
    location, bloodType, occupation, generalDoctorName,
    doctorSpeciality, insuranceInformation,
  } = req.body;

  const updates = {
    fullname, email, phone, address, age, gender,
    location, bloodType, occupation, generalDoctorName,
    doctorSpeciality, insuranceInformation,
  };
  if (typeof updates.email === "string") {
    updates.email = updates.email.trim().toLowerCase();
  }
  const enumFields = ["gender", "bloodType"];
  Object.keys(updates).forEach((key) => {
    if (
      updates[key] === undefined ||
      (enumFields.includes(key) && updates[key] === "")
    ) {
      delete updates[key];
    }
  });

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { patientId: id },
      updates,
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email is already in use" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Some profile fields are invalid" });
    }
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;