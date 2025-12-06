import React, { useState, useEffect } from "react";
import "../styles/formstyles.css";

const InventoryForm = ({ onAddItem, onUpdateItem, selectedItem }) => {
  const [item, setItem] = useState({
    itemName: "",
    itemCode: "",
    category: "",
    supplierName: "",
    quantity: 0,
    unitPrice: 0,
    expiryDate: "",
    supplierContact: "",
    stockStatus: "",
    purchaseDate: "",
    reorderLevel: 10,
  });

  useEffect(() => {
    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItem) {
      onUpdateItem(item);
    } else {
      onAddItem(item);
    }
    setItem({
      itemName: "",
      itemCode: "",
      category: "",
      supplierName: "",
      quantity: 0,
      unitPrice: 0,
      expiryDate: "",
      supplierContact: "",
      stockStatus: "",
      purchaseDate: "",
      reorderLevel: 10,
    });
  };

  return (
    <form className="fill-main" onSubmit={handleSubmit}>
      <div className="fill-grid">
        <label>
          Item Name :{" "}
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={item.itemName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Item Code :{" "}
          <input
            type="text"
            id="itemCode"
            name="itemCode"
            value={item.itemCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category :{" "}
          <select
            id="category"
            name="category"
            value={item.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Medical Equipment">Medical Equipment</option>
            <option value="Pharmaceuticals">Pharmaceuticals</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Patient Care Supplies">Patient Care Supplies</option>
            <option value="Surgical Instruments">Surgical Instruments</option>
            <option value="Diagnostic Equipment">Diagnostic Equipment</option>
            <option value="Personal Protective Equipment (PPE)">
              Personal Protective Equipment (PPE)
            </option>
            <option value="Cleaning Supplies">Cleaning Supplies</option>
            <option value="Furniture">Furniture</option>
            <option value="Imaging & Radiology">Imaging & Radiology</option>
            <option value="Laboratory Equipment">Laboratory Equipment</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Supplier Name :{" "}
          <input
            type="text"
            id="supplierName"
            name="supplierName"
            value={item.supplierName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Quantity :{" "}
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={item.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Unit Price :{" "}
          <input
            type="number"
            id="unitPrice"
            name="unitPrice"
            value={item.unitPrice}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Expiry Date :{" "}
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={item.expiryDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Supplier Contact :{" "}
          <input
            type="text"
            id="supplierContact"
            name="supplierContact"
            value={item.supplierContact}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Stock Status :{" "}
          <select
            id="stockStatus"
            name="stockStatus"
            value={item.stockStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="Low Stock">Low Stock</option>
          </select>
        </label>

        <label>
          Purchase Date :{" "}
          <input
            type="date"
            id="purchaseDate"
            name="purchaseDate"
            value={item.purchaseDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Reorder Level :{" "}
          <input
            type="number"
            id="reorderLevel"
            name="reorderLevel"
            value={item.reorderLevel}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className="en-button" type="submit">
        {selectedItem ? "Update" : "Add Item"}
      </button>
    </form>
  );
};

export default InventoryForm;
