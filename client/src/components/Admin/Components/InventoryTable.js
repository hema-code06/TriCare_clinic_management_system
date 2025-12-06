import React from "react";
import "../styles/InventoryTable.css";

const InventoryTable = ({ items, onUpdateItem, onDeleteItem }) => {
  const handleEdit = (item) => {
    onUpdateItem(item);
  };

  const handleDelete = (id) => {
    onDeleteItem(id);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("en-CA");
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Item Code</th>
          <th>Item Name</th>
          <th>Category</th>
          <th>Supplier Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Expiry Date</th>
          <th>Purchase Date</th>
          <th>Reorder Level</th>
          <th>Supplier Contact</th>
          <th>Stock Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.itemCode}</td>
            <td>{item.itemName}</td>
            <td>{item.category}</td>
            <td>{item.supplierName}</td>
            <td>{item.quantity}</td>
            <td>{item.unitPrice}</td>
            <td>{formatDate(item.expiryDate)}</td>
            <td>{formatDate(item.purchaseDate)}</td>
            <td>{item.reorderLevel !== undefined ? item.reorderLevel : "-"}</td>
            <td>{item.supplierContact}</td>
            <td>{item.stockStatus}</td>
            <td>
              <button
                style={{ color: "teal" }}
                onClick={() => handleEdit(item)}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                style={{ color: "rgb(251, 90, 90)" }}
                onClick={() => handleDelete(item._id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
