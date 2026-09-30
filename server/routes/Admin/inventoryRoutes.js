import express from "express";
import Inventory from "../../models/Admin/Inventory.js";
import { authenticate } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const newInventoryItem = new Inventory(req.body);
    await newInventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();
    res.status(200).json(inventoryItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const deletedItem = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
