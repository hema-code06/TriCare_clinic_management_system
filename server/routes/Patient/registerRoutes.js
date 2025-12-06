import express from "express";
import Patient from "../../models/Patient/Register.js";
import bcrypt from "bcryptjs";

const router = express.Router();

const generatePatientId = () => {
  const prefix = "PAT";
  const uniqueId = String(Date.now()).padStart(7, "0");
  return `${prefix}${uniqueId}`;
};

router.post("/patientregister", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    const patientId = generatePatientId();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = new Patient({
      patientId,
      fullname,
      email,
      password: hashedPassword,
    });

    await newPatient.save();

    res.status(201).json({
      message: "Registration successful",
      patientId: newPatient.patientId,
      fullname: newPatient.fullname,
      email: newPatient.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { patientId, password } = req.body;

  try {
    const patient = await Patient.findOne({ patientId });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, patient.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      patientId: patient.patientId,
      fullname: patient.fullname,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

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
      contactNumber: patient.contactNumber,
      location: patient.location,
      bloodType: patient.bloodType,
      occupation: patient.occupation,
      generalDoctorName: patient.generalDoctorName,
      doctorSpeciality: patient.doctorSpeciality,
      insuranceInformation: patient.insuranceInformation,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    email,
    phone,
    address,
    age,
    gender,
    contactNumber,
    location,
    bloodType,
    occupation,
    generalDoctorName,
    doctorSpeciality,
    insuranceInformation,
  } = req.body;

  try {
    const updatedPatient = await Patient.findOneAndUpdate(
      { patientId: id },
      {
        fullname,
        email,
        phone,
        address,
        age,
        gender,
        contactNumber,
        location: location || {},
        bloodType,
        occupation,
        generalDoctorName,
        doctorSpeciality,
        insuranceInformation: insuranceInformation || {},
      },
      { new: true }
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
export default router;
