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
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto mb-4">
      {!isEditing ? (
        <>
          <h3 className="text-2xl font-semibold text-white">{user.name}</h3>
          <p className="text-white">{user.email}</p>
          <p className="text-white">Role: {user.role}</p>
          <p className="text-white">Status: {user.status}</p>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEdit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="mt-4 space-x-2">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition duration-300"
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
