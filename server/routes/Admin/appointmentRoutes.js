import express from "express";
import FixAppointment from "../../models/Doctor/FixAppointment.js";
import PatientAppointment from "../../models/Admin/PatientAppointment.js";

const router = express.Router();

router.get("/confirmed", async (req, res) => {
  try {
    const confirmedAppointments = await FixAppointment.find({
      status: "Confirmed",
    });

    if (confirmedAppointments.length === 0) {
      return res
        .status(404)
        .json({ message: "No confirmed appointments found." });
    }

    res.status(200).json(confirmedAppointments);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching confirmed appointments.",
        error: error.message,
      });
  }
});

router.put("/confirm/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (status !== "Confirmed") {
      return res
        .status(400)
        .json({ message: "Invalid status. It must be 'Confirmed'." });
    }

    const fixAppointment = await FixAppointment.findById(id);

    if (!fixAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    fixAppointment.status = "Confirmed";
    await fixAppointment.save();

    const patientAppointment = new PatientAppointment({
      patientID: fixAppointment.patientId,
      fullName: fixAppointment.fullName,
      contactNumber: fixAppointment.contactNumber,
      appointmentType: fixAppointment.appointmentType,
      preferredDoctor: fixAppointment.preferredDoctor,
      preferredDate: fixAppointment.preferredDate,
      preferredTimeSlot: fixAppointment.preferredTimeSlot,
      appointmentStatus: "Confirmed",
    });

    await patientAppointment.save();

    res.status(200).json({
      message: "Appointment confirmed successfully.",
      patientAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error confirming appointment.", error: error.message });
  }
});

export default router;
