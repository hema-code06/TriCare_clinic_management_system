import express from "express";
import Maintenance from "../../models/Admin/maintenance.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      assetName,
      scheduledDate,
      technician,
      maintenanceType,
      maintenanceFrequency,
      status,
    } = req.body;

    if (
      !assetName ||
      !scheduledDate ||
      !technician ||
      !maintenanceType ||
      !maintenanceFrequency
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newRecord = new Maintenance({
      assetName,
      scheduledDate,
      technician,
      maintenanceType,
      maintenanceFrequency,
      status,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find();
    res.status(200).json(maintenanceRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      assetName,
      scheduledDate,
      technician,
      maintenanceType,
      maintenanceFrequency,
      status,
    } = req.body;

    if (
      !assetName ||
      !scheduledDate ||
      !technician ||
      !maintenanceType ||
      !maintenanceFrequency
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updatedRecord = await Maintenance.findByIdAndUpdate(
      id,
      {
        assetName,
        scheduledDate,
        technician,
        maintenanceType,
        maintenanceFrequency,
        status,
      },
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Maintenance.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
