import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import InventoryForm from "../Components/InventoryForm";
import InventoryTable from "../Components/InventoryTable";
import axios from "axios";
import "../styles/mainpage.css";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/inventory"
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (newItem) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/inventory",
        newItem
      );
      fetchInventory();
      closeModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (updatedItem) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/inventory/${updatedItem._id}`,
        updatedItem
      );
      fetchInventory();
      closeModal();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/inventory/${id}`);
      fetchInventory();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const closeModal = () => {
    setIsAdding(false);
    setSelectedItem(null);
  };

  return (
    <div className="management-page">
      <h1>Inventory </h1>
      <button
        className="record-button"
        onClick={() => {
          setIsAdding(true);
          setSelectedItem(null);
        }}
      >
        Add Item
      </button>

      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-button" onClick={closeModal}>
              <MdClose size={24} />
            </button>
            <InventoryForm
              onAddItem={addItem}
              onUpdateItem={updateItem}
              selectedItem={selectedItem}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <InventoryTable
          items={inventory}
          onUpdateItem={(item) => {
            setSelectedItem(item);
            setIsAdding(true);
          }}
          onDeleteItem={deleteItem}
        />
      )}
    </div>
  );
};

export default InventoryPage;
