import React, { useState } from "react";
import api from "../api";

const UserCard = ({ user, setUsers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [status, setStatus] = useState(user.status);

  const handleDelete = async () => {
    try {
      await api.delete(`/${user._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== user._id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { name, email, role, status };
      await api.put(`/${user._id}`, updatedUser);
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? { ...u, ...updatedUser } : u))
      );
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      {!isEditing ? (
        <>
          <h3 className="font-bold">{user.name}</h3>
          <p>{user.email}</p>
          <p>Role: {user.role}</p>
          <p>Status: {user.status}</p>
          <div className="mt-2 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEdit} className="space-y-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full border px-3 py-2 rounded"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full border px-3 py-2 rounded"
          >
            <option value="Viewer">Viewer</option>
            <option value="Editor">Editor</option>
            <option value="Manager">Manager</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full border px-3 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="mt-2 space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-2 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserCard;