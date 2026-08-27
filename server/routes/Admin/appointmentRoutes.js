import express from "express";
import FixAppointment from "../../models/Doctor/FixAppointment.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/confirmed", authenticate, async (req, res) => {
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

export default router;
