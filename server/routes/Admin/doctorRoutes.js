import express from "express";
import Doctor from "../../models/Admin/Doctor.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", authenticate, async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "A doctor with this email or Doctor ID already exists" });
    }
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(updatedDoctor);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "A doctor with this email or Doctor ID already exists" });
    }
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
