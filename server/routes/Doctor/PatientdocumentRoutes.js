import express from "express";
import Patient from "../../models/Patient/Register.js";

const router = express.Router();

router.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: "No patients found" });
    }

    res.status(200).json(
      patients.map((patient) => ({
        patientId: patient.patientId,
        fullname: patient.fullname,
        email: patient.email,
        phone: patient.phone,
      }))
    );
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/patient/:id", async (req, res) => {
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
    console.error("Error fetching patient details:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
