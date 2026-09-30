import express from "express";
import FixAppointment from "../../models/Doctor/FixAppointment.js";
import { authenticatePatient } from "../../middleware/patientAuthMiddleware.js";

const router = express.Router();

router.post("/bookappointments", authenticatePatient, async (req, res) => {
  const {
    fullName,
    gender,
    contactNumber,
    appointmentType,
    consultationMode,
    preferredDoctor,
    urgencyLevel,
    preferredDate,
    preferredTimeSlot,
    reasonForAppointment,
    symptoms,
    department,
    preferredCommunicationMethod,
  } = req.body;
  try {
    const newAppointment = new FixAppointment({
      patientId: req.patient.patientId,
      fullName,
      gender,
      contactNumber,
      appointmentType,
      consultationMode,
      preferredDoctor,
      urgencyLevel,
      preferredDate,
      preferredTimeSlot,
      reasonForAppointment,
      symptoms,
      department,
      preferredCommunicationMethod,
    });
    await newAppointment.save();
    res.status(201).json({
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error booking appointment.", error: error.message });
  }
});

router.get("/bookappointments", authenticatePatient, async (req, res) => {
  try {
    const appointments = await FixAppointment.find({
      patientId: req.patient.patientId,
    });
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments.", error: error.message });
  }
});

export default router;