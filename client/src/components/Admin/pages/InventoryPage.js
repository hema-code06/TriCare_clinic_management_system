import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import InventoryForm from "../Components/InventoryForm";
import InventoryTable from "../Components/InventoryTable";
import axios from "axios";
import "../styles/mainpage.css";
import { useState, useEffect, useCallback } from "react";

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/inventory`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInventory(response.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  const addItem = async (newItem) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/inventory`, newItem,
        { headers: { Authorization: `Bearer ${token}` } }
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
        `${process.env.REACT_APP_API_URL}/api/admin/inventory/${updatedItem._id}`,
        updatedItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchInventory();
      closeModal();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/inventory/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
