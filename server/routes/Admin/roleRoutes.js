import express from "express";
import Roles from "../../models/Admin/Roles.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const newRole = new Roles(req.body);
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const newRoles = await Roles.find();
    res.status(200).json(newRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedRole = await Roles.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRole) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedRole = await Roles.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Roles deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
