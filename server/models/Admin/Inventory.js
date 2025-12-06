import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemCode: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Medical Equipment",
      "Pharmaceuticals",
      "Office Supplies",
      "Patient Care Supplies",
      "Surgical Instruments",
      "Diagnostic Equipment",
      "Personal Protective Equipment (PPE)",
      "Cleaning Supplies",
      "Furniture",
      "Imaging & Radiology",
      "Laboratory Equipment",
      "Other",
    ],
  },
  supplierName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  supplierContact: { type: String, required: true },
  stockStatus: {
    type: String,
    required: true,
    enum: ["In Stock", "Out of Stock", "Low Stock"],
  },
  purchaseDate: { type: Date, default: Date.now },
  reorderLevel: { type: Number, required: true, default: 10 },
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
