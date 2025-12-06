const Maintenance = require("../models/Admin/maintenance");

exports.createMaintenance = async (req, res) => {
  try {
    const maintenance = new Maintenance(req.body);
    await maintenance.save();
    res
      .status(201)
      .json({
        message: "Maintenance record created successfully",
        maintenance,
      });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Error creating maintenance record",
        error: err.message,
      });
  }
};

exports.getAllMaintenance = async (req, res) => {
  try {
    const maintenanceRecords = await Maintenance.find();
    res.status(200).json(maintenanceRecords);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Error fetching maintenance records",
        error: err.message,
      });
  }
};

exports.updateMaintenance = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMaintenance = await Maintenance.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({
        message: "Maintenance record updated successfully",
        updatedMaintenance,
      });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Error updating maintenance record",
        error: err.message,
      });
  }
};

exports.deleteMaintenance = async (req, res) => {
  const { id } = req.params;
  try {
    await Maintenance.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Maintenance record deleted successfully" });
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Error deleting maintenance record",
        error: err.message,
      });
  }
};
