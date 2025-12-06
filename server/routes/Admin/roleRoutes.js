import express from "express";
import Roles from "../../models/Admin/Roles.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newRole = new Roles(req.body);
    await newRole.save();
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const newRoles = await Roles.find();
    res.status(200).json(newRoles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedRoles = await Roles.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRoles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Roles.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Roles deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
