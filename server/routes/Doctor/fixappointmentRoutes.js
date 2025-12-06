import express from "express";
import FixAppointment from "../../models/Doctor/FixAppointment.js";

const router = express.Router();

router.get("/appointmentconfirmation", async (req, res) => {
  try {
    const appointments = await FixAppointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching appointments.", error: error.message });
  }
});

router.put("/appointmentconfirmation/:id", async (req, res) => {
  const { id } = req.params;
  const { action, preferredDate, preferredTimeSlot } = req.body;

  try {
    const updatedFields = { status: action };

    if (action === "Rescheduled" && preferredDate && preferredTimeSlot) {
      updatedFields.preferredDate = preferredDate;
      updatedFields.preferredTimeSlot = preferredTimeSlot;
    }

    const updatedAppointment = await FixAppointment.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found." });
    }

    res.status(200).json({
      message: `Appointment ${action} successfully.`,
      appointment: updatedAppointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating appointment.", error: error.message });
  }
});

export default router;
