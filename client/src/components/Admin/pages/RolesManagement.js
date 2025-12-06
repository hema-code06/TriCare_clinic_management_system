import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import RolesForm from "../Components/RolesForm";
import RolesTable from "../Components/RolesTable";
import RolesDetail from "../Components/RolesDetail";
import "../styles/mainpage.css";

const RolesManagement = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showRoleDetail, setShowRoleDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/roles");
      const data = await res.json();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = async (role) => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(role),
      });
      if (res.ok) {
        fetchRoles();
        closeAddModal();
      }
    } catch (error) {
      console.error("Failed to add role:", error);
    }
  };

  const handleUpdateRole = async (role) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/roles/${role._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(role),
        }
      );
      if (res.ok) {
        fetchRoles();
        closeAddModal();
      }
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/roles/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchRoles();
        closeDetailModal();
      }
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };

  const closeAddModal = () => {
    setIsAdding(false);
    fetchRoles();
  };

  const closeDetailModal = () => {
    setShowRoleDetail(false);
    fetchRoles();
  };

  const handleEditClick = () => {
    if (selectedRole) {
      setIsAdding(true);
      setShowRoleDetail(false);
    }
  };

  return (
    <div className="management-page">
      <h1>User Management </h1>
      <button
        className="record-button"
        onClick={() => {
          setIsAdding(true);
          setSelectedRole(null);
        }}
      >
        Add User
      </button>

      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="close-button" onClick={closeAddModal}>
              <MdClose size={24} />
            </button>
            <RolesForm
              onSubmit={selectedRole ? handleUpdateRole : handleAddRole}
              initialData={selectedRole}
            />
          </div>
        </div>
      )}

      {showRoleDetail && selectedRole && (
        <div className="detail-modal-overlay">
          <div className="detail-modal-content">
            <button className="detail-close-button" onClick={closeDetailModal}>
              <MdClose size={24} />
            </button>
            <RolesDetail
              role={selectedRole}
              onEdit={handleEditClick}
              onDelete={() => handleDeleteRole(selectedRole._id)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        !isAdding &&
        !showRoleDetail && (
          <RolesTable
            roles={roles}
            onCardClick={(id) => {
              const role = roles.find((rol) => rol._id === id);
              setSelectedRole(role);
              setShowRoleDetail(true);
            }}
          />
        )
      )}
    </div>
  );
};

export default RolesManagement;
